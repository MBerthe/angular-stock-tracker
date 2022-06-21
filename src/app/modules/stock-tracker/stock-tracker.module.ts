import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockTrackerRoutingModule } from './stock-tracker-routing.module';

@NgModule({
  imports: [CommonModule, StockTrackerRoutingModule],
  declarations: [StocksComponent, StockDetailComponent],
})
export class StockTrackerModule {}
