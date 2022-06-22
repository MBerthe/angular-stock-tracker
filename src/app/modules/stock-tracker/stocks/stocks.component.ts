import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { forkJoin, map, Observable, of } from 'rxjs';
import { StockQuote } from '../models/stock-quote';
import { StockTrackerService } from '../services/stock-tracker.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  public symbolControl = new FormControl('');
  public stocks$: Observable<StockQuote[]>;

  constructor(private stockTrackerService: StockTrackerService) {
    this.symbolControl.addAsyncValidators(this.validateStockSymbol);
  }

  ngOnInit() {
    this.stocks$ = this.stockTrackerService.stock$;
    this.stockTrackerService.loadAllStocks();
  }

  public trackStock(): void {
    const symbol = this.symbolControl.value;
    const obsQuote$ = this.stockTrackerService.getQuoteBySymbol(symbol);
    const obsSymbolInfo$ = this.stockTrackerService.getSymbolInfo(symbol);
    forkJoin([obsQuote$, obsSymbolInfo$]).subscribe(([quote, symbolInfo]) => {
      const stock: StockQuote = {
        stockName: symbolInfo?.length && symbolInfo[0]?.description,
        symbol: symbolInfo?.length && symbolInfo[0]?.symbol,
        currentPrice: quote?.c,
        percentChange: quote?.dp,
        highPriceOfTheDay: quote?.h,
        openPriceOfTheDay: quote?.o,
      };
      this.stockTrackerService.addStok(stock);
    });
  }

  private validateStockSymbol = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    if (control.value?.length >= 1) {
      const symbol = control.value.toUpperCase();
      return this.stockTrackerService
        .getSymbolInfo(symbol)
        .pipe(
          map((res) =>
            res?.find((stock) => stock.symbol.startsWith(symbol))
              ? null
              : { error: 'No matching symbol found' }
          )
        );
    } else {
      return of({ error: 'No symbol entered' });
    }
  };
}
