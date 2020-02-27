import {Component, OnDestroy, OnInit} from '@angular/core';
import {RankingItem} from "./interfaces/ranking-item";
import {interval, Observable, Subscription} from "rxjs";
import {LudecampItem} from "./interfaces/ludecamp-item";
import {TeamDataResponse, TeamDataService} from "./services/team-data.service";
import {map, switchMap, take} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fetchDataAfterSeconds = 40;

  scoreboardElements: Array<RankingItem> = new Array<RankingItem>();
  ludecampElements: Array<LudecampItem> = new Array<LudecampItem>();

  dataFetchSubscription: Subscription;

  constructor(private teamDataService: TeamDataService) {
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

    this.teamDataService.getTeamdata().pipe(
      take(1),
      map((value: TeamDataResponse) => {
        console.log(value);
      }));


    /*
        this.scoreboardElements = new Array<RankingItem>();
        for (let i = 0; i < 32; i++) {
          this.scoreboardElements.push({
            points: this.randomInteger(0, 50),
            logo: "https://via.placeholder.com/150C/O https://placeholder.com/",
            name: `Team ${i}`,
            played: 0
          });
        }
        this.scoreboardElements.sort((n1, n2) => n2.points - n1.points);

        this.ludecampElements = new Array<LudecampItem>();
        for (let i = 0; i < 8; i++) {
          this.ludecampElements.push({
            logo: "https://via.placeholder.com/150C/O https://placeholder.com/",
            name: `Team ${i}`,
          });
        }

        */
  }

  randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
