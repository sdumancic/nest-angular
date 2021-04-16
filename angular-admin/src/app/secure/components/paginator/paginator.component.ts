import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  @Input() lastPage: number;
  @Output() pageChanged = new EventEmitter<number>();


  page: number = 1;
  constructor() { }

  ngOnInit(): void {
  }
  next(): void {
    if (this.page === this.lastPage) return;
    this.page++;
    this.pageChanged.emit(this.page);
  }

  prev(): void {
    if (this.page === 1) return;
    this.page--;
    this.pageChanged.emit(this.page);
  }

}
