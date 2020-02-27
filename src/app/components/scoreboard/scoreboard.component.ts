import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TeamItem} from "../../interfaces/team-item";
import {BehaviorSubject, interval, Subscription} from "rxjs";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  @Input()
  public teamItems: Array<TeamItem>;

  switchPageSubscription: Subscription;

  showPage = new BehaviorSubject(1);
  pageSwitchTimeout = 1000;

  constructor() {
  }

  ngOnInit(): void {
    this.showPage.next(1);
    this.switchPageSubscription = interval(1000 * this.pageSwitchTimeout)
      .subscribe(() => {
        // this.showPage.next(this.showPage.getValue() == 1 ? 2 : 1);
      });
  }

  ngOnDestroy(): void {
    this.switchPageSubscription.unsubscribe();
  }
}
