import { Observable } from '@nativescript/core';
import { restaurants } from './data/restaurants';
import { Restaurant, CartItem } from './models/types';

export class MainViewModel extends Observable {
  private _restaurants: Restaurant[];
  private _filteredRestaurants: Restaurant[];
  private _cart: CartItem[] = [];
  private _searchQuery: string = '';

  constructor() {
    super();
    this._restaurants = structuredClone(restaurants).sort((a, b) => b.rating - a.rating); // Ensures immutability
    this._filteredRestaurants = [...this._restaurants];
    this.notifyPropertyChange('restaurants', this._filteredRestaurants);
  }

  get restaurants(): Restaurant[] {
    return this._filteredRestaurants;
  }

  get cartTotal(): number {
    return this._cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    if (this._searchQuery !== value.trim()) {
      this._searchQuery = value.trim();
      this.filterRestaurants();
      this.notifyPropertyChange('searchQuery', this._searchQuery);
    }
  }

  onSearch() {
    this.filterRestaurants();
  }

  private filterRestaurants() {
    if (!this._searchQuery) {
      this._filteredRestaurants = [...this._restaurants];
    } else {
      const query = this._searchQuery.toLowerCase();
      this._filteredRestaurants = this._restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.some(c => c.toLowerCase().includes(query))
      );
    }
    this.notifyPropertyChange('restaurants', this._filteredRestaurants);
  }

  onViewCart() {
    console.log('View cart clicked');
  }

  // 🛒 Cart Management
  addToCart(item: CartItem) {
    const existingItem = this._cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._cart.push({ ...item, quantity: 1 });
    }
    this.notifyPropertyChange('cartTotal', this.cartTotal);
  }

  updateCartQuantity(itemId: string, quantity: number) {
    const item = this._cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.notifyPropertyChange('cartTotal', this.cartTotal);
    }
  }

  removeFromCart(itemId: string) {
    const index = this._cart.findIndex(item => item.id === itemId);
    if (index > -1) {
      this._cart.splice(index, 1);
      this.notifyPropertyChange('cartTotal', this.cartTotal);
    }
  }

  clearCart() {
    if (this._cart.length) {
      this._cart = [];
      this.notifyPropertyChange('cartTotal', 0);
    }
  }
}
