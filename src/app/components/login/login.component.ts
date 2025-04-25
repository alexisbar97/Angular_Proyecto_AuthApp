import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      (user: any) => {
        console.log('Inicio de sesión exitoso:', user);
        alert('Inicio de sesión exitoso. Redirigiendo...');
        this.router.navigate(['/welcome']);
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales inválidas. Inténtalo de nuevo.');
      }
    );
  }
}
