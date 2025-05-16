import { Injectable } from '@angular/core';
import { HistoryEntry } from '../models/HistoryEntry.Model';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: HistoryEntry[] = [];

  constructor() { }

  add(entry: HistoryEntry) {
    this.history.unshift(entry);
  }

  getAll(): HistoryEntry[] {
    return this.history;
  }

  clear() {
    this.history = [];
  }
}
