import type { Metadata } from "next";
import ColorModeProvider from "@/components/ColorModeProvider";

export const metadata: Metadata = {
  title: "PayPlan",
  description: "SIP, EMI, FD, RD, PPF, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorModeProvider>{children}</ColorModeProvider>
      </body>
    </html>
  );
}
