import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Quote } from '../models/quote';
import { SearchResponse } from '../models/search-response';
import { Stock } from '../models/stock';
import { SymbolInfo } from '../models/symbol-info';

@Injectable({
  providedIn: 'root',
})
export class StockTrackerService {
  private apiUrl = 'https://finnhub.io/api/v1';
  private TOKEN = 'bu4f8kn48v6uehqi3cqg';

  private _stock$ = new BehaviorSubject<Stock[]>(null);
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

  public addStok(item: Stock): void {
    const data = this.getStocks();
    if (data?.length) {
      data.push(item);
      this.setStocks(data);
    }
  }

  public removeStok(item: Stock): void {
    let data = this.getStocks();
    data = data?.filter((itemStock) => itemStock?.symbol != item?.symbol);
    this.setStocks(data);
  }

  public loadAllStocks(): void {
    const data = this.getStocks();
    this._stock$.next(data);
  }

  private getStocks(): Stock[] {
    return JSON.parse(localStorage.getItem('stocks')) as Stock[];
  }

  private setStocks(data: Stock[]): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('stocks', jsonData);
    this._stock$.next(data);
  }
}
