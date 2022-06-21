import { Injectable } from '@angular/core';
import { StockTrackerModule } from '../stock-tracker.module';

@Injectable({
  providedIn: StockTrackerModule,
})
export class StockTrackerService {
  private apiUrl = 'https://finnhub.io/api/v1';
  private TOKEN = 'bu4f8kn48v6uehqi3cqg';

  constructor() {}

  /*public getQuoteBySymbol(symbol: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/quote?symbol=AAPL&token=${this.TOKEN}`
    );
  }*/
}
