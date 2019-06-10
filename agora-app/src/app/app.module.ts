import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { IniciarSesionService } from "./services/iniciar-sesion.service";
import { IniciarSesionGuard } from "./guards/iniciar-sesion.guard";

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    CabeceraComponent,
    NoEncontradoComponent,
    PerfilComponent,
    IniciarSesionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/iniciar-sesion']
      }
    })
  ],
  providers: [
    IniciarSesionService,
    IniciarSesionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
