import { Injectable } from '@angular/core';
/* import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore'; */
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  DocumentReference,
  setDoc,
  deleteField,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable()
export class ClienteService {
  clientes: Observable<Cliente[]>;
  clienteDelet : DocumentReference;
  clienteRef;

  //operaciones con angularfire compat
  /* clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesCollection = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((action) => {
          const datos = action.payload.doc.data() as Cliente;
          datos.id = action.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }
  agregarCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente);
  }
  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists == false) {
          console.log('falso en payload');
          return null;
        } else {
          const datos = action.payload.data() as Cliente;
          datos.id = action.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  } */
  constructor(private firestore: Firestore) {
    this.clienteRef = collection(this.firestore, 'clientes');
  }

  getClientes(): Observable<Cliente[]> {
    return collectionData(this.clienteRef, { idField: 'id' }) as Observable<
      Cliente[]
    >;
  }
  agregarCliente(cliente: Cliente) {
    return addDoc(this.clienteRef, cliente);
  }
  getCliente(id: string) {
    const clienteRef = doc(this.clienteRef,`/${id}`)
    return docData(clienteRef, {idField:'id'}) as Observable<Cliente>
  }

  deleteCliente(cliente: string){  
    let clienteRef = doc(this.clienteRef,`/${cliente}`);
    return deleteDoc(clienteRef)
  }

  modificar(cliente:Cliente){
    const clienteRef = doc(this.clienteRef, `/${cliente.id}`);
    return setDoc(clienteRef, cliente);
  }
}
