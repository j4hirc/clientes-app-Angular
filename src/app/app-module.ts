import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Directiva } from './directiva/directiva';
import { Clientes } from './clientes/clientes';
import { ClienteService } from './clientes/cliente.service';
import { FormComponent } from './clientes/form'; 
import { Proveedores } from './proveedor/proveedores';
import { FormProveedorComponent } from './proveedor/form-proveedor';
import { Articulos } from './articulos/articulos';
import { FormArticuloComponent } from './articulos/form-articulo';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'directivas', component: Directiva },
  { path: 'clientes', component: Clientes },
  { path: 'clientes/form', component: FormComponent } ,
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'proveedores', component: Proveedores },
  { path: 'proveedores/form', component: FormProveedorComponent },
  { path: 'proveedores/form/:id', component: FormProveedorComponent },
  { path: 'articulos', component: Articulos }, // <--- NUEVA
  { path: 'articulos/form', component: FormArticuloComponent }, 
  { path: 'articulos/form/:id', component: FormArticuloComponent }
];

@NgModule({
  declarations: [
    App, 
    Clientes,
    Proveedores,
    Articulos
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    Directiva,  
    FormComponent, 
    FormProveedorComponent,
    FormArticuloComponent,
    RouterModule.forRoot(routes),
  ],
  providers: [provideBrowserGlobalErrorListeners(), ClienteService, provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}