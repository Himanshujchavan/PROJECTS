export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  isVegetarian: boolean;
  category: 'Starters' | 'Main Course' | 'Breads' | 'Rice' | 'Desserts' | 'Beverages';
}

export interface CartItem extends MenuItem {
  quantity: number;
}