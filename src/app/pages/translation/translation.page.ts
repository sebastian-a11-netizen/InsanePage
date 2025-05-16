import { Component, OnInit} from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { ToastService } from 'src/app/services/toast.service';
import { Languages } from 'src/app/data/languages';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.page.html',
  styleUrls: ['./translation.page.scss'],
  standalone:false,
})
export class TranslationPage implements OnInit {

  languages = Languages;
  originalText: string = '';
  translatedText: string = '';
  sourceLang: string = 'en';
  targetLang: string = 'es';
  speaking = false;
  isLoading = false;

  constructor(private translationService: TranslationService, private toastService: ToastService, private historyService: HistoryService) { }

  ngOnInit() {
  }

  translateText() {
    
    if (!this.originalText.trim()) {
      this.toastService.show('Entrada vacía', 2000);
      return;
    }

    this.isLoading = true;
  
    this.translationService.translateText(this.originalText, this.sourceLang, this.targetLang)
      .subscribe({
        next: (res) => {
          this.translatedText = res.responseData.translatedText;
          this.isLoading = false;

          // Guardar en historial
        this.historyService.add({
          original: this.originalText,
          translated: this.translatedText,
          from: this.sourceLang,
          to: this.targetLang,
          timestamp: new Date()
        });
        },
        error: (err) => {
          console.error('Error al traducir:', err);
          this.isLoading = false;
        }
      });
  }

  copyOriginalText() {
     if (!this.originalText.trim()) {
      this.toastService.show('Entrada vacía', 2000);
      return;
    }

    navigator.clipboard.writeText(this.originalText.trim());
}

copyTranslatedText() {
  if (!this.translatedText.trim()) {
    this.toastService.show('Salida vacía', 2000);
    return;
  }

  navigator.clipboard.writeText(this.translatedText.trim());
}

readTextAloud() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    this.speaking = false;
    return;
  }

  const text = this.translatedText.trim();
  if (!text) {
    this.toastService.show('Salida vacía', 2000);
    return
  };
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = this.targetLang;

  this.speaking = true;
  speechSynthesis.speak(utterance);


  const checkSpeakingInterval = setInterval(() => {
    if (!speechSynthesis.speaking) {
      this.speaking = false;
      clearInterval(checkSpeakingInterval);
    }
  }, 500);
}

}
