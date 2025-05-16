import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { HistoryEntry } from 'src/app/models/HistoryEntry.Model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone:false
})
export class HistoryPage implements OnInit {
  
  history: HistoryEntry[] = [];
  searchQuery: string = '';

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.history = this.historyService.getAll();
  }

  filteredHistory() {
    if (!this.searchQuery.trim()) {
      return this.history;
    }
    return this.history.filter(entry =>
      entry.original.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      entry.translated.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteHistory() {
    this.historyService.clear();
    this.history = [];
  }

}
