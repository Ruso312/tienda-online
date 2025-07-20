import { Component, inject, signal, OnInit } from '@angular/core';
import { Products, Product } from '../../services/products';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.scss'
})
export class ProductAdmin implements OnInit{
  private productService = inject(Products);
  private fb = inject(FormBuilder);
  private router = inject(Router)

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string>('');
  productForm!: FormGroup; //TODO:: Comentar q hace esto
  isEditing = signal<boolean>(false);
  currentProductId = signal<number | null>(null);


  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      img: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      inOffer: [false]
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar productos');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEditing() && this.currentProductId() !== null) {
      //Modo de edicion de los productos.
      this.productService.updateProduct(this.currentProductId()!, productData).subscribe({
        next: (updatedProduct) => {
          const updatedProducts = this.products().map(p => p.id === updatedProduct.id ? updatedProduct : p);
          this.products.set(updatedProducts);
          this.resetForm();
        },
        error: (err) => {
          this.error.set('Error al actualizar el producto');
        }
      });
    } else {
      //Modo de creacion de los productos.
      this.productService.createProduct(productData).subscribe({
        next: (newProduct) => {
          this.products.set([...this.products(), newProduct]);
          this.resetForm();
        },
        error: (err) => {
          this.error.set('Error al crear el producto');
        }
      });
    }
  }

  onEdit(product: Product): void {
    this.isEditing.set(true);
    this.currentProductId.set(product.id);
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      img: product.img,
      stock: product.stock,
      inOffer: product.inOffer
    });
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products.update(products => products.filter(p => p.id !== id));
        },
        error: (err) => this.error.set('Error al eliminar el producto')
      });
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditing.set(false);
    this.currentProductId.set(null);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
