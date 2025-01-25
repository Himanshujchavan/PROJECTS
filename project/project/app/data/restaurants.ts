import { Restaurant } from '../models/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Taj Mahal Kitchen',
    cuisine: ['North Indian', 'Mughlai'],
    rating: 4.7,
    deliveryTime: 35,
    image: 'https://placem.at/things?w=500&txt=IndianFood'
  },
  {
    id: '2',
    name: 'Spice Paradise',
    cuisine: ['South Indian', 'Vegetarian'],
    rating: 4.6,
    deliveryTime: 30,
    image: 'https://placem.at/things?w=500&txt=Dosa'
  },
  {
    id: '3',
    name: 'Punjab Dhaba',
    cuisine: ['Punjabi', 'Street Food'],
    rating: 4.8,
    deliveryTime: 40,
    image: 'https://placem.at/things?w=500&txt=Curry'
  },
  {
    id: '4',
    name: 'Chennai Express',
    cuisine: ['South Indian', 'Seafood'],
    rating: 4.5,
    deliveryTime: 35,
    image: 'https://placem.at/things?w=500&txt=SouthIndian'
  }
];