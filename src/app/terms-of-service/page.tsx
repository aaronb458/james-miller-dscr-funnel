import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Jessen Cabinets",
  description: "Terms of Service for Jessen Cabinets.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh] bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight mb-8">
            Terms of Service
          </h1>

          <div className="text-brand-text-secondary text-sm leading-relaxed space-y-6">
            <p className="text-brand-text-muted text-xs">
              Effective Date: April 1, 2026 | Last Updated: April 1, 2026
            </p>

            <p>
              Welcome to the website operated by Jessen Cabinets (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). By accessing or using our website and services, you agree to be bound
              by these Terms of Service. If you do not agree with any part of these terms, please do
              not use our website.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Use of Our Website
            </h2>
            <p>
              Our website and landing pages are designed to provide information about Jessen Cabinets
              products and services, and to allow prospective customers to schedule design consultations.
              You agree to use our website only for lawful purposes and in a manner that does not
              infringe on the rights of others or restrict their use of the website.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Design Consultations
            </h2>
            <p>
              Scheduling a design consultation through our website is a request for a meeting with one
              of our designers. It does not constitute a binding agreement for the purchase of products
              or services. Any purchase agreements, quotes, or contracts will be provided separately
              during or after your consultation.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Product Information
            </h2>
            <p>
              We make reasonable efforts to ensure that product descriptions, images, and specifications
              on our website are accurate. However, we do not warrant that all information is complete,
              current, or free from errors. Actual cabinet colors, finishes, and materials may vary
              slightly from what is shown on screen. Final product details will be confirmed during
              your design consultation.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Communications Consent
            </h2>
            <p>
              By submitting your contact information through our forms, you consent to receive
              communications from Jessen Cabinets related to your inquiry, including appointment
              reminders, follow-up messages, and product information via SMS, email, and phone.
              You may opt out of SMS communications at any time by replying STOP. You may opt out
              of email communications by clicking the unsubscribe link in any email. Standard message
              and data rates may apply.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, images, design renderings,
              and software, is the property of Jessen Cabinets or its content suppliers and is protected
              by applicable copyright, trademark, and intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works from any content on this website without
              our prior written consent.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Jessen Cabinets shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use
              of or inability to use our website or services, even if we have been advised of the
              possibility of such damages.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites or services. We do not control and
              are not responsible for the content, privacy policies, or practices of any third-party
              websites. Your use of third-party websites is at your own risk.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              State of Georgia, without regard to conflict of law principles.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time. Changes will
              be posted on this page with an updated effective date. Your continued use of our website
              after any changes constitutes your acceptance of the updated terms.
            </p>

            <h2 className="text-lg font-bold text-brand-text-primary pt-4">
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
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
