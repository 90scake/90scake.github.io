export interface Price {
  size: Size;
  flavor: Flavor;
  amount: number;
}

export interface Cake {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  notes: string;
  images: string[];
  prices: Price[];
}

export type Flavor = 'vanilla' | 'chocolate' | 'strawberry' | 'butterscotch' | 'red velvet';
export type Size = '1 pound' | '2 pound' | '3 pound' | '5 pound';

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string;
  selectedFlavor: string;
  selectedSize: string;
  selectedDesign: number | null;
  specialInstructions: string;
}

export interface BasicCakeDesign {
  id: number;
  name: string;
  image: string;
}