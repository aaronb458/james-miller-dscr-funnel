"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/cObQXIqcbjUWRdqwM6aq/webhook-trigger/6a8a72a8-04be-42c8-a827-857eb88f44b5";

const projectTypes = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Cabinet Refacing",
  "New Construction",
  "Other",
];

interface LeadFormProps {
  funnelSource?: string;
  funnelPage?: string;
}

export default function LeadForm({
  funnelSource = "jessen_facebook",
  funnelPage = "homeowner_optin",
}: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    // POST to GHL webhook
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      funnel_source: funnelSource,
      funnel_page: funnelPage,
      sms_consent: smsConsent,
      submitted_at: new Date().toISOString(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

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

    const basePath = funnelPage === "contractor_optin" ? "/contractors/choose-designer" : "/choose-designer";
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
          What are you looking for?
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
            Select your project type
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
            for help. View our Privacy Policy and Terms of Service.
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
            Get Your Free Design Consultation
            <ArrowRight size={20} weight="bold" />
          </>
        )}
      </button>
    </form>
  );
}
