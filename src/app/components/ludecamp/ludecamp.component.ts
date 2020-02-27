import {Component, Input} from '@angular/core';
import {LudecampItem} from "../../interfaces/ludecamp-item";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-ludecamp',
  templateUrl: './ludecamp.component.html',
  styleUrls: ['./ludecamp.component.scss']
})
export class LudecampComponent {
  @Input()
  set ludecampItems(value) {
    this._ludecampItems.next(value);
  };

  get ludecampItems() {
    return this._ludecampItems.getValue();
  }

  private _ludecampItems = new BehaviorSubject<LudecampItem[]>([]);

  constructor() {
  }
}
