import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService, ConsumerClaims } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginScreen: boolean = true;

  loginForm: FormGroup
  registerForm: FormGroup
  currentStep: number = 1;

  fieldTextType: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toast: HotToastService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    sessionStorage.clear();

    this.loginForm = this.fb.group({
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$')]],

    });

    this.registerForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$')]],
      reTypePassword: ['', [Validators.required]],
    });
    const reTypePasswordControl = this.registerForm.get('reTypePassword');
    if (reTypePasswordControl) {
      reTypePasswordControl.valueChanges.subscribe(() => {
        this.validatePasswords();
      });
    }
  }

  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  validatePasswords(): boolean {
    const passwordControl = this.registerForm.get('password');
    const reTypePasswordControl = this.registerForm.get('reTypePassword');

    if (passwordControl && reTypePasswordControl) {
      const password = passwordControl.value;
      const reTypePassword = reTypePasswordControl.value;

      return password === reTypePassword;
    }

    return false; // Return false if any of the form controls is null or undefined
  }

  onSubmit(loginForm: FormGroup) {
    if (loginForm && loginForm instanceof FormGroup && loginForm.valid) {
      this.spinner.show();
      this.auth.login(this.loginForm.value).subscribe((res: any) => {
        if (res) {
          this.auth.isLogggedInSubject.next(true);
          this.loginForm.reset()
          this.auth.storeToken(res.token);
          this.toast.success("Login Successfull");
          this.router.navigateByUrl('dashboard');
        }
        this.spinner.hide();
      },
        (err: any) => {
          this.spinner.hide();
          this.toast.error(err.error)
        }
      )
    }
  }


  Register(registerForm: FormGroup) {
    if (registerForm && registerForm instanceof FormGroup && registerForm.valid) {
      this.spinner.show();
      this.auth.register(this.registerForm.value).subscribe(
        (res: any) => {
          this.registerForm.reset()
          this.loginForm.reset()
          this.toast.success("Registeration Successfull");

          this.spinner.hide();
        },
        (err: any) => {

          this.toast.error(err.error);
          this.spinner.hide();

        }
      )
    }
  }


  equalToControlValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const controlValue = control.parent?.get(controlName)?.value;
      const matchingControlValue = control.parent?.get(matchingControlName)?.value;

      if (controlValue !== matchingControlValue) {
        return { equalToControl: true };
      }

      return null;
    };
  }

  getConsumerDetailsByPhone(){
    
  }
}
