import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from "../environments/environment";
/* import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule,  } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth"; */
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './components/cabecero/cabecero.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarComponent } from './components/editar/editar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente.service';
import { FlashMessagesModule } from 'flash-messages-angular';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    ConfiguracionComponent,
    EditarComponent,
    NotFoundComponent,
    LoginComponent,
    FooterComponent,
    RegistroComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
   /*  AngularFireModule.initializeApp(environment.firebaseConfig,'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
