export interface Designer {
  slug: string;
  name: string;
  firstName: string;
  bio: string;
  specialties: string[];
  experience: string;
  imageUrl: string;
  calendarUrl: string;
}

export const designers: Designer[] = [
  {
    slug: "kaegan-sweeney",
    name: "Kaegan Sweeney",
    firstName: "Kaegan",
    bio: "With a lifetime rooted in cabinetry and over 15 years of industry experience, Kaegan brings both knowledge and passion to every project. He loves working one-on-one with clients to understand their needs and bring their vision to life. From concept to completion, he focuses on delivering a seamless experience and a final product that truly stands out.",
    specialties: [
      "Custom Cabinetry",
      "Kitchen Layout Design",
      "One-on-One Design",
    ],
    experience: "15+ years",
    imageUrl: "/images/designers/kaegan.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/zJhQa1OgSFxbW2ulmclx",
  },
  {
    slug: "carmie-morton",
    name: "Carmie Morton",
    firstName: "Carmie",
    bio: "Carmie began her career in high school with a passion for computer-aided drafting and continued her education in architectural drafting, space planning, and kitchen and bath specialization. She follows NKBA standards and International Building Codes, focusing on creating spaces that are both functional and beautiful. Her work has been featured on TV, including projects with Grey's Anatomy, Property Brothers, and Cash Pad.",
    specialties: [
      "Architectural Drafting",
      "NKBA Standards",
      "Kitchen & Bath Design",
    ],
    experience: "19+ years",
    imageUrl: "/images/designers/carmie.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/BDsC6vt2PO9F7xbn3iUF",
  },
  {
    slug: "heather-marcet-henderson",
    name: "Heather Marcet-Henderson",
    firstName: "Heather",
    bio: "With 25+ years in construction, Heather believes great design starts with listening. Kitchens are her passion. She loves turning your vision into a beautiful, functional space that reflects your lifestyle. Creative, down-to-earth, and collaborative, she truly enjoys bringing your ideas to life.",
    specialties: [
      "Kitchen Design",
      "Construction Integration",
      "Lifestyle-Driven Design",
    ],
    experience: "25+ years",
    imageUrl: "/images/designers/heather.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/P2SXa7K4zduXq9jmgfMo",
  },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find((d) => d.slug === slug);
}
