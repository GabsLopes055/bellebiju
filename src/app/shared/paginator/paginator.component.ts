import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'tgt-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnChanges {
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() currentPage: number = 1;

  @Output() changePage = new EventEmitter<number>();

  pages: number = 1;

  ngOnChanges(changes: SimpleChanges): void { // monitora a mudança do total de itens e pagina atual
    if (changes['totalItems'] || changes['pageSize']) {
      this.updatePages();
    }
  }

  private updatePages() {
    this.pages = Math.max(Math.ceil(this['totalItems'] / this['pageSize']), 1); //Garante que o número de páginas nunca seja menor que 1
    if (this.currentPage > this.pages) {
      this.currentPage = this.pages;
      this.changePage.emit(this.currentPage);
    }
  }

  changePageNext() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.changePage.emit(this.currentPage);
    }
  }

  changePageBack() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage.emit(this.currentPage);
    }
  }

  changeInitialPage() {
    this.currentPage = 1;
    this.changePage.emit(this.currentPage);
  }

  changeLastPage() {
    this.currentPage = this.pages;
    this.changePage.emit(this.currentPage);
  }
}
