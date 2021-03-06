import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: any) {
    return this.httpClient.post("http://localhost:8765/authenticationservice/auth/register", user);
  }
}

