import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Languages } from 'src/app/data/languages';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
  standalone: false
})
export class RegisPage implements OnInit {

  languages = Languages;
  name = '';
  language = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private readonly authService: AuthService, private readonly router: Router,
    private toastService: ToastService,) { }

  ngOnInit() {
  }


  async register() {
    if (this.password !== this.confirmPassword) {
      this.toastService.show('Las contraseñas no coinciden', 2000);
      return;
    }

    try {
      await this.authService.registerUser(this.name, this.language, this.email, this.password);
      this.toastService.show('Registro exitoso', 2000);
      this.router.navigate(['/login']);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Ha ocurrido un error';
      this.toastService.show(errorMessage, 2000);
      console.log(errorMessage);
    }
  }


}
