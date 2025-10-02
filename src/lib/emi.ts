export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule?: Array<{
    month: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
  }>;
};

export function calcEMI(
  principal: number,
  annualRatePct: number,
  months: number,
  withSchedule = false
): EmiResult {
  const r = annualRatePct / 12 / 100; // monthly rate
  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  // If 0% interest
  if (annualRatePct === 0) {
    const emi = principal / months;
    const totalPayment = emi * months;
    return {
      emi,
      totalInterest: 0,
      totalPayment,
      schedule: withSchedule
        ? Array.from({ length: months }).map((_, i) => ({
          month: i + 1,
          principalPaid: emi,
          interestPaid: 0,
          balance: Math.max(principal - emi * (i + 1), 0),
        }))
        : undefined,
    };
  }

  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  let schedule: EmiResult['schedule'] | undefined;
  if (withSchedule) {
    schedule = [];
    let balance = principal;
    for (let m = 1; m <= months; m++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = Math.max(balance - principalPaid, 0);
      schedule.push({
        month: m,
        principalPaid,
        interestPaid: interest,
        balance,
      });
    }
  }

  return { emi, totalInterest, totalPayment, schedule };
}

export function fmt(n: number, digits = 2) {
  return Number.isFinite(n) ? Number(n.toFixed(digits)) : 0;
}
