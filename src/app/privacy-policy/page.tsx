import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Jessen Cabinets",
  description: "Privacy Policy for Jessen Cabinets.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh] bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-8">
            Privacy Policy
          </h1>

          <div className="text-brand-text-secondary text-sm leading-relaxed space-y-6">
            <p className="text-brand-text-muted text-xs">
              Effective Date: April 1, 2026 | Last Updated: April 1, 2026
            </p>

            <p>
              Jessen Cabinets (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
              and landing pages at jessencabinets.com and related domains. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you visit our website
              or submit information through our forms.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Information We Collect
            </h2>
            <p>
              When you complete our consultation request forms, designer selection, or survey, we may
              collect the following personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project details (room type, cabinet style, scope, timeline, budget range)</li>
              <li>Property information (zip code)</li>
              <li>Scheduling preferences and appointment details</li>
            </ul>
            <p>
              We also automatically collect certain technical information including your IP address,
              browser type, device information, pages visited, and referring URL through standard
              analytics tools.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Schedule and confirm your design consultation</li>
              <li>Match you with the most appropriate designer for your project</li>
              <li>Prepare your designer for the consultation based on your project details</li>
              <li>Send appointment reminders and follow-up communications via SMS and email</li>
              <li>Improve our website, marketing, and customer experience</li>
              <li>Comply with applicable legal obligations</li>
            </ul>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              How We Share Your Information
            </h2>
            <p>
              We do not sell your personal information. We may share your information with trusted
              third-party service providers who assist us in operating our website, scheduling system,
              and communication tools, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Our CRM and scheduling platform for appointment management and customer communication</li>
              <li>Analytics providers to help us understand website usage and improve our services</li>
              <li>Communication tools for sending SMS and email notifications</li>
              <li>Advertising platforms (such as Meta/Facebook) for measuring ad effectiveness</li>
            </ul>
            <p>
              These providers are contractually obligated to protect your data and use it only for the
              purposes we specify.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              SMS and Email Communications
            </h2>
            <p>
              By submitting your phone number and email through our forms, you consent to receive
              appointment reminders, follow-up messages, and related communications from Jessen Cabinets
              via SMS and email. Message frequency varies. Message and data rates may apply. You may
              opt out at any time by replying STOP to any SMS message or clicking the unsubscribe link
              in any email.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Cookies and Tracking Technologies
            </h2>
            <p>
              Our website uses cookies, pixels (including Meta/Facebook Pixel), and similar tracking
              technologies to analyze traffic, personalize your experience, and measure advertising
              effectiveness. You can manage cookie preferences through your browser settings.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your
              personal information. However, no method of transmission over the Internet or electronic
              storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Your Rights
            </h2>
            <p>
              Depending on your location, you may have the right to access, correct, delete, or restrict
              the processing of your personal information. To exercise any of these rights, please contact
              us using the information below.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of those sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated effective date. Your continued use of our website after any changes
              constitutes your acceptance of the updated policy.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please
              contact us at:
            </p>
            <p>
              Jessen Cabinets<br />
              Roswell, GA<br />
              Phone: (404) 856-5461<br />
              Website: jessencabinets.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
