import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TranslationService } from './translation.service';
import { Timestamp } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesCollection;

  constructor(private firestore: AngularFirestore, private translationService: TranslationService) { this.messagesCollection = this.firestore.collection('messages');  }

  async sendMessage(from: string, to: string, text: string, sourceLang: string, targetLang: string) {
    const translation = await firstValueFrom(
      this.translationService.translateText(text, sourceLang, targetLang)
    );

    const translatedText = translation.responseData.translatedText;

    return this.messagesCollection.add({
      from,
      to,
      originalText: text,
      translatedText,
      timestamp: Timestamp.now(),
      sourceLang,
      targetLang
    });
  }

  getMessages(): Observable<any[]> {
    return this.messagesCollection.valueChanges();
  }

  deleteMessage(messageId: string) {
    if (!messageId) {
      console.error('No message ID provided!');
      return;
    }
    
    const messageDoc = this.firestore.doc(`messages/${messageId}`);
    return messageDoc.delete();
  }
}
