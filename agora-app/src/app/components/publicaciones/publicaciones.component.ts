import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from "../../services/publicaciones.service";
import { FormGroup, FormBuilder  } from '@angular/forms';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  imagen : File;
  descripcion : string = '';
  error : string;
  respuesta : string;
  fileData: File = null;
  form: FormGroup;

  constructor(
    public publicacionesS : PublicacionesService, 
    public formBuilder: FormBuilder
  ) { }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData)
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      imagen: ['']
    });
  }

  public mostrarNombreArchivo(){
    // Usamos jQuery con normalidad dentro de angular
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
  }

  public hacerPublicacion() {
    this.error="";
    this.respuesta="";
    if (this.imagen) {
      const formData = new FormData();
      formData.append('imagen', this.form.get('imagen').value);
      
      this.publicacionesS.hacerPublicacion(formData, this.descripcion)
      .subscribe(
        resultado => {
          if (resultado.type == true){
            this.respuesta = 'Publicación realizada con éxito.';
          }
          else {
            this.error = 'Publicación no realizada.';
          }
        },
        error => {
          this.error = `Error de publicación. ${error}`;
        }
        );
    }
    else {
      this.error = 'Selecciona imagen.'
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imagen').setValue(file);
    }
  }



}