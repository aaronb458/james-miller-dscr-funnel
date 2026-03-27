import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jessen Cabinets | Premium White Shaker Cabinets",
  description:
    "RTA white shaker kitchen cabinets. Solid hardwood construction, dovetail drawers, delivered to your door. Free design consultation.",
  openGraph: {
    title: "Jessen Cabinets | Premium White Shaker Cabinets",
    description:
      "RTA white shaker kitchen cabinets. Solid hardwood construction, dovetail drawers, delivered to your door.",
    type: "website",
  },
};

const FB_PIXEL_ID = "552922589674318";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* UTM Capture */}
        <Script id="utm-capture" strategy="afterInteractive">
          {`
            (function() {
              try {
                var params = new URLSearchParams(window.location.search);
                var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
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
                  sessionStorage.setItem('utmData', JSON.stringify(utmData));
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
