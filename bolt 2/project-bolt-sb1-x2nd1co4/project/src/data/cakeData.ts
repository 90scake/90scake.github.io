import { Cake } from '../types';

export const cakeData: Cake[] = [
  {
    id: 'chocolate-dream',
    name: 'Chocolate Dream',
    description: 'A decadent chocolate cake with rich ganache frosting, perfect for chocolate lovers.',
    ingredients: [
      'All-purpose flour', 
      'Premium cocoa powder', 
      'Sugar', 
      'Butter', 
      'Eggs', 
      'Baking powder', 
      'Vanilla extract', 
      'Dark chocolate'
    ],
    notes: 'This cake can be refrigerated for up to 3 days. Best served at room temperature.',
    images: [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
      'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg',
      'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg'
    ],
    prices: [
      { size: '1 pound', flavor: 'vanilla', amount: 800 },
      { size: '1 pound', flavor: 'chocolate', amount: 900 },
      { size: '2 pound', flavor: 'vanilla', amount: 1500 },
      { size: '2 pound', flavor: 'chocolate', amount: 1650 },
      { size: '3 pound', flavor: 'vanilla', amount: 2200 },
      { size: '3 pound', flavor: 'chocolate', amount: 2450 }
    ]
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    description: 'A delightful sponge cake filled with fresh berries and cream.',
    ingredients: [
      'All-purpose flour', 
      'Sugar', 
      'Butter', 
      'Eggs', 
      'Baking powder', 
      'Fresh strawberries', 
      'Fresh blueberries', 
      'Heavy cream', 
      'Vanilla extract'
    ],
    notes: 'Must be refrigerated due to fresh cream. Best consumed within 2 days.',
    images: [
      'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
      'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg',
      'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg'
    ],
    prices: [
      { size: '1 pound', flavor: 'vanilla', amount: 850 },
      { size: '1 pound', flavor: 'strawberry', amount: 950 },
      { size: '2 pound', flavor: 'vanilla', amount: 1600 },
      { size: '2 pound', flavor: 'strawberry', amount: 1750 },
      { size: '3 pound', flavor: 'vanilla', amount: 2350 },
      { size: '3 pound', flavor: 'strawberry', amount: 2550 }
    ]
  },
  {
    id: 'butterscotch-bliss',
    name: 'Butterscotch Bliss',
    description: 'A classic butterscotch cake with caramelized sugar frosting.',
    ingredients: [
      'All-purpose flour', 
      'Brown sugar', 
      'Butter', 
      'Eggs', 
      'Baking powder', 
      'Butterscotch chips', 
      'Heavy cream', 
      'Vanilla extract'
    ],
    notes: 'Perfect for birthdays and celebrations. Can be stored at room temperature for up to 2 days.',
    images: [
      'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg',
      'https://images.pexels.com/photos/4110003/pexels-photo-4110003.jpeg',
      'https://images.pexels.com/photos/369267/pexels-photo-369267.jpeg'
    ],
    prices: [
      { size: '1 pound', flavor: 'vanilla', amount: 820 },
      { size: '1 pound', flavor: 'butterscotch', amount: 920 },
      { size: '2 pound', flavor: 'vanilla', amount: 1550 },
      { size: '2 pound', flavor: 'butterscotch', amount: 1700 },
      { size: '3 pound', flavor: 'vanilla', amount: 2300 },
      { size: '3 pound', flavor: 'butterscotch', amount: 2500 }
    ]
  },
  {
    id: 'red-velvet-romance',
    name: 'Red Velvet Romance',
    description: 'A luxurious red velvet cake with cream cheese frosting.',
    ingredients: [
      'All-purpose flour', 
      'Cocoa powder', 
      'Sugar', 
      'Butter', 
      'Eggs', 
      'Buttermilk', 
      'Red food coloring', 
      'Cream cheese', 
      'Vanilla extract'
    ],
    notes: 'The perfect cake for Valentine\'s Day or special romantic occasions.',
    images: [
      'https://images.pexels.com/photos/806361/pexels-photo-806361.jpeg',
      'https://images.pexels.com/photos/7525180/pexels-photo-7525180.jpeg',
      'https://images.pexels.com/photos/1359330/pexels-photo-1359330.jpeg'
    ],
    prices: [
      { size: '1 pound', flavor: 'vanilla', amount: 830 },
      { size: '1 pound', flavor: 'red velvet', amount: 950 },
      { size: '2 pound', flavor: 'vanilla', amount: 1580 },
      { size: '2 pound', flavor: 'red velvet', amount: 1800 },
      { size: '3 pound', flavor: 'vanilla', amount: 2350 },
      { size: '3 pound', flavor: 'red velvet', amount: 2600 }
    ]
  }
];

export const basicCakeDesigns = [
  {
    id: 1,
    name: 'Classic Birthday',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg'
  },
  {
    id: 2,
    name: 'Floral Delight',
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg'
  },
  {
    id: 3,
    name: 'Simple Elegance',
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg'
  },
  {
    id: 4,
    name: 'Chocolate Drip',
    image: 'https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg'
  }
];