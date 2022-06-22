import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Quote } from '../models/quote';
import { SearchResponse } from '../models/search-response';
import { StockQuote } from '../models/stock-quote';
import { SymbolInfo } from '../models/symbol-info';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  private apiUrl = 'https://finnhub.io/api/v1';
  private TOKEN = 'bu4f8kn48v6uehqi3cqg';

  private _stock$ = new BehaviorSubject<StockQuote[]>(null);
  public stock$ = this._stock$.asObservable();

  constructor(private http: HttpClient) {}

  public getQuoteBySymbol(symbol: string): Observable<Quote> {
    return this.http.get<Quote>(
      `${this.apiUrl}/quote?symbol=${symbol}&token=${this.TOKEN}`
    );
  }

  public getSymbolInfo(symbol: string): Observable<SymbolInfo[]> {
    return this.http
      .get<SearchResponse>(
        `${this.apiUrl}/search?q=${symbol}&token=${this.TOKEN}`
      )
      .pipe(map((response) => response?.result));
  }

  public addStok(item: StockQuote): void {
    const data = this.getStocks();
    data.push(item);
    this.setStocks(data);
  }

  public removeStok(item: StockQuote): void {
    let data = this.getStocks();
    data = data?.filter((itemStock) => itemStock?.symbol != item?.symbol);
    this.setStocks(data);
  }

  public loadAllStocks(): void {
    const data = this.getStocks();
    this._stock$.next(data);
  }

  private getStocks(): StockQuote[] {
    const data =
      (JSON.parse(localStorage.getItem('stocks')) as StockQuote[]) || [];
    if (!data?.length) {
      this.setStocks([]);
    }
    return data;
  }

  private setStocks(data: StockQuote[]): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('stocks', jsonData);
    this._stock$.next(data);
  }
}
