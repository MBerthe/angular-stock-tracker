import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent {
  @Input() symbolControl: FormControl;
  @Output() onSymbolData$: EventEmitter<string> = new EventEmitter<string>();

  public trackStock(): void {
    this.onSymbolData$.emit(this.symbolControl?.value);
  }
}
