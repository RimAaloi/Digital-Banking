import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;


  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
    })
  }

  handleLogin(){
    let username=this.formLogin.value.username;
    let pwd=this.formLogin.value.password;
    this.authService.login(username,pwd).subscribe({
      next : (data)=>{
        console.log(data);
        this.authService.loadProfile(data);
        this.router.navigate(['/admin/customers']);
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }
}

