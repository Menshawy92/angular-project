import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(userName: string, password: number){
    let fakeToken = "123234rsd21";
    localStorage.setItem('token', fakeToken)
    console.log("fakeToken",fakeToken)
    // return this.http.post('token',fakeToken)
  }
}
