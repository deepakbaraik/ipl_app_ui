import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl='http://debaraik.pythonanywhere.com/';

  constructor(private http: HttpClient) { }

   getTopFourTeams(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'top-team/'+year)
     .pipe(map(res => res));
   }

   getAllSeasons():Observable<any>
   {
     return this.http.get(this.baseUrl+'top-team-allseasons')
     .pipe(map(res=> res));
   }

   getMostTosses(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'toss-winner/'+year)
     .pipe(map(res=>res));
   }

   getMaxPlayerOfTheMatch(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'player_of_match/'+year)
     .pipe(map(res => res));
   }

   getMostHostedLocation(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'/hosted-max-matches/'+year)
     .pipe(map(res=>res));
   }

   getHighestMarginOfRuns(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'highest-run-margin/'+year)
     .pipe(map(res => res));
   }

   getWinByWickets(year):Observable<any>
   {
     return this.http.get(this.baseUrl+'win-by-wickets/'+year)
     .pipe(map(res => res));
   }

   getWinningLocation(year):Observable<any>{
     return this.http.get(this.baseUrl+'wining-location/'+year)
     .pipe(map(res => res));
   }
}
