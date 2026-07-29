import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Directiva } from './directiva/directiva';
import { Clientes } from './clientes/clientes';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule ,Routes } from '@angular/router';

const routes:Routes = [
  {path: '', redirectTo:'', pathMatch: 'full'},
  {path: 'directivas', component: Directiva},
  {path: 'clientes', component: Clientes},

]


@NgModule({
  declarations: [App, Clientes],
  imports: [BrowserModule, AppRoutingModule, HeaderComponent, FooterComponent, Directiva, RouterModule.forRoot(routes)],
  providers: [provideBrowserGlobalErrorListeners(), ClienteService],
  bootstrap: [App],
})
export class AppModule {}
