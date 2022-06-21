import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockTrackerRoutingModule } from './stock-tracker-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StockTrackerRoutingModule,
  ],
  declarations: [StocksComponent, StockDetailComponent],
})
export class StockTrackerModule {}
