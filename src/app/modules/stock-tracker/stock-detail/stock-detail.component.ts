import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Sentiment } from '../models/sentiment';
import { StockTrackerService } from '../services/stock-tracker.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
})
export class StockDetailComponent implements OnInit {
  public stockName: string;
  public sentiments: Sentiment[] = [];
  public symbol: string;
  private destroyed = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private stockTrackerService: StockTrackerService
  ) {}

  ngOnInit() {
    const today = new Date();
    const toDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const fromDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth() - 2,
      toDate.getDate()
    );
    const from = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
    const to = this.datePipe.transform(toDate, 'yyyy-MM-dd');

    this.route.params
      .pipe(
        takeUntil(this.destroyed),
        switchMap((params) => {
          this.symbol = params['id'];
          return this.stockTrackerService.getSentimentInfo(
            this.symbol,
            from,
            to
          );
        })
      )
      .subscribe((res) => {
        this.sentiments = res;
        this.stockName = this.stockTrackerService.getStockName(this.symbol);
      });
  }

  public getDate(sentiment: Sentiment): Date {
    const today = new Date();
    return new Date(sentiment?.year, sentiment?.month - 1, today.getDate());
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
