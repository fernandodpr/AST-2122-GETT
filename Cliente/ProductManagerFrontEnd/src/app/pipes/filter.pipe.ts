import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {

      const resultGame = [];
      for(const juego of value){
        console.log("Patata: "+juego.nombre);

        if(juego.nombre.indexOf(args) > -1){
          console.log("patata");
          resultGame.push(juego);
        };
      };
    return resultGame;
    
  }
}

  /*transform(value: unknown, ...args: unknown[]): unknown {
    const resultGame = [];
    for(const game of value){
      if()
    }
    return null;
  }*/

//}
