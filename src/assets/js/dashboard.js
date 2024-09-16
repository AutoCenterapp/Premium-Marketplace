 // sort table
cPrev = -1; // global var saves the previous c, used to
            // determine if the same column is clicked again

function sortBy(c) {
    rows = document.getElementById("sortable").rows.length; // num of rows
    columns = document.getElementById("sortable").rows[0].cells.length; // num of columns
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById("sortable").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById("sortable").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}
// sort table over
 
        //score js
const secondFrameStart = 6000;
const timeOnFrame = 3000;
const startDeg = -90;  
const degRange = 180;
let tickArray = [];
let guageFrame = 0;
let rgbRedValue = (12, 36, 52, 1);
let x;
// t: current time, b: begInnIng value, c: change In value, d: duration
function easeInOutCubic(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

function spawnColor(iter){
    this.goFrames = 0;
    this.color = rgbRedValue;
    this.iteration = iter;
    this.fillColor = function(){
		if ( this.goFrames <= 20 ) {
			var $el = document.querySelector('.js-guage-svg > path:nth-child('+String(this.iteration)+')');
      document.querySelector('.js-guage-svg > path:nth-child('+String(this.iteration)+')').style.fill = 'rgb('+rgbRedValue+','+this.color+','+this.color+')';
			this.color = this.color - (rgbRedValue / 20);
			this.goFrames = this.goFrames + 1;
		    this.reqAnim = requestAnimationFrame( this.fillColor.bind(this) );
		} else {
			this.goFrames = 0;
			this.color = rgbRedValue;
			cancelAnimationFrame(this.reqAnim);
		}
	};
}

function engageGuage() {
	let totalFrames = 100;
	let currChild = 0;
	let reqGuage;


    if ( guageFrame < totalFrames && guageFrame < 83 ) {
      var deg = startDeg+easeInOutCubic(guageFrame, 0, degRange, totalFrames );
      console.log(deg)
      var iteration = Math.floor( easeInOutCubic(guageFrame, 0, document.querySelectorAll('.js-guage-svg > path').length+1, totalFrames ) );
      document.querySelector('.js-needle').style.transform = 'rotateZ('+deg+'deg)';
      if ( currChild != iteration ) {
        tickArray[iteration] = new spawnColor(iteration);
        tickArray[iteration].fillColor();
        currChild = iteration;
      }
      guageFrame++;
      reqGuage = requestAnimationFrame(engageGuage);
    } else {
      guageFrame = 0;
      cancelAnimationFrame(reqGuage);
      // setTimeout( reset, 1000 );
      clearTimeout(x)
    }

}

function reset() {
  Array.prototype.forEach.call( document.querySelectorAll('.js-guage-svg > path'), function(el, i){
    el.style.fill = '';
  });
	document.querySelector('.js-needle').style.transform = 'rotateZ('+startDeg+'deg)';
	tickArray = [];
  x = setTimeout( engageGuage, 1000 );
  
}

reset();
//score js over