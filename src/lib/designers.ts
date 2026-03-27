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
      "Full Kitchen Remodels",
      "One-on-One Design",
    ],
    experience: "15+ years",
    imageUrl:
      "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/69c6cf20cd897ad64ef750d8.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/PLACEHOLDER_kaegan-sweeney",
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
    imageUrl:
      "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/69c6cf2031ffeb2000e723f5.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/PLACEHOLDER_carmie-morton",
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
    imageUrl:
      "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/69c6cf201d9054af3e63a43d.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/PLACEHOLDER_heather-marcet-henderson",
  },
  {
    slug: "madison-batchelder",
    name: "Madison Batchelder",
    firstName: "Madison",
    bio: "Madison brings fresh energy and a keen eye for detail to the Jessen Cabinets design team. She works closely with clients to create spaces that balance style and function, making every project feel personal and polished.",
    specialties: [
      "Modern Design",
      "Detail-Oriented Planning",
      "Client Collaboration",
    ],
    experience: "Design Specialist",
    imageUrl:
      "https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/69c6cf200c63d5611d3cc770.jpg",
    calendarUrl:
      "https://api.leadconnectorhq.com/widget/booking/PLACEHOLDER_madison-batchelder",
  },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find((d) => d.slug === slug);
}
