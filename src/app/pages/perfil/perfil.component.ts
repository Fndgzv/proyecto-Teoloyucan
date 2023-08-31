import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  }


  imgVersion: number = 0;
  cambiarImagen(event: any) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return;
    }
    console.log(event)
    const file = event.target.files[0];
    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      this.imgVersion++; // Incrementa el valor de la variable
    };
  }

  subirImagen() {
    if (!this.usuario.uid) {
      Swal.fire('Error', 'No se puede subir la imagen sin un usuario válido', 'error');
      return;
    }

    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }

}
