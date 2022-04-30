import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sale } from 'src/app/models/sale';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private saleService: SalesService) { }

  ngOnInit(): void {
  	this.getSales();
  }
  
  getSales(){
  	this.saleService.getSales().subscribe(
  		res => {
  			console.log(res);
  			this.saleService.compras = res;
  		},
  		err => console.log(err)
  	);
  }

  resetForm(form: NgForm){
  	if(!form.value._id) form.reset();
  	else alert("Modo edición. No se puede limpiar el formulario");
  }
  
  addSale(form: NgForm){
  	if(form.value._id){
  		this.saleService.updateSale(form.value).subscribe(
  			res => {
  				this.getSales();
  				form.reset();
  				console.log("Se ha actualizado la información de la compra");
  			},
  			err => console.log(err)
  		);
  	}
  	else{
  		if(form.value.id_usuario != "" && form.value.id_producto != "" && form.value.cantidad < 0 && form.value.comprador != "" && form.value.direccion != ""){
  			this.saleService.createSale(form.value).subscribe(
  				(res: any) => {
  					this.getSales();
  					form.reset();
  					console.log("Compra realizada con éxito");
  				},
  				(err: any) => console.log(err)
  			);
  		}
  	}
  }
}
