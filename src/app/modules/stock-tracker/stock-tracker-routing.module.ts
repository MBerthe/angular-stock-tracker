import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StocksComponent,
      },
      {
        path: 'sentiment/:id',
        component: StockDetailComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockTrackerRoutingModule {}
