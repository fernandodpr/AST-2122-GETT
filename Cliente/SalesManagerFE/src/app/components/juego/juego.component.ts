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
    var auth = (<HTMLInputElement>document.getElementById("iduser")).value;

    if(form.value._id){
      this.ProductService.updateProduct(form.value,auth).subscribe(
        (res) => {
          this.getProducts();
          form.reset();
          alert(res);
          console.log("La informacion del producto ha sido actualizada");
        },
        (err) => alert(err.error)
      );
    }else {
      console.log(form.value);
      if(form.value.nombre !="" && form.value.categoria !="" && form.value.estudio !="" && form.value.plataforma !="" && form.value.img !=""){
        this.ProductService.createProduct(form.value,auth).subscribe(
          (res: any) => {
            this.getProducts();
            form.reset();
            alert(res);
            console.log("Producto añadido a la Base de Datos");
          },
          (err: any) => alert(err.error)
        );
      }
    }
  }

  //Elimina juego dado la id
  deleteGame(id: string){
    if(confirm('Este producto se va eliminar. ¿Confirma la operacion?')){
      var auth = (<HTMLInputElement>document.getElementById("iduser")).value;
      
      this.ProductService.deleteProduct(id,auth).subscribe(
        (res) => {
          this.getProducts();
          alert(res);
          
        },
        (err) =>{
          console.error(err);
          alert(err.error);
        }
      );
    }
  }

  //Editar los datos del juego desde el formulario
  editGame(game: Game){
          var auth = (<HTMLInputElement>document.getElementById("iduser")).value;

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
    console.log(filters.form.value.filterCat);
    if(filters.form.value.filterId){
      this.ProductService.getProduct(filters.form.value.filterId).subscribe(
        res=>{
          this.ProductService.juegos=[res];
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
  addtocart(id: string){
    var prod = <HTMLInputElement>document.getElementById("addtocart");
    prod.value=id;

  }
}
