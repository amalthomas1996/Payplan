export type ScheduleRow = {
  month: number;
  emi: number;
  extraMonthly: number;
  lumpSum: number;
  interestPaid: number;
  principalPaid: number;
  balance: number;
};

export type EmiResult = {
  emi: number;                 // standard EMI calculated on original principal/tenure
  totalInterest: number;       // with prepayments
  totalPayment: number;        // with prepayments
  monthsPaid: number;          // actual months paid after prepayments
  schedule: ScheduleRow[];
};

type CalcOptions = {
  principal: number;           // loan amount
  annualRatePct: number;       // ROI per annum
  months: number;              // planned tenure in months
  extraMonthly?: number;       // extra monthly payment (optional)
  lumpSum?: number;            // one-time prepayment (optional)
  lumpSumMonth?: number;       // month number (1-based) when lumpSum is paid
};

/**
 * Formats a number safely with fixed digits (for internal math display only).
 */
export function round2(n: number) {
  return Number.isFinite(n) ? Number(n.toFixed(2)) : 0;
}

/**
 * Baseline EMI for given principal, rate, months (no prepayments).
 */
export function calcPureEmi(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  if (principal <= 0 || months <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
  if (annualRatePct === 0) {
    const emi = principal / months;
    return { emi, totalPayment: emi * months, totalInterest: 0 };
  }
  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalInterest, totalPayment };
}

/**
 * Calculates EMI and full schedule with optional extra monthly payment and one-time prepayment.
 * Assumption: EMI amount stays constant; prepayments reduce the remaining principal and shorten the tenure.
 */
export function calcEMI(opts: CalcOptions): EmiResult {
  const {
    principal,
    annualRatePct,
    months,
    extraMonthly = 0,
    lumpSum = 0,
    lumpSumMonth = 0,
  } = opts;

  const r = annualRatePct / 12 / 100;

  // Trivial/edge cases
  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0, monthsPaid: 0, schedule: [] };
  }

  // 0% interest — everything is principal; prepayments just end sooner.
  if (annualRatePct === 0) {
    const baseEmi = principal / months;
    let balance = principal;
    let totalInterest = 0;
    let totalPayment = 0;
    const schedule: ScheduleRow[] = [];
    let m = 0;

    while (balance > 0 && m < 10000) {
      m += 1;
      const thisLump = lumpSum > 0 && m === lumpSumMonth ? lumpSum : 0;
      const principalPaidBase = Math.min(baseEmi, balance);
      const principalPaidExtra = Math.min(extraMonthly, Math.max(balance - principalPaidBase, 0));
      const principalPaidLump = Math.min(thisLump, Math.max(balance - principalPaidBase - principalPaidExtra, 0));
      const principalPaid = principalPaidBase + principalPaidExtra + principalPaidLump;

      balance = round2(balance - principalPaid);
      const paidThisMonth = principalPaid; // no interest
      totalPayment = round2(totalPayment + paidThisMonth);

      schedule.push({
        month: m,
        emi: principalPaidBase, // in 0% case EMI==principalPaidBase
        extraMonthly: principalPaidExtra,
        lumpSum: principalPaidLump,
        interestPaid: 0,
        principalPaid: principalPaid,
        balance: Math.max(balance, 0),
      });

      if (balance <= 0.0001) break;
    }

    return {
      emi: baseEmi,
      totalInterest: 0,
      totalPayment,
      monthsPaid: schedule.length,
      schedule,
    };
  }

  // Baseline EMI with interest
  const { emi } = calcPureEmi(principal, annualRatePct, months);

  let balance = principal;
  let totalInterest = 0;
  let totalPayment = 0;
  const schedule: ScheduleRow[] = [];

  let m = 0;
  // Cap loop hard to avoid any accidental infinite loops
  while (balance > 0 && m < months + 600) {
    m += 1;

    // Interest for current month
    const interest = balance * r;

    // Base principal component from EMI
    const principalFromEmi = Math.max(emi - interest, 0);

    // Extra monthly goes entirely to principal
    const extraP = extraMonthly > 0 ? extraMonthly : 0;

    // Lump sum in this month (if any)
    const lump = lumpSum > 0 && m === lumpSumMonth ? lumpSum : 0;

    // Total principal reduction this month (cap at remaining balance)
    const principalPaid = Math.min(balance, principalFromEmi + extraP + lump);

    // Total paid this month (emi is always paid; extra + lump only if there is balance to reduce)
    const paidThisMonth = Math.min(emi, interest + balance) // EMI cannot exceed interest+principal left
      + Math.min(extraP, Math.max(balance - principalFromEmi, 0))
      + Math.min(lump, Math.max(balance - principalFromEmi - extraP, 0));

    balance = round2(balance - principalPaid);
    totalInterest = round2(totalInterest + Math.min(interest, paidThisMonth)); // interest portion
    totalPayment = round2(totalPayment + paidThisMonth);

    schedule.push({
      month: m,
      emi,
      extraMonthly: extraP,
      lumpSum: lump,
      interestPaid: Math.min(interest, paidThisMonth),
      principalPaid,
      balance: Math.max(balance, 0),
    });

    if (balance <= 0.0001) break;
  }

  return {
    emi,
    totalInterest,
    totalPayment,
    monthsPaid: schedule.length,
    schedule,
  };
}

/**
 * Convenience helper to compare with a baseline (no prepayments).
 */
export function compareWithBaseline(
  principal: number,
  annualRatePct: number,
  months: number,
  withExtras: { extraMonthly?: number; lumpSum?: number; lumpSumMonth?: number }
) {
  const baseline = calcPureEmi(principal, annualRatePct, months);
  const withPrepay = calcEMI({
    principal,
    annualRatePct,
    months,
    extraMonthly: withExtras.extraMonthly ?? 0,
    lumpSum: withExtras.lumpSum ?? 0,
    lumpSumMonth: withExtras.lumpSumMonth ?? 0,
  });

  const baselineTotalPayment = round2(baseline.totalInterest + principal);
  const interestSaved = round2(baseline.totalInterest - withPrepay.totalInterest);
  const paymentSaved = round2(baselineTotalPayment - withPrepay.totalPayment);
  const monthsSaved = Math.max(0, months - withPrepay.monthsPaid);

  return {
    baselineEmi: baseline.emi,
    baselineTotalInterest: baseline.totalInterest,
    baselineTotalPayment,
    withPrepay,
    interestSaved,
    paymentSaved,
    monthsSaved,
  };
}
