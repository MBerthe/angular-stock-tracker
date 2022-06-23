import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockTrackerRoutingModule } from './stock-tracker-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { StockQuoteComponent } from './components/stock-quote/stock-quote.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StockTrackerRoutingModule,
  ],
  declarations: [
    StocksComponent,
    StockDetailComponent,
    AddStockComponent,
    StockQuoteComponent,
  ],
  providers: [DatePipe],
})
export class StockTrackerModule {}
