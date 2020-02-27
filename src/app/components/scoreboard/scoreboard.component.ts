import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RankingItem} from "../../interfaces/ranking-item";
import {BehaviorSubject, interval, Subscription} from "rxjs";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  @Input()
  set rankingItems(value) {
    // set the latest value for _data BehaviorSubject
    console.log('XXXXXXXXXXXXXXXXX', value);
    this._rankingItems.next(value);
  };

  get rankingItems() {
    // get the latest value from _data BehaviorSubject
    return this._rankingItems.getValue();
  }

  private _rankingItems = new BehaviorSubject<RankingItem[]>([]);

  switchPageSubscription: Subscription;

  showPage = new BehaviorSubject(1);
  pageSwitchTimeout = 30;

  constructor() {
  }

  ngOnInit(): void {
    this.showPage.next(1);
    this.switchPageSubscription = interval(1000 * this.pageSwitchTimeout)
      .subscribe(() => {
        this.showPage.next(this.showPage.getValue() == 1 ? 2 : 1);
      });
  }

  ngOnDestroy(): void {
    this.switchPageSubscription.unsubscribe();
  }
}
