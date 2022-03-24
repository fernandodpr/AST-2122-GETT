/*
  CONTIENE LOS METODOS QUE VAN A SER LLAMADOS DESDE LA PAGINA HTML
*/
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from "@angular/forms";
import {Game} from 'src/app/models/game';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit {

  constructor(public ProductService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ProductService.getProducts().subscribe(
      res => {
        console.log(res);
        this.ProductService.juegos = res;
      },
      err => console.log(err)
    )
  }

  resetForm(form: NgForm){
    if(!form.value._id) form.reset();
    else alert("Modo edicion. Limpiar el formulario está deshabilitado");
  }

  //agrega un juego desde el formulario
  addGame(form: NgForm){
    if(form.value._id){
      this.ProductService.updateProduct(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
    }else {
      console.log(form.value);
      this.ProductService.createProduct(form.value).subscribe(
        (res: any) => {
          this.getProducts();
          form.reset();
        },
        (err: any) => console.log(err)
      );
    }
  }

  //Elimina juego dado la id
  deleteGame(id: string){
    if(confirm('Este producto se va eliminar. ¿Confirma la operacion?')){
      this.ProductService.deleteProduct(id).subscribe(
        (res) => {
          this.getProducts();
         },
         (err) => console.error(err)
      );
    }
  }

  //Editar los datos del juego desde el formulario
  editGame(game: Game){
    this.ProductService.selectedGame = game;
  }
}
