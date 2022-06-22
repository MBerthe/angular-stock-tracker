import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, map, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockQuote } from '../models/stock-quote';
import { StockTrackerService } from '../services/stock-tracker.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit, OnDestroy {
  public symbolControl = new FormControl('');
  public stocks$: Observable<StockQuote[]>;
  private destroyed = new Subject<any>();

  constructor(
    private stockTrackerService: StockTrackerService,
    private router: Router
  ) {
    this.symbolControl.addAsyncValidators(this.validateStockSymbol);
  }

  ngOnInit() {
    this.stocks$ = this.stockTrackerService.stock$;
    this.stockTrackerService.loadAllStocks();
  }

  public trackStock(symbol: string): void {
    const obsQuote$ = this.stockTrackerService.getQuoteBySymbol(symbol);
    const obsSymbolInfo$ = this.stockTrackerService.getSymbolInfo(symbol);
    forkJoin([obsQuote$, obsSymbolInfo$])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([quote, symbolInfo]) => {
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

  public removeStock(item: StockQuote): void {
    this.stockTrackerService.removeStok(item);
  }

  public gotoSentiment(symbol: string): void {
    console.log(symbol);
    this.router.navigate(['/sentiment', symbol]);
  }

  public trackByFn(index: number, item: StockQuote) {
    return index;
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

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
