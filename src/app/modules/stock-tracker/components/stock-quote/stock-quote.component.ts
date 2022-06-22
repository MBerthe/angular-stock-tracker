import { Component, Input, OnInit } from '@angular/core';
import { StockQuote } from '../../models/stock-quote';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss'],
})
export class StockQuoteComponent implements OnInit {
  @Input() stockQuote: StockQuote;
  constructor() {}

  ngOnInit() {}
}
