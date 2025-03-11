import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Método para encriptar una contraseña
  private encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10); // Generar un salt
    return bcrypt.hashSync(password, salt); // Encriptar la contraseña
  }

  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    // Encriptar la contraseña antes de enviarla
    const encryptedUser = {
      ...user,
      password: this.encryptPassword(user.password),
    };
    return this.http.post(this.apiUrl, encryptedUser);
  }

  // Método para obtener todos los usuarios (útil para pruebas)
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email); // Buscar el usuario por email
        if (user && bcrypt.compareSync(password, user.password)) {
          return user; // Credenciales válidas
        }
        throw new Error('Credenciales inválidas'); // Credenciales inválidas
      })
    );
  }
}
