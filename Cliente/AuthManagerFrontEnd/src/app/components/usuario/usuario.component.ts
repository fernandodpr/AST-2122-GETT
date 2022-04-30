/*
  CONTIENE LOS METODOS QUE VAN A SER LLAMADOS DESDE LA PAGINA HTML
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from "@angular/forms";
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-juego',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  public visible = false;
  alerta: string = "";

  constructor(public UserService: UserService) { }

  filterGame= [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.UserService.getUsers().subscribe(
      res => {
        console.log(res);
        this.UserService.usuarios = res;
      },
      err => console.log(err)
    )
  }

  resetForm(form: NgForm){
    form.reset();
  }

  //agrega un usuario desde el formulario
  addUser(form: NgForm){
    console.log(form.value);
    if(form.value.rol !="" && form.value.username !=""){
      this.UserService.createUser(form.value).subscribe(
        (res: any) => {
          this.getUsers();
          form.reset();
          this.alerta = "Usuario añadido a la base de datos";
          this.showAlert();
        },
        (err: any) => {
          console.log(err);
          this.alerta = "Ha ocurrido un error";
          this.showAlert();
        }
      );
    }
  }

  showAlert(){
    this.visible = true;
  }

  hideAlert(){
    this.alerta = "";
    this.visible = false;
  }

  //Elimina usuario dado la id
  dropUser(form: NgForm){
    if(confirm('Este usuario se va a eliminar. ¿Confirma la operacion?')){
      this.UserService.deleteUser(form.value.id).subscribe(
        (res: any) => {
          this.getUsers();
          form.reset();
          this.alerta = "El usuario se ha eliminado de la Base de Datos";
          this.showAlert();
        },
        (err: any) => console.error(err)
      );
    }
  }
}
