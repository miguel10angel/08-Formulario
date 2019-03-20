import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
      .ng-invalid.ng-touched:not(form){
          border:1px solid red;
      }
  `]
})
export class TemplateComponent {
    usuario:Object={
        nombre:null,
        apellido:null,
        correo:null,
        pais: "",
        sexo:"hombre"
    };

    paises=[
          {
              codigo:"MX",
              pais:"México"
          },

          {
              codigo:"USA",
              pais:"Estados unidos"
          }
  ];

    sexos = ["hombre","mujer", "sin definir"];
    acepta = false;
  constructor() { }


  guardar(forma:any){
      console.log("Formulario posteado");
      console.log("Valor", forma.value);
      console.log("Usuario", this.usuario);
      console.log(forma);
  }


}
