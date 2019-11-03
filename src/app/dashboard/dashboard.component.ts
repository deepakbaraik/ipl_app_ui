import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DashboardService} from './dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('f') form : NgForm;
  @ViewChild('chart') canvasRef: ElementRef;
  seasons = [];
  seasonVal= 0;
  topTeams=[];
  totalWins = [];
  mostTossWinner='';
  totalTossWin=0;
  awardedPlayer='';
  totalAwards=0;
  mostHostedLocation='';
  noOfHostedMatches=0;
  teamWithHighestMargin='';
  winByRuns=0;
  teamWinByWickets='';
  winByWickets=0;
  winLocationTeam='';
  winningLocation='';
  totalMatches=0;
  barchart : Chart;
  // isLoading= false;
  ctx;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    for(let i= 2008 ; i<=2017 ; i++){
      this.seasons.push(i);
    }
    // this.loadAllSeasons();
  }

  loadAllSeasons(){
    this.dashboardService.getAllSeasons()
      .subscribe(data => {
        console.log(data);
      })
  }

  async onSeasonChange(){
    this.topTeams=[];
    this.totalWins = [];
    this.mostTossWinner='';
    this.totalTossWin=0;
    this.awardedPlayer='';
    this.totalAwards=0;
    this.mostHostedLocation='';
    this.noOfHostedMatches=0;
    this.teamWithHighestMargin='';
    this.winByRuns=0;
    this.teamWinByWickets='';
    this.winByWickets=0;
    this.winLocationTeam='';
    this.winningLocation='';
    this.totalMatches=0;
    try{
      console.log(this.seasonVal);
      let promiseArray=[];
      promiseArray.push(this.dashboardService.getMostTosses(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getMaxPlayerOfTheMatch(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getMostHostedLocation(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getHighestMarginOfRuns(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getWinByWickets(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getTopFourTeams(this.seasonVal).toPromise());
      promiseArray.push(this.dashboardService.getWinningLocation(this.seasonVal).toPromise());
      let result = await Promise.all(promiseArray);

      if(result){
        let tossWinner = result[0];
        let mostAwardedPlayer = result[1];
        let mostHostedLocation = result[2];
        let teamWithHighestMargin = result[3];
        let teamwinByWickets = result[4];
        let topFourTeam = result[5];
        let winningLocation = result[6];

        if(tossWinner){
          this.mostTossWinner = tossWinner.team;
          this.totalTossWin = tossWinner.total_toss_win;
        }
        if(mostAwardedPlayer){
          this.awardedPlayer=mostAwardedPlayer.player;
          this.totalAwards= mostAwardedPlayer.total_awards;
        }
        if(mostHostedLocation){
          this.mostHostedLocation=mostHostedLocation.city;
          this.noOfHostedMatches=mostHostedLocation.matches;
        }
        if(teamWithHighestMargin){
          this.teamWithHighestMargin=teamWithHighestMargin.team;
          this.winByRuns=teamWithHighestMargin.win_by_runs;
        }
        if(teamwinByWickets){
          this.teamWinByWickets= teamwinByWickets.team;
          this.winByWickets = teamwinByWickets.win_by_wickets;
        }
        if(topFourTeam){
          topFourTeam.map(item =>{
            this.topTeams.push(item.team);
            this.totalWins.push(item.total_win);
          })
          this.generateBarCharts();
        }
        if(winningLocation){
          this.winLocationTeam=winningLocation.team;
          this.winningLocation=winningLocation.location;
          this.totalMatches=winningLocation.win;
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  generateBarCharts(){
    let context = this.canvasRef.nativeElement;
    this.barchart = new Chart(context,{
      type: 'bar',
      data: {
        labels: this.topTeams,
        datasets: [
          {
            data: this.totalWins,
            borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  
              ],  
              fill: true
          }
        ]
      },
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            scaleLabel: {
              display: true,
              labelString: 'Matches Won'
            },
            ticks: {
              beginAtZero: true
            } 
          }],  
        }  
      }
    });
  }

}
