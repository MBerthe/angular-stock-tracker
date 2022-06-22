import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { StockQuote } from '../../models/stock-quote';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockQuoteComponent {
  @Input() stockQuote: StockQuote;
  @Output() removeStock$: EventEmitter<StockQuote> =
    new EventEmitter<StockQuote>();

  @Output() gotoSentiment$: EventEmitter<string> = new EventEmitter<string>();

  public removeStock(): void {
    this.removeStock$.emit(this.stockQuote);
  }

  public gotoSentiment(): void {
    this.gotoSentiment$.emit(this.stockQuote?.symbol);
  }
}
