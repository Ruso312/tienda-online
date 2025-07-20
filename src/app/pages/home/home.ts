import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product, Products, CartItem } from '../../services/products';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productService = inject(Products);

  products = signal<Product[]>([]);
  cartItems = signal<CartItem[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.isLoading.set(true);

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los productos');
        this.isLoading.set(false);
        console.error(err);
      }
    })
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems().find(item => item.product.id === product.id);
  
    if (existingItem) {
      // Verificar stock antes de incrementar
      if (existingItem.quantity < product.stock) {
        this.cartItems.update(items => 
          items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        );
      } else {
        alert(`No hay suficiente stock de ${product.name}. Stock disponible: ${product.stock}`);
      }
    } else {
      // Agregar nuevo item al carrito
      if (product.stock > 0) {
        this.cartItems.update(items => [...items, { product, quantity: 1 }]);
      } else {
        alert(`${product.name} está agotado`);
      }
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    // Obtener el producto para verificar stock
    const product = this.products().find(p => p.id === productId);
    
    if (product && quantity > product.stock) {
      alert(`No puedes comprar más de ${product.stock} unidades de ${product.name}`);
      return;
    }

    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }

  checkout(): void {
    if (this.cartItems().length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    const total = this.cartTotal().toFixed(2);
    alert(`¡Compra exitosa! Total: ${total}`);
    
    // Limpiar carrito después de la compra
    this.cartItems.set([]);
  }
}