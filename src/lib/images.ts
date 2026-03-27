// Real kitchen project photos from jessencabinets.com and GHL funnel
export const kitchenImages = [
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/Kitchen-Jessen-Cabinets_july2022.png",
    alt: "White shaker kitchen cabinets with modern finishes by Jessen Cabinets",
  },
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/2CF3B5B0-7D63-4690-8880-3783EE623D3B.jpeg",
    alt: "Custom white shaker cabinetry installation by Jessen Cabinets",
  },
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/69DAA9D5-851C-437D-9DA8-18D6401FFD6F.jpeg",
    alt: "Kitchen renovation with white shaker cabinets and quartz countertops",
  },
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/941C4592-5926-47A3-8EA9-CB054C75453B-scaled.jpeg",
    alt: "Full kitchen remodel featuring white shaker cabinet design",
  },
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/IMG_2196-2.jpg",
    alt: "White shaker kitchen cabinets with premium hardware",
  },
  {
    src: "https://www.jessencabinets.com/wp-content/uploads/2023/08/3-web-or-mls-C3_16601_3_4_5_6_hdr-Edit.jpg",
    alt: "Professional kitchen design with white shaker cabinets",
  },
  {
    src: "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/65e623bdf05605d71b0b43f2.jpeg",
    alt: "White shaker cabinet kitchen project by Jessen Cabinets",
  },
  {
    src: "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/6583ef8ba0a47e98c336bdf5.jpeg",
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
