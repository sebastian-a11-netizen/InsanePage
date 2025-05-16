import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/data/languages';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { EMPTY, Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements OnInit {

  languages = Languages;
  currentUser = '';
  receiverUser = '';
  sourceLang: string = 'en';
  targetLang : string = 'es';
  newMessage: string = '';
  messages$: Observable<any[]> = EMPTY;
  isLoading = false;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user.email ?? 'unknown';
        this.messages$ = this.chatService.getMessages();
      }
    });
  }
  
  async sendMessage() {
    if (!this.newMessage.trim()) return;

    this.isLoading = true;

    await this.chatService.sendMessage(
      this.currentUser,
      this.receiverUser,
      this.newMessage,
      this.sourceLang,
      this.targetLang
    );

    this.newMessage = '';
    this.isLoading = false;
  }

  deleteMessage(messageId: string) {
    this.chatService.deleteMessage(messageId);
  }
  

  swapLanguages() {
    const temp = this.sourceLang;
    this.sourceLang = this.targetLang;
    this.targetLang = temp;
  }
  

}
