
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "독서실 출석체크",
  description: "QR코드로 간편하게 출석과 퇴실을 관리하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-blue-100">{children}</body>
    </html>
  );
}
