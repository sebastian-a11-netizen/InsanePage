import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  isLogged = false;
  userEmail: string = '';

  public appPages = [
    { title: 'Traducción', url: 'translation', icon: 'globe'},
    { title: 'Chat', url: 'chat', icon: 'chatbubble-ellipses' },
    { title: 'Historial', url: 'history', icon: 'reader' },
    { title: 'Cuenta', url: 'login', icon: 'person' },
    { title: 'Acerca de', url: '/folder/archived', icon: 'alert-circle' }
  ];
  public labels = ['Family', 'Friends'];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLogged = !!user;
      this.userEmail = user?.email || '';
    });
  }
  
}
