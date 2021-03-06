import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private storage: DataStorageService) {}
  ngOnInit(): void {}

  onSave() {
    this.storage.save();
  }

  onFetch() {
    this.storage.fetch().subscribe();
  }
}
