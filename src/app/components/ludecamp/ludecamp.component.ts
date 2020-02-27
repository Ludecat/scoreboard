import {Component, Input, OnInit} from '@angular/core';
import {TeamItem} from "../../interfaces/team-item";

@Component({
  selector: 'app-ludecamp',
  templateUrl: './ludecamp.component.html',
  styleUrls: ['./ludecamp.component.scss']
})
export class LudecampComponent implements OnInit {
  @Input()
  public teamItems: Array<TeamItem>;

  constructor() { }

  ngOnInit(): void {
  }

}
