import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { ProductAdmin } from './pages/product-admin/product-admin';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: AboutUs},
    {path: 'admin', component: ProductAdmin},
    {path: '**', redirectTo: ''}
];
