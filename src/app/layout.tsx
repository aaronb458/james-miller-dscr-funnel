import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DSCR Loan Qualifier | James Miller | West Capital Lending",
  description:
    "See if your investment property qualifies for a DSCR loan. Answer 5 quick questions and book a free strategy session with Jordan.",
  openGraph: {
    title: "DSCR Loan Qualifier | James Miller",
    description:
      "Qualify your investment property for a DSCR loan in 60 seconds. Book a free strategy session.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* UTM Capture — runs before any page logic */}
        <Script id="utm-capture" strategy="afterInteractive">
          {`
            (function() {
              try {
                var params = new URLSearchParams(window.location.search);
                var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
                var utmData = {};
                var hasUtm = false;
                utmKeys.forEach(function(key) {
                  var val = params.get(key);
                  if (val) {
                    utmData[key] = val;
                    hasUtm = true;
                  }
                });
                if (hasUtm) {
                  sessionStorage.setItem('jm_utm', JSON.stringify(utmData));
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
