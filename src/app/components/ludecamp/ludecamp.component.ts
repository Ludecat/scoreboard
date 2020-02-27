import {Component, Input, OnInit} from '@angular/core';
import {LudecampItem} from "../../interfaces/ludecamp-item";

@Component({
  selector: 'app-ludecamp',
  templateUrl: './ludecamp.component.html',
  styleUrls: ['./ludecamp.component.scss']
})
export class LudecampComponent implements OnInit {
  @Input()
  public teamItems: Array<LudecampItem>;

  constructor() { }

  ngOnInit(): void {
  }

}
