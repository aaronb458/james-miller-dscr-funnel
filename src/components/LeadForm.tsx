"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/cObQXIqcbjUWRdqwM6aq/webhook-trigger/6a8a72a8-04be-42c8-a827-857eb88f44b5";

const homeownerProjectTypes = [
  "Kitchen Cabinets",
  "Bathroom Vanity",
  "Laundry Room Cabinets",
  "Full Home Cabinet Package",
  "Other",
];

const contractorProjectTypes = [
  "Single Family Home",
  "Multi-Family",
  "Commercial",
  "Renovation",
  "Other",
];

interface LeadFormProps {
  funnelSource?: string;
  funnelPage?: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

export default function LeadForm({
  funnelSource = "jessen_facebook",
  funnelPage = "homeowner_optin",
}: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    cabinetCount: "",
    projectTimeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isContractor = funnelPage === "contractor_optin";
  const projectTypes = isContractor ? contractorProjectTypes : homeownerProjectTypes;

  // Load UTM data from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("utmData");
      if (stored) {
        setUtmData(JSON.parse(stored));
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-().]{7,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.projectType)
      newErrors.projectType = "Please select a project type";
    if (!smsConsent) newErrors.smsConsent = "Please agree to receive messages";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    // Store lead data for the next pages
    if (typeof window !== "undefined") {
      sessionStorage.setItem("leadData", JSON.stringify(formData));
    }

    // Determine funnel_source: UTM overrides default
    const resolvedSource = utmData.utm_source || funnelSource;

    // POST to GHL webhook
    const payload: Record<string, unknown> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      funnel_source: resolvedSource,
      funnel_page: funnelPage,
      ab_variant: 'quick-form',
      sms_consent: smsConsent,
      submitted_at: new Date().toISOString(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
      // UTM parameters
      utm_source: utmData.utm_source || "",
      utm_medium: utmData.utm_medium || "",
      utm_campaign: utmData.utm_campaign || "",
      utm_content: utmData.utm_content || "",
      utm_term: utmData.utm_term || "",
    };

    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture('form_submit', {
        ab_variant: 'quick-form',
        funnel_page: funnelPage,
        project_type: formData.projectType,
        ...utmData,
      });
    }

    // Add contractor-specific fields
    if (isContractor) {
      payload.estimated_cabinet_count = formData.cabinetCount;
      payload.project_timeline = formData.projectTimeline;
    }

    // Fire Meta Pixel Lead event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: funnelPage,
        content_category: isContractor ? "contractor" : "homeowner",
      });
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
    } catch {
      // Fire and forget - don't block navigation on webhook failure
    }

    const basePath = isContractor ? "/contractors/choose-designer" : "/choose-designer";
    router.push(basePath);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-white/90 mb-1.5"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            autoCapitalize="words"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm transition-all duration-200"
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-white/90 mb-1.5"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            autoCapitalize="words"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm transition-all duration-200"
            placeholder="Your last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white/90 mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm transition-all duration-200"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-white/90 mb-1.5"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          inputMode="numeric"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm transition-all duration-200"
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-white/90 mb-1.5"
        >
          {isContractor ? "Project Type" : "What are you looking for?"}
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm transition-all duration-200 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
          }}
        >
          <option value="" className="bg-brand-charcoal">
            {isContractor ? "Select project type" : "Select what you need"}
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-brand-charcoal">
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>
        )}
      </div>

      {/* Contractor-specific fields */}
      {isContractor && (
        <>
          <div>
            <label
              htmlFor="cabinetCount"
              className="block text-sm font-medium text-white/90 mb-1.5"
            >
              Estimated Number of Cabinets
            </label>
            <select
              id="cabinetCount"
              name="cabinetCount"
              value={formData.cabinetCount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm transition-all duration-200 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="" className="bg-brand-charcoal">
                Select estimated count
              </option>
              <option value="1-10" className="bg-brand-charcoal">1 - 10 cabinets</option>
              <option value="11-25" className="bg-brand-charcoal">11 - 25 cabinets</option>
              <option value="26-50" className="bg-brand-charcoal">26 - 50 cabinets</option>
              <option value="50+" className="bg-brand-charcoal">50+ cabinets</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="projectTimeline"
              className="block text-sm font-medium text-white/90 mb-1.5"
            >
              Project Timeline
            </label>
            <select
              id="projectTimeline"
              name="projectTimeline"
              value={formData.projectTimeline}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm transition-all duration-200 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="" className="bg-brand-charcoal">
                When do you need them?
              </option>
              <option value="immediately" className="bg-brand-charcoal">Immediately</option>
              <option value="1-2_months" className="bg-brand-charcoal">1 - 2 months</option>
              <option value="3-6_months" className="bg-brand-charcoal">3 - 6 months</option>
              <option value="6+_months" className="bg-brand-charcoal">6+ months</option>
            </select>
          </div>
        </>
      )}

      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => {
              setSmsConsent(e.target.checked);
              if (errors.smsConsent) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.smsConsent;
                  return next;
                });
              }
            }}
            className="mt-1 h-4 w-4 rounded border-white/20 flex-shrink-0"
          />
          <span className="text-white/60 text-xs leading-relaxed">
            By checking this box, you agree to receive text messages from Jessen
            Cabinets at the phone number provided. Message and data rates may
            apply. Message frequency varies. Reply STOP to opt out. Reply HELP
            for help. View our{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Privacy Policy</a>{" "}and{" "}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Terms of Service</a>.
          </span>
        </label>
        {errors.smsConsent && (
          <p className="text-red-400 text-xs mt-1.5 ml-7">
            {errors.smsConsent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-semibold py-4 px-8 rounded-lg text-base transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <CircleNotch size={20} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            {isContractor ? "Get Volume Pricing" : "Get Your Free Design Consultation"}
            <ArrowRight size={20} weight="bold" />
          </>
        )}
      </button>
    </form>
  );
}
