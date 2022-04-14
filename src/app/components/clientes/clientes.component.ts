import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  @ViewChild('clienteForm') clienteForm : NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  constructor(
    private clienteServicio: ClienteService,
    private fashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += Number(cliente.saldo);
      });
    }
    return saldoTotal;
  }
  agregar(form: NgForm) {
    if (!form.valid) {
      this.fashMessages.show('llena el formulario Completamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.cliente = form.value;
      this.clienteServicio.agregarCliente(this.cliente);
      this.fashMessages.show('Cliente agregado!!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
    }
    this.clienteForm.resetForm();
    this.cerrar();

  }
  cerrar(){
    this.botonCerrar.nativeElement.click();
  }


}
