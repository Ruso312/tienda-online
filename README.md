# 🛍️ Tienda Online - Angular E-Commerce
<div align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?logo=angular&style=for-the-badge" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&style=for-the-badge" alt="TypeScript">
  <img src="https://img.shields.io/badge/Responsive-Sí-1AB91A?style=for-the-badge" alt="Responsive">
  <img src="https://img.shields.io/badge/MockAPI-Integrado-00C7B7?style=for-the-badge" alt="MockAPI">
</div>

<div align="center"> <h3>👨‍💻 Desarrollado por</h3> <h5>Dacenzo Marco</h5><h5>Sede: Tandil</h5><a href="https://github.com/Ruso312"> <img src="https://img.shields.io/badge/Dev-Ruso312-6e5494?style=for-the-badge&logo=github&logoColor=white" alt="Desarrollador"> </a></div>

Una moderna tienda online desarrollada con Angular 20 que incluye catálogo de productos, carrito de compras y panel de administración completo.

## 🚀 Demo
https://stackblitz.com/~/github.com/Ruso312/tienda-online

## 🌟 Características Principales
### 🛒 Experiencia de Compra
| Función | Descripción | Botones Clave |
|---------|-------------|---------------|
| **Catálogo de Productos** | Visualiza todos los productos con destaque en ofertas | - |
| **Filtros Inteligentes** | Separa automáticamente productos normales y en oferta | - |
| **Agregar al Carrito** | Añade productos al carrito controlando el stock | `Agregar al carrito` |
| **Carrito Interactivo** | Ajusta cantidades, elimina productos y ve el total | `+` `-` `Eliminar` |
| **Finalizar Compra** | Completa el proceso de compra con validación | `Finalizar compra` |
| **Control de Stock** | No permite comprar más unidades de las disponibles | Automático |
### ⚙️ Panel de Administración
| Función | Descripción | Botones Clave |
|---------|-------------|---------------|
| **Crear Productos** | Añade nuevos productos al catálogo | `Crear Producto` |
| **Editar Productos** | Modifica productos existentes | `Editar` |
| **Eliminar Productos** | Remueve productos del sistema | `Eliminar` |
| **Validaciones Avanzadas** | Previene valores negativos en precio/stock | Automático |
| **Gestión de Imágenes** | URLs de imágenes con validación | - |
## 🌐 Navegación y Endpoints
### 🧭 Rutas de la Aplicación
| Ruta | Componente | Descripción | Botones de Acceso |
|------|------------|-------------|-------------------|
| `/` | `HomeComponent` | Página principal con productos | `Inicio` en header |
| `/about` | `AboutComponent` | Información sobre la tienda | `Nosotros` en header |
| `/admin` | `AdminComponent` | Panel de administración | `Administración` en header |
| `/cart` | `CartComponent` | Vista del carrito de compras | `Carrito` (no implementado) |
### 🔄 API Endpoints (MockAPI)
```http
GET    /products       # Obtener todos los productos
POST   /products       # Crear nuevo producto
PUT    /products/:id   # Actualizar producto existente
DELETE /products/:id   # Eliminar producto
```
## 🖥️ Interfaz de Usuario
### Página Principal (`/`)
- **Productos en Oferta**: Destacados con etiqueta especial
- **Productos Normales**: Listado estándar
- **Botón "Agregar al carrito"**: Solo disponible cuando hay stock
- **Indicador de Stock**: Muestra unidades disponibles
### Carrito de Compras
- **Ajuste de Cantidades**: Con botones +/-
- **Subtotales**: Calculados por producto
- **Total General**: Suma de todos los productos
- **Validación de Stock**: Impide exceder disponibilidad
### Panel de Administración (`/admin`)
- **Formulario CRUD**: Para gestión completa de productos
- **Validaciones en Tiempo Real**: Precio mínimo $0.01, stock no negativo
- **Listado de Productos**: Vista completa con acciones rápidas
## 🚀 Cómo Ejecutar el Proyecto
1. **Clonar repositorio**:
```bash
git clone https://github.com/tu-usuario/tienda-online.git
cd tienda-online-angular
```
2. **Instalar dependencias**:
```bash
npm install
```
3. **Abrir en navegador**:
```
http://localhost:4200
```
