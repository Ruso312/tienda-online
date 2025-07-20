import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaz del producto
export interface Product {
  name: string,
  description: string,
  price: number,
  img: string,
  stock: number,
  inOffer: boolean
  id: number,
}

//Interfaz del producto en el carrito
//Incluye el producto y la cantidad
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class Products {
  private http = inject(HttpClient);
  private apiUrl = 'https://687c2facb4bc7cfbda885561.mockapi.io/api/v1/product';

  getProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>):Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}