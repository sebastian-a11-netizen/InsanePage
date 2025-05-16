import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/Customer.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly clientesCollection = this.firestore.collection('clientes');

  constructor( private readonly afAuth: AngularFireAuth, 
    private readonly firestore: AngularFirestore) { }

     //Registrar Usuario
  async registerUser(name: string, language: string, email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const cliente: Customer = {
      nombre: name,
      idioma: language,
      correo: email
    }
    this.clientesCollection.add(cliente);
  }
  

  //Iniciar Sesion
  async loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  //Obtener Usuario Actual
  getCurrentUser() {
    return this.afAuth.authState;
  }

  getCurrentUserEmail(): Observable<string | null> {
  return this.afAuth.authState.pipe(
    map(user => user?.email || null)
  );
}


  //Cerrar Sesion
  logout() {
    return this.afAuth.signOut();
  }
}
