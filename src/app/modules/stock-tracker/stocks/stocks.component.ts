import { Component, OnInit } from '@angular/core';
import { StockTrackerService } from '../services/stock-tracker.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  constructor(private readonly stockTrackerService: StockTrackerService) {}

  ngOnInit() {}

  public trackStock(): void {
    console.log('click');
    /*   this.stockTrackerService
      .getQuoteBySymbol('')
      .subscribe((res) => console.log(res));*/
  }
}
