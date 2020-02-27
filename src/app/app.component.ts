import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamItem} from "./interfaces/team-item";
import {interval, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  fetchDataAfterSeconds = 300;

  scoreboardElements: Array<TeamItem> = new Array<TeamItem>();
  ludecampElements: Array<TeamItem> = new Array<TeamItem>();

  dataFetchSubscription: Subscription;

  ngOnInit(): void {
    this.fetchData();
    this.dataFetchSubscription = interval(1000 * this.fetchDataAfterSeconds)
      .subscribe(() => this.fetchData());
  }

  ngOnDestroy(): void {
    this.dataFetchSubscription.unsubscribe();
  }

  fetchData(): void {
    this.scoreboardElements = new Array<TeamItem>();
    for (let i = 0; i < 32; i++) {
      this.scoreboardElements.push({
        points: this.randomInteger(0, 50),
        logoUrl: "https://via.placeholder.com/150C/O https://placeholder.com/",
        name: `Team ${i}`,
        gamesPlayed: 0
      });
    }
    this.scoreboardElements.sort((n1, n2) => n2.points - n1.points);

    this.ludecampElements = new Array<TeamItem>();
    for (let i = 0; i < 8; i++) {
      this.ludecampElements.push({
        points: this.randomInteger(0, 50),
        logoUrl: "https://via.placeholder.com/150C/O https://placeholder.com/",
        name: `Team ${i}`,
        gamesPlayed: 0
      });
    }
  }

  randomInteger(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
