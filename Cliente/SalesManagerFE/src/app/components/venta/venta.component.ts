import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SaleconnnectService } from 'src/app/services/saleconnnect.service';
import { NgForm } from "@angular/forms";
import { Game } from 'src/app/models/game';
import { Sale } from 'src/app/models/sale';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  constructor(public ProductService: ProductService, public SaleconnnectService: SaleconnnectService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
  }

  getProducts() {
    this.ProductService.getProducts().subscribe(
      res => {
        console.log(res);
        this.ProductService.juegos = res;
      },
      err => console.log(err)
    )
  }

  getOrders() {

    this.SaleconnnectService.getSales().subscribe(
      res => {
        console.log(res);
        this.SaleconnnectService.sales = res;
      },
      err => console.log(err)
    )
  }

  resetForm(form: NgForm) {
    if (!form.value._id) form.reset();
    else alert("Modo edicion. Limpiar el formulario está deshabilitado");
  }
  addOrder(form: NgForm){
    var auth = (<HTMLInputElement>document.getElementById("idusersales")).value;

    if(form.value._id){
      this.SaleconnnectService.updateOrder(form.value,auth).subscribe(
        (res) => {
          this.getProducts();
          this.getOrders();
          form.reset();
          alert(res);
          console.log("La informacion del pedido ha sido actualizada");
        },
        (err) => alert(err.error)
      );
    }else{
      console.log(form.value);
      if(form.value.id_producto !="" && form.value.id_usuario !="" && form.value.comprador !="" && form.value.direccion !=""){
        this.SaleconnnectService.createOrder(form.value,auth).subscribe(
          (res: any) => {
            this.getProducts();
            this.getOrders();
            form.reset();
            alert(res);
            console.log("Orden tramitada correctamente");
          },
          (err: any) => alert(err.error)
        );
      }
    }
  }

  deleteOrder(id: string){

    if(confirm('Este pedido se va eliminar. ¿Confirma la operacion?')){
      var auth = (<HTMLInputElement>document.getElementById("idusersales")).value;

      this.SaleconnnectService.deleteOrder(id,auth).subscribe(
        (res) => {
          this.getProducts();
          this.getOrders();
          console.log(res);
          alert(res);

        },
        (err) =>{
          console.log(err);
          alert(err.error);
        }
      );
    }
  }

  editOrder(request:Sale){
    var auth = (<HTMLInputElement>document.getElementById("idusersales")).value;

    if(request._id){
      this.SaleconnnectService.getSale(request._id).subscribe(
        res=>{
          this.SaleconnnectService.selectedSale=res;
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  aplyFilter(filters : NgForm){
    console.log("Aplicando filtros");
    //console.log(filters);
    console.log(filters.form.value.filterId);
    if(filters.form.value.filterId){
      this.SaleconnnectService.getUser(filters.form.value.filterId).subscribe(
        res=>{
          this.SaleconnnectService.sales=res;
        },
        err=> console.log(err)
      );
    }else {

    }
  }
}
