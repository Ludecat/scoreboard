import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {TeamDataResponse, TeamDataService} from "./services/team-data.service";
import {map, take} from "rxjs/operators";
import {LudecampItem} from "./interfaces/ludecamp-item";
import {RankingItem} from "./interfaces/ranking-item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fetchDataAfterSeconds = 120;
  ludecampFetchAfterSeconds = 30;

  subscriptions: Subscription[] = [];
  rankingData$: Observable<RankingItem[]>;
  ludecampData$: Observable<LudecampItem[]>;

  constructor(private teamDataService: TeamDataService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.fetchAllData();
    // this.fetchLudecamp();
    this.subscriptions.push(interval(1000 * this.fetchDataAfterSeconds)
      .subscribe(() => this.fetchAllData()));
    // this.subscriptions.push(interval(1000 * this.ludecampFetchAfterSeconds)
    //   .subscribe(() => this.fetchLudecamp()));
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  fetchAllData(): void {
    this.rankingData$ = this.teamDataService.getTeamdata().pipe(take(1),
      map(value => {
        this.ref.detectChanges();
        return value.ranking;
      }));
  }

  fetchLudecamp(): void {
    this.ludecampData$ = this.teamDataService.getTeamdata().pipe(take(1),
      map(value => {
        this.ref.detectChanges();
        return value.ludecamp;
      }));
  }

  randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
