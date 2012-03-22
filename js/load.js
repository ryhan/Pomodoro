var startTime = new Date();
var duration = 25;
var pomoCount = 0;
var working = false;
var timerRunning = false;

function get_time_difference(earlierDate,laterDate)
{
   var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
   var oDiff = new Object();

   oDiff.totSeconds = Math.floor(nTotalDiff/1000);

   oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
   nTotalDiff -= oDiff.days*1000*60*60*24;

   oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
   nTotalDiff -= oDiff.hours*1000*60*60;

   oDiff.minutes = Math.floor(nTotalDiff/1000/60);
   nTotalDiff -= oDiff.minutes*1000*60;

   oDiff.seconds = Math.floor(nTotalDiff/1000);

   return oDiff;
 
}

function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.play();
  /*
   document.getElementById("sounds").innerHTML=
    "<embed src='"+soundObj+".mp3' hidden=true autostart=true loop=false>";
   */
}

function startstop(){
	PlaySound('ding');
	document.getElementById('explanation').style.visibility = "hidden";
	var button = document.getElementById('startstop');
	var state = button.innerHTML;
	document.getElementById('timer').setAttribute('class','timer');
	
	if (state == 'Start'){
		document.getElementById('progress').style.visibility = "visible";
		button.innerHTML = "Reset";
		button.setAttribute('class','btn btn-red');
		startWorking();
	}else{
		document.getElementById('progress').style.visibility = "hidden";
		startTime = new Date();
		working = false;
		timerRunning = false;
		updateTime();
		button.innerHTML = "Start";
		button.setAttribute('class','btn btn-blue');
	}
}

function startWorking(){
	startTime = new Date();
	duration = 25;
	working = true;
	timerRunning = true;
	document.getElementById('minutes').innerHTML = "25";
	document.getElementById('seconds').innerHTML = "00";
	document.getElementById('progress_bar').setAttribute('class','ui-progress-bar warning ui-container transition');
	document.getElementById('timer').setAttribute('class','timer');
	document.getElementById('startstop').innerHTML = "Reset";
}
function startBreak(){
	PlaySound('dingling');
	document.getElementById('minutes').innerHTML = "05";
	document.getElementById('seconds').innerHTML = "00";
	document.getElementById('startstop').innerHTML = "End break";
	startTime = new Date();
	duration = 5;
	if (pomoCount%4 == 0){
		duration = 15;
		document.getElementById('minutes').innerHTML = "15";
	}
	
	document.getElementById('progress_bar').setAttribute('class','ui-progress-bar ui-container transition');
	document.getElementById('timer').setAttribute('class','timer break');
	working = false;
	timerRunning = true;
}

function updateTime(){
	var t=setTimeout("updateTime()", 1000);
	if (timerRunning != true){
		document.getElementById('minutes').innerHTML = "25";
		document.getElementById('seconds').innerHTML = "00";
	}else{

	var currentTime = new Date();
	var diff = get_time_difference(startTime, currentTime);


	if (duration*60 - diff.totSeconds <= 0){
		if (working == true){
			pomoCount +=1;
			startBreak();
		}else{
			PlaySound('dingling');
			startWorking();
		}
	}else{
		var minutes = duration - 1 - diff.minutes;
		var seconds = 59 - diff.seconds;
		width = (Math.floor(diff.totSeconds/(duration *60)*95)+5) + "%";
		if (minutes < 10){ minutes = "0" + minutes;}
		if (seconds < 10){ seconds = "0" + seconds;}

		document.getElementById('minutes').innerHTML = minutes;
		document.getElementById('seconds').innerHTML = seconds;
		document.getElementById('bar').style.width = width;
	}}
}


function loadjs(){
	updateTime();

}
