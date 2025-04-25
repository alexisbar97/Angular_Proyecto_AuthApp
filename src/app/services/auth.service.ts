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

  private encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  register(user: any): Observable<any> {
    const encryptedUser = {
      ...user,
      password: this.encryptPassword(user.password),
    };
    return this.http.post(this.apiUrl, encryptedUser);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email);
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        throw new Error('Credenciales inválidas');
      })
    );
  }
}
