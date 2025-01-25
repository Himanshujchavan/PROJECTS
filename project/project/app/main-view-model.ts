import { Observable } from '@nativescript/core';
import { restaurants } from './data/restaurants';
import { Restaurant, CartItem } from './models/types';

export class MainViewModel extends Observable {
  private _restaurants: Restaurant[];
  private _filteredRestaurants: Restaurant[];
  private _cart: CartItem[];
  private _searchQuery: string = '';

  constructor() {
    super();
    this._restaurants = restaurants;
    this._filteredRestaurants = restaurants;
    this._cart = [];
    this.notifyPropertyChange('restaurants', this._filteredRestaurants);
  }

  get restaurants(): Restaurant[] {
    return this._filteredRestaurants;
  }

  get cartTotal(): number {
    return this._cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    if (this._searchQuery !== value) {
      this._searchQuery = value;
      this.filterRestaurants();
      this.notifyPropertyChange('searchQuery', value);
    }
  }

  onSearch() {
    this.filterRestaurants();
  }

  private filterRestaurants() {
    if (!this._searchQuery) {
      this._filteredRestaurants = this._restaurants;
    } else {
      const query = this._searchQuery.toLowerCase();
      this._filteredRestaurants = this._restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(query))
      );
    }
    this.notifyPropertyChange('restaurants', this._filteredRestaurants);
  }

  onViewCart() {
    // TODO: Implement navigation to cart page
    console.log('View cart clicked');
  }
}