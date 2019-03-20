import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
//import { Observable } from'rxjs/Rx';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
    forma:FormGroup;
    usuario:any={
        nombreCompleto:{
            nombre:"Mike",
            apellido:"Hernandez"
        },
        correo:"mike@mike.com",
        //pasatiempos:["Correr", "Dormir", "Comer"]
    };

  constructor() {
      console.log(this.usuario);
      this.forma=new FormGroup({
          //el primer espacio es para poner valores por defecto, el segundo para validaciones
          //y el tercero el para validacion acincrona
          'nombreCompleto': new FormGroup({
              'nombre': new FormControl( '', [
                                                Validators.required,
                                                Validators.minLength(3)
                                            ] ),
              'apellido': new FormControl( '', [
                                                Validators.required,
                                                this.noHernandez] )
            }),
          'correo': new FormControl( '', [
                                            Validators.required,
                                            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                        ] ),
        'pasatiempos': new FormArray( [
            new FormControl('Correr', Validators.required )
        ] ),
        'username': new FormControl('', Validators.required/*, this.existeUsuario*/),
        'password1': new FormControl('', Validators.required),
        'password2': new FormControl()
      });
      //this.forma.setValue(this.usuario);

      this.forma.controls['password2'].setValidators([
          Validators.required,
          this.noIgual.bind( this.forma)
      ])


      this.forma.controls['username'].valueChanges.subscribe( data=>{
          console.log(data);
      })

      this.forma.controls['username'].statusChanges.subscribe( data=>{
          console.log(data);
      })


   }

  ngOnInit() {
  }

  guardarCambios(){
      //console.log(this.forma.value);
      //console.log(this.forma);

      //esta forma es para resetear los formularios, se puede mandar el objeto
      //original o construirlo al momento, sirve para cuando se requiere crear
      //varios registros de un mismo tipo

      //crear el objeto al momento
      //this.forma.reset({
      //nombreCompleto:{
        //  nombre:"",
         // apellido:""
      //},
      //correo:""
  //});

  //resetearlo con el objeto original
  //this.forma.reser(this.usuario);
  }


  noHernandez(control: FormControl):{ [s:string]:boolean }{
      if( control.value === "hernandez"){
          return {
              nohernandez:true
          }
      }
  }

  noIgual(control: FormControl):{ [s:string]:boolean }{

      let forma:any=this;

      if( control.value !== forma.controls['password1'].value){
          return {
              noiguales:true
          }
      }
      return null;
  }

  /*existeUsuario(control:FormControl):Promise<any> | Observable<any>{

      let promesa =new Promise(
          (resolve, reject)=>{

              setTimeout( ()=>{
                  if( control.value === "strider" ){
                      resolve( {existe:true} );
                  }else{
                      resolve(null);
                  }
              }, 3000 )
          }
      )
      return promesa;
  }*/

  agregarPasatiempo(){
      (<FormArray>this.forma.get('pasatiempos')['controls']).push(
          new FormControl('', Validators.required)
      )
  }

}
