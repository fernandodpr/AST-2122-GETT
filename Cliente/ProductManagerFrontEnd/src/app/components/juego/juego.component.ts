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

  filterGame= [];

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
        (res) => {
          this.getProducts();
          form.reset();
          console.log("La informacion del producto ha sido actualizada");
        },
        (err) => console.error(err)
      );
    }else {
      console.log(form.value);
      this.ProductService.createProduct(form.value).subscribe(
        (res: any) => {
          this.getProducts();
          form.reset();
          console.log("Producto añadido a la Base de Datos");
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
          console.log("El producto se ha eliminado de la Base de Datos");
        },
        (err) => console.error(err)
      );
    }
  }

  //Editar los datos del juego desde el formulario
  editGame(game: Game){
    console.log("Edicion del juego");
    if(game._id){
      console.log(this.ProductService.getProduct(game._id));
      console.log(game);

      this.ProductService.getProduct(game._id).subscribe(
        res=>{
          this.ProductService.selectedGame=res;
        },
        err=> console.log(err)
      );
    }
  }

  aplyFilter(filters : NgForm){
    console.log("Aplicando filtros");
    //console.log(filters);
    console.log(filters.form.value.filterId);
    //console.log(filters.form.value.filterCat);
    if(filters.form.value.filterId){
      this.ProductService.getProductbyId(filters.form.value.filterId).subscribe(
        res=>{
          this.ProductService.juegos=res;
        },
        err=> console.log(err)
      );
    }else if (filters.form.value.filterCat) {
      this.ProductService.getCategory(filters.form.value.filterCat).subscribe(
        res=>{
          this.ProductService.juegos=res;
        },
        err=> console.log(err)
      );
    }else {

    }
  }
}
