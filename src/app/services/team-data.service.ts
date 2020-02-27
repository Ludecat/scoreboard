import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RankingItem} from "../interfaces/ranking-item";
import {LudecampItem} from "../interfaces/ludecamp-item";
import {GameplanItem} from "../interfaces/gameplan-item";

export interface TeamDataResponse {
  rankings: RankingItem[],
  ludecampItems: LudecampItem[],
  gameplan: GameplanItem[]
}

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {
  url = 'assets/mockdata.json';

  constructor(private http: HttpClient) { }

  public getTeamdata(): Observable<TeamDataResponse> {
    return this.http.get<TeamDataResponse>(this.url);
  }
}
