// Real kitchen project photos — hosted locally on Vercel CDN
export const kitchenImages = [
  {
    src: "/images/kitchen/kitchen-july2022.png",
    alt: "White shaker kitchen cabinets with modern finishes by Jessen Cabinets",
  },
  {
    src: "/images/kitchen/kitchen-2.jpeg",
    alt: "Custom white shaker cabinetry installation by Jessen Cabinets",
  },
  {
    src: "/images/kitchen/kitchen-3.jpeg",
    alt: "Kitchen renovation with white shaker cabinets and quartz countertops",
  },
  {
    src: "/images/kitchen/kitchen-4.jpeg",
    alt: "Full kitchen remodel featuring white shaker cabinet design",
  },
  {
    src: "/images/kitchen/kitchen-5.jpg",
    alt: "White shaker kitchen cabinets with premium hardware",
  },
  {
    src: "/images/kitchen/kitchen-6.jpg",
    alt: "Professional kitchen design with white shaker cabinets",
  },
  {
    src: "/images/kitchen/kitchen-7.jpeg",
    alt: "White shaker cabinet kitchen project by Jessen Cabinets",
  },
  {
    src: "/images/kitchen/kitchen-8.jpeg",
    alt: "Completed kitchen transformation with white shaker cabinets",
  },
];

// Hero background
export const heroImage = kitchenImages[0].src;

// Section backgrounds
export const sectionBgImages = {
  valueProps: kitchenImages[1].src,
  bottomCta: kitchenImages[3].src,
  gallery: [kitchenImages[0], kitchenImages[1], kitchenImages[2], kitchenImages[3], kitchenImages[4], kitchenImages[5]],
};
