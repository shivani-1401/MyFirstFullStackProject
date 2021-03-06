import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { RouterService } from 'src/app/services/router.service';
import { User } from '../user';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})
export class LoginCompComponent implements OnInit {

  id = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
  user: User;
  loginMessage: string;
  userId;

  constructor(private authservice: AuthserviceService, private routerService: RouterService) {
    this.loginMessage = '';
  }

  ngOnInit() {
  }

  loginSubmit() {
    let token;
    this.user = {
      id: this.id.value,
      password: this.password.value
    };
    this.authservice.authenticateUser(this.user).subscribe(
      data => {
        token = data['token'];
        if (token != undefined && token != null) {
          this.loginMessage = "Login successful"
          this.authservice.setBearerToken(data['token']);
          this.authservice.setUserId(data['user']);
          this.routerService.routeToHomePage();
        }
        else {
          this.loginMessage = "Unauthorized user, register with us first";
        }
      },
      err => {
        this.loginMessage = err;
      }
    );
  }
  getuserIdErrorMessage() {
    if (this.id.touched && this.id.hasError('required')) {
      return 'Username is required';
    } else if (this.id.touched && this.id.hasError('minlength')) {
      return 'Minimum length of username should be 5';
    }
  }
  getPasswordErrorMessage() {
    if (this.password.touched && this.password.hasError('required')) {
      return 'Password is required';
    } else if (this.password.touched && this.password.hasError('minlength')) {
      return 'Minimum length of password should be 5';
    }
  }
}

