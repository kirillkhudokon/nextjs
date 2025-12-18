import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import NavBar from "@/components/shared/NavBar";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Next.js blog with AWS Cognito auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
