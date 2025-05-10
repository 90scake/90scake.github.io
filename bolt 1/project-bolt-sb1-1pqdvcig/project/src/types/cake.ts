export interface PriceOption {
  flavor: string;
  pound: number;
  price: number;
}

export interface Cake {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  prices: PriceOption[];
  ingredients?: string[];
  notes?: string;
}