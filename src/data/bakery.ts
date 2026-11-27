export interface CakeProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price500g: number;
  price1kg: number;
  bestseller?: boolean;
}

export interface PastryProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export const CAKES_MENU: CakeProduct[] = [
  {
    id: 'cake-vanilla',
    name: 'Vanilla',
    description: 'Classic light vanilla sponge layered with smooth whipped cream frosting.',
    image: '/images/cake-vanilla.jpg',
    price500g: 330,
    price1kg: 660,
  },
  {
    id: 'cake-pineapple',
    name: 'Pineapple',
    description: 'Soft vanilla sponge infused with juicy pineapple chunks and fresh cream.',
    image: '/images/cake-pineapple.jpg',
    price500g: 380,
    price1kg: 760,
  },
  {
    id: 'cake-butterscotch',
    name: 'Butterscotch',
    description: 'Caramelized butterscotch sponge finished with crunchy praline bits.',
    image: '/images/cake-butterscotch.jpg',
    price500g: 350,
    price1kg: 700,
    bestseller: true,
  },
  {
    id: 'cake-milky-butterscotch',
    name: 'Milky Butterscotch',
    description: 'Rich milky cream butterscotch cake with velvety caramel drizzle.',
    image: '/images/cake-butterscotch.jpg',
    price500g: 400,
    price1kg: 780,
  },
  {
    id: 'cake-strawberry',
    name: 'Strawberry',
    description: 'Fresh strawberry-glazed sponge layered with whipped strawberry cream.',
    image: '/images/cake-strawberry.jpg',
    price500g: 350,
    price1kg: 700,
  },
  {
    id: 'cake-choco-chips',
    name: 'Choco Chips',
    description: 'Decadent chocolate sponge generously studded with dark chocolate chips.',
    image: '/images/cake-choco-chips.jpg',
    price500g: 480,
    price1kg: 850,
    bestseller: true,
  },
  {
    id: 'cake-choco-symphony',
    name: 'Choco Symphony',
    description: 'Silky multi-layered chocolate truffle cake with glossy cocoa finish.',
    image: '/images/cake-chocolate-truffle.jpg',
    price500g: 450,
    price1kg: 880,
  },
  {
    id: 'cake-kit-kat',
    name: 'Kit Kat',
    description: 'Rich chocolate cake encircled with crispy KitKat bars and choco curls.',
    image: '/images/cake-kitkat.jpg',
    price500g: 480,
    price1kg: 880,
    bestseller: true,
  },
  {
    id: 'cake-milky-badam',
    name: 'Milky Badam',
    description: 'Creamy almond-infused sponge topped with toasted badam slivers.',
    image: '/images/cake-fruit.jpg',
    price500g: 450,
    price1kg: 900,
  },
  {
    id: 'cake-black-forest',
    name: 'Black Forest',
    description: 'Traditional chocolate sponge layered with whipped cream, shavings, and cherries.',
    image: '/images/cake-black-forest.jpg',
    price500g: 450,
    price1kg: 780,
    bestseller: true,
  },
];

export const PASTRIES_MENU: PastryProduct[] = [
  {
    id: 'pastry-milky-butterscotch',
    name: 'Milky Butterscotch',
    description: 'Individual slice of creamy milky butterscotch sponge with caramel crunch.',
    image: '/images/pastry-butterscotch.jpg',
    price: 85,
  },
  {
    id: 'pastry-milky-badam',
    name: 'Milky Badam',
    description: 'Delicate almond cream pastry finished with roasted badam flakes.',
    image: '/images/pastry-badam.jpg',
    price: 90,
  },
  {
    id: 'pastry-black-forest',
    name: 'Black Forest',
    description: 'Classic chocolate & whipped cream pastry topped with dark chocolate curls and cherry.',
    image: '/images/pastry-black-forest.jpg',
    price: 90,
  },
  {
    id: 'pastry-choco-symphony',
    name: 'Choco Symphony',
    description: 'Rich double-chocolate ganache pastry slice with smooth cocoa glaze.',
    image: '/images/pastry-chocolate.jpg',
    price: 90,
  },
  {
    id: 'pastry-choco-chips',
    name: 'Choco Chips',
    description: 'Moist chocolate pastry layered with cream and crunchy choco chips.',
    image: '/images/pastry-chocolate.jpg',
    price: 90,
  },
  {
    id: 'pastry-red-velvet',
    name: 'Red Velvet',
    description: 'Velvety crimson sponge slice layered with smooth cream cheese frosting.',
    image: '/images/pastry-red-velvet.jpg',
    price: 90,
  },
];
