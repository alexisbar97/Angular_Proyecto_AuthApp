import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  registerData = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    country: '',
    birthDate: '',
  };

  countries: string[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.countries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
      },
      (error) => {
        console.error('Error al cargar los países:', error);
      }
    );
  }

  onSubmit() {
    this.authService.register(this.registerData).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        alert('Registro exitoso. Redirigiendo al login...');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro. Inténtalo de nuevo.');
      }
    );
  }
}
