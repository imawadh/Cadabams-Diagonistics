import discountOffersData from "@/data/md+json/discountoffers.json";

export interface DiscountOfferContent {
  title: string;
  description: string;
  code: string;
  id: string;
}

export interface DiscountOfferConfig {
  id: string;
  visible: boolean;
  content: DiscountOfferContent;
}

export function getDiscountOffer(): DiscountOfferConfig {
  return (discountOffersData as DiscountOfferConfig[])[0];
}
