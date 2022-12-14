import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '@app/core/interfaces/login.interface';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ToastService } from '@app/core/services/toast/toast.service';
import { numberRegex, alphanumericRegex } from '@shared/utils/regex';
import { environment } from '@environments/environment';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;
  public lengthField = {
    user: {
      maxLength: 11,
    },
    password: {
      minLength: 8,
    },
  };
  public dateVersionInfo = environment.versionInfo.date;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private navigation: NavigationService,
    private bnIdle: BnNgIdleService
  ) {
    this.buildForm();
  }

  get userField() {
    return this.loginForm.get('user');
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      user: [
        '1166522458',
        [
          Validators.required,
          Validators.maxLength(this.lengthField.user.maxLength),
          Validators.pattern(numberRegex),
        ],
      ],
      password: [
        'dayIwasBorn', //IwasBorn
        [
          Validators.required,
          Validators.minLength(this.lengthField.password.minLength),
          Validators.pattern(alphanumericRegex),
        ],
      ],
    });
  }

  isFieldValid(field: string) {
    return this.loginForm.get(field).touched && this.loginForm.get(field).valid;
  }

  isFieldInvalid(field: string) {
    return (
      this.loginForm.get(field).touched && this.loginForm.get(field).invalid
    );
  }

  login() {
    if (this.loginForm.valid) {
      const data: LoginDTO = {
        documentNumber: this.userField.value,
        password: this.passwordField.value,
      };

      this.authService.login(data).subscribe((res: any) => {
        if (res.status) {
          this.navigation.goToDashboard();
        }
      });
    } else {
      const errors = this.showErrorsField();
      this.toastService.presentErrorToast(errors);
      this.loginForm.markAllAsTouched();
    }
  }

  showErrorsField() {
    const errors = [];

    const messages = {
      required: 'El campo $ es requerido.',
      minlength: 'El campo $ debe tener minimo X caracteres.',
      maxlength: 'El campo $ debe tener maximo X caracteres.',
    };

    if (this.userField.errors) {
      const keys = Object.keys(this.userField.errors);

      keys.forEach((key) => {
        if (key === 'maxlength') {
          errors.push(
            messages[key]
              .replace('$', 'Documento de identidad')
              .replace('X', `${this.lengthField.user.maxLength}`)
          );
        } else {
          errors.push(messages[key].replace('$', 'Documento de identidad'));
        }
      });

    }

    if (this.passwordField.errors) {
      const keys = Object.keys(this.passwordField.errors);

      keys.forEach((key) => {

        if (key === 'minlength') {
          errors.push(
            messages[key]
              .replace('$', 'Contrase??a')
              .replace('X', `${this.lengthField.password.minLength}`)
          );
        } else {
          errors.push(messages[key].replace('$', 'Contrase??a'));
        }
      });

    }

    return errors.join('<br>');
  }
}
