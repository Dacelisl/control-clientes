import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id: string;

  constructor(
    private clienteServicio: ClienteService,
    private fashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }
  guardar(form: NgForm) {
    if (!form.valid) {
      this.fashMessages.show('llena el formulario Completamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      form.value.id = this.id;
      this.clienteServicio.modificar(form.value);
      this.fashMessages.show('Cliente agregado!!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/']);
    }
  }
  eliminar() {
    console.log('cliente eliminar ',this.cliente);
    if (this.cliente) {
      this.cliente.id = this.id;
      this.clienteServicio.deleteCliente(this.cliente.id!);
    }
  }
}
