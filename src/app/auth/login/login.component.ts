import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  activarComisiones = false
  url = "http://coins.naucalpan.gob.mx/comision/"

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || '']
  });


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {


  }

  ngOnInit(): void {
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe((resp: any) => {
        const emailControl = this.loginForm.get('email');
        const rememberControl = this.loginForm.get('remember');

        const emailValue = emailControl?.value ?? '';
        const rememberValue = rememberControl?.value ?? '';

        if (rememberControl) {
          localStorage.setItem('email', emailValue);
          localStorage.setItem('remember', rememberValue);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

        if (resp && resp.role === 'recursosMateriales') {
          $('#ModalIniciarSesion').modal('hide');
          this.router.navigateByUrl('dashboard/altaSolicitud');
        } else {
          // Navegar al Dashboard
          $('#ModalIniciarSesion').modal('hide');
          this.router.navigateByUrl('/');
        }
      })

  }



}
