import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {TeamDataResponse, TeamDataService} from "./services/team-data.service";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fetchDataAfterSeconds = 40;

  dataFetchSubscription: Subscription;
  teamDataResponse$: Observable<TeamDataResponse>;

  constructor(private teamDataService: TeamDataService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.fetchData();
    this.dataFetchSubscription = interval(1000 * this.fetchDataAfterSeconds)
      .subscribe(() => this.fetchData());
  }

  ngOnDestroy(): void {
    this.dataFetchSubscription.unsubscribe();
  }

  fetchData(): void {

    this.teamDataResponse$ = this.teamDataService.getTeamdata().pipe(take(1),
      map(value => {
        console.log(value);
        this.ref.detectChanges();
        return value;
      }));
  }

  randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
