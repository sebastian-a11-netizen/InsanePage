import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiKey = '1fa93010db5cb2bd1d59';  //Clave api
  private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translateText(originalText: string, sourceLang: string, targetLang: string): Observable<any> {
    if (!originalText.trim()) {
      throw new Error('El texto original no puede estar vacío');
    }

    const url = `${this.apiUrl}?q=${encodeURIComponent(originalText)}&langpair=${sourceLang}|${targetLang}&key=${this.apiKey}`;

    return this.http.get<any>(url);
  }
}
