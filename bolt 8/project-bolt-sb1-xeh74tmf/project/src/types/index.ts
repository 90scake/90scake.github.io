export interface Cake {
  id: string;
  name: string;
  description: string;
  prices: Price[];
  ingredients: string[];
  notes: string[];
  flavors: Flavor[];
  images: string[];
  category: string;
}

export interface Price {
  flavorId: string;
  pound: number;
  price: number;
}

export interface Flavor {
  id: string;
  name: string;
}

export interface BasicCake {
  id: string;
  name: string;
  basePrice: number;
  flavors: Flavor[];
  designs: Design[];
}

export interface Design {
  id: string;
  name: string;
  image: string;
}

export interface OrderDetails {
  cakeId: string;
  cakeName: string;
  flavorId: string;
  flavorName: string;
  pound: number;
  price: number;
  customerName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  designId?: string;
  designName?: string;
}