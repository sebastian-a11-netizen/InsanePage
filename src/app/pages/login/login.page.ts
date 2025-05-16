import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  isLogged: boolean = false;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.logout();
      },
    },
  ];

  constructor(private readonly authService: AuthService, private readonly router: Router, private toastService: ToastService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLogged = !!user; 
    });
  }


  async login() {
    try {
      await this.authService.loginUser(this.email, this.password);
      this.toastService.show('Inicio de sesión exitoso', 2000);
      this.router.navigate(['/clientes']);
    } catch (error) {
      this.toastService.show('Verifica los datos', 2000);
    }
  }

  logout () {
    this.authService.logout();
    this.toastService.show('Cierre de sesión exitoso', 2000);
  }

}
