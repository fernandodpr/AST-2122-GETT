/*
  CONTIENE LOS METODOS QUE VAN A SER LLAMADOS DESDE LA PAGINA HTML
*/

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from "@angular/forms";
import {User} from 'src/app/models/user';

@Component({
  selector: 'app-juego',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  constructor(public ProductService: ProductService) { }

  filterGame= [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ProductService.getProducts().subscribe(
      res => {
        console.log(res);
        this.ProductService.usuarios = res;
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
        this.ProductService.createProduct(form.value).subscribe(
          (res: any) => {
            this.getProducts();
            form.reset();
            console.log("Usuario añadido a la Base de Datos");
            
          },
          (err: any) => console.log(err)
        );
      }
  }

  //Elimina usuario dado la id
  dropUser(form: NgForm){
    if(confirm('Este usuario se va a eliminar. ¿Confirma la operacion?')){
      this.ProductService.deleteProduct(form.value.id).subscribe(
        (res: any) => {
          this.getProducts();
          console.log("El usuario se ha eliminado de la Base de Datos");
        },
        (err: any) => console.error(err)
      );
    }
  }
}
