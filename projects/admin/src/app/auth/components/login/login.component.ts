import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder, private service: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm()

  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['ali', [Validators.required]],
      password: ['4545', [Validators.required]],
      // device_id: ['1234'],
    })
  }
  login() {
    this.service.login(this.loginForm.username, this.loginForm.password);
    //   this.service.login("ali",4545).subscribe((res:any) => {
    //     this.toastr.success('Hello world!', 'Toastr fun!');
    //     console.log(res)
    //   })

    //   // })
    // //   // console.log("asd",this.loginForm.value)
    // // }
  }
}
