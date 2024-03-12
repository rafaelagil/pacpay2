import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicos/usuario.service';
import { Credencial } from '../../models/Credencial';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
  ],
})
export class LoginComponent {
  constructor(private rota: Router, private servico: UsuarioService) {}

  formulario = new FormGroup({
    documento: new FormControl('', [Validators.required]),
    senha: new FormControl('', Validators.required),
  });
  senhaIncorreta: boolean = false;

  autenticar(): void {
    this.servico
      .autenticar(this.formulario.value as Credencial)
      .subscribe((r) => {
        this.rota.navigateByUrl('/admin');
        localStorage.setItem('token', r.token);
        localStorage.setItem('nome', r.usuario);
      });
  }
}
