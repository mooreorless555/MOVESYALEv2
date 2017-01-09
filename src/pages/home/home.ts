import { Component, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeStorage } from 'ionic-native';

import { MakePage } from '../make/make';
import { StatsPage } from '../stats/stats';
import { ProfilePage } from '../profile/profile';
import { MapPage } from '../map/map';

import { MovesService } from '../services/MovesService';
import { StatsProvider } from '../../providers/stats-provider';
import { System, Globals } from '../functions/functions';

declare var ProgressBar: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MovesService, System, Globals, StatsProvider]
})

export class HomePage {


 /* Gathers all references to elements labeled 
 'container' for the progress bars (people counters) */
 @ViewChildren('container') container: any;
  moves: Array<any>;

  /* Lists all the moves after the page has fully loaded. 
  This is to allow @ViewChildren to work properly. */
  ngAfterViewInit() {
    this.stat.ResetCounters();

    if (this.globals.debugflag) {
      this.listMoves();
    } else {
      this.listMoves_1();
    }
  }

  /* Upon any change, will update the progress bars. */
  ngAfterViewChecked() {
    if (this.container.toArray().length > 0) {
      if (this.system.checked == 0) {
        setTimeout(() => {
          let containers = this.container.toArray();
          let moves = this.moves;
          for (var i = 0; i < containers.length; i ++) {
            this.stat.CreatePeopleCounter(containers[i]);
          }
        }, 700);

        console.log('Your counters are: ', this.stat.counters);

        setTimeout(() => {
            for (var i = 0; i < this.moves.length; i++) {
              let counters = this.stat.counters;
              let moves = this.moves;
              let perc = moves[i].stats.people/moves[i].info.capacity;
              this.stat.UpdateCounter(counters[i], perc);
              }      
            }, 800);
            this.system.checked = 1;
          }
    }
    }

  constructor(public navCtrl: NavController, public system: System, public globals:Globals, public stat:StatsProvider, public movesService:MovesService) {

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  goToMake() {
    console.log('Make!');
    this.navCtrl.push(MakePage);
  }

  goToMap() {
    this.navCtrl.push(MapPage, {
      moves: this.moves
    });
  }



 listMoves() {
    this.movesService.getMoves_old().subscribe(
      data => {
        this.moves = data;
        this.moves.sort(this.system.sortDescending);
        this.system.moves = this.moves;
        console.log(this.moves);
      },
      err => {
        console.log(err);
      },
      () => console.log('Got Moves')
    );
  }

  listMoves_1() {
    var me = this;

    NativeStorage.getItem('user')
          .then(function(user) {
            //alert("Got token: " + user.token);
            return Promise.all([user, me.movesService.getMoves(user.token)]);
          })
          .then(function(results) {
            //alert(results[1]);
            me.moves = results[1];
            //alert("Got moves: " + me.moves);
          })
          .catch(function(err) {
            alert("Couldn't get tokens " + err);
          });
  }


  /* Refresh list of moves event. */
  refreshMoves(refresher) {
        this.system.showNotification('Updating list, standby...', 1000);
        setTimeout(() => {
          this.system.checked = 0; 
          this.stat.ResetCounters(); 
          this.listMoves();  
          this.system.showNotification('Done!', 1000);
          refresher.complete();
    }, 1000);
  }

  /* Go to the Stats page */
  checkStats(move) {
    this.navCtrl.push(StatsPage, { 
      firstPassed: move}
      );
  } 
}
