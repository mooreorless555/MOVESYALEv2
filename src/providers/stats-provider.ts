import { Injectable } from '@angular/core';
// import { System } from '../functions/functions';

declare var ProgressBar:any;

@Injectable()
export class StatsProvider {

public counters = new Array();

CreatePeopleCounter(container) {
        console.log("Creating Counter");

        var counter = new ProgressBar.SemiCircle(container.nativeElement, {
          strokeWidth: 18,
          easing: 'easeInOut',
          duration: 1400,
          color: '#9932CC',
          svgStyle: null,

          text: {
            value: '',
            alignToBottom: false
          },

          from: {color: '#9932CC'},
          to: {color: '#FFFFFF'},

          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
          }
          });
          counter.animate(1);
          this.counters.push(counter);
          return counter;
}

CreateStatsCounter(container, move) {

		console.log("Creating Counter");

var counter = new ProgressBar.SemiCircle(container.nativeElement, {
          strokeWidth: 18,
          easing: 'easeInOut',
          duration: 2300,
          color: '#9932CC',
          svgStyle: null,

          text: {
            value: '',
            className: 'progressbar__label',
          },

          from: {color: '#9932CC'},
          to: {color: '#FFFFFF'},

          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            let numppl = Math.round(bar.value() * move.info.capacity);
            bar.setText(numppl + '/' + move.info.capacity);
            bar.text.style.color = state.color;
            // console.log(Object.keys(bar.text.style));
          }
        });

    counter.text.style.fontFamily = 'AppFont';
    counter.text.style.fontSize = '2rem';  

    var perc = move.stats.people/move.info.capacity;

    if (perc > 1) {
      counter.animate(1);
    } else if (perc >= 0) {
      counter.animate(perc);     
    } else {
      counter.animate(0);
    }

    return counter;

  }

CreateGeneralCounter(container, type, color, duration, move, overflow) {
	var num = 0;
	if (type == 'line') {
	  var counter = new ProgressBar.Line(container.nativeElement, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: duration,
        color: color,
        svgStyle: {width: '100%', height: '100%'},
		text: {
	      position: 'absolute',
	      top: '0px',
	      padding: 0,
	      margin: 0,
	      transform: null
	    },
          step: (state, bar) => {
          	num = bar.value()*move.info.capacity;
          	if (overflow >= num) {
            	bar.setText(overflow);         		
          	} else {
          		bar.setText(num.toFixed(0));
          	}

            bar.text.style.color = state.color;
			bar.text.style.left = 5 + (bar.value()*100) + '%';
          }
        });

    counter.text.style.fontFamily = 'AppFont';  



	  counter.animate(1);
	  return counter;		
}

	return -1;

}

UpdateCounter(counter, value) {
	if (value < 1) {
		counter.animate(value);
	} else {
		counter.animate(1);
	} 
}

ResetCounters() {
	this.counters = [];
}


}