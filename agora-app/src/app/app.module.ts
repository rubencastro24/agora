import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, FormBuilder} from '@angular/forms';
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
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';

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
    IniciarSesionComponent,
    PublicacionesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/iniciar-sesion']
      }
    })
  ],
  providers: [
    IniciarSesionService,
    IniciarSesionGuard,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }