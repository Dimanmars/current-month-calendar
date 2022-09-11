function getInfoForCalendar(){
	var newDate = new Date();
	

	var day = newDate.getDate();
	var month = newDate.getMonth();
	var year = newDate.getFullYear();
	var firstDay = new Date(year, month, 1).getDay();
	var totalDays = new Date(year, month+1, 0).getDate();

	if(firstDay == 0) {
		firstDay = 7;
	}

	return {
		day: day,
		month: month,
		year: year,
		firstDay: firstDay,
		totalDays: totalDays,
		monthName: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
	}
}



function fillDates(yr,mth,dy){
	var myDate = getInfoForCalendar();
	
	var active = 1;
	var activeArr = [1];
	var rows = 1;
	var rowsArr = [1];

	while(myDate.day - (active+7) > 0){
		active+=7;
		activeArr.push(active+7);

		rows++;
		rowsArr.push(rows+1);
	}

	active = activeArr[activeArr.length-1];

	if (active<=7){
		active += 7;
	}
	rows = rowsArr[rowsArr.length-1];
	if (rows == 1 && myDate.day >= 7-myDate.firstDay ) {
		rows = 2;
	}

	var x = active - myDate.day;
	var currDay = 0;
	if(x > 0){
		currDay = myDate.firstDay - x;
	} else {
		currDay = myDate.firstDay + Math.abs(x);
	}

	if(currDay<=0){
		currDay = 7 - Math.abs(currDay);
		if(rows>1){
			rows = rows-1;
		}
	}

	

	for (var i = 1; i <= myDate.totalDays; i++) {

		fillDay(i <= 7 - myDate.firstDay+1, true, 1, myDate.firstDay+(i-1), rows==1, currDay , i);
		fillDay(i > 7 - myDate.firstDay+1, i <= 14 - myDate.firstDay+1, 2, myDate.firstDay+(i-8), rows==2, currDay, i);
		fillDay(i > 14 - myDate.firstDay+1, i <= 21 - myDate.firstDay+1, 3, myDate.firstDay+(i-15), rows==3, currDay, i);
		fillDay(i > 21 - myDate.firstDay+1, i <= 28 - myDate.firstDay+1, 4, myDate.firstDay+(i-22), rows==4, currDay, i);
		fillDay(i > 28 - myDate.firstDay+1, i <= 35 - myDate.firstDay+1, 5, myDate.firstDay+(i-29), rows==5, currDay, i);
		fillDay(i > 35 - myDate.firstDay+1, true, 6, myDate.firstDay+(i-36), rows==6, currDay, i);
	} 

	jQuery('#date').text(`${myDate.monthName[myDate.month]}`);
}


function fillDay(minDay, maxDay, weekNo, weekDayNo, conditionCurrentDay, currentDay, loop){
	if(minDay && maxDay){
		jQuery('tbody tr:nth-child('+weekNo+') td:nth-child(' + weekDayNo + ')').text(loop);
		if( conditionCurrentDay ) {
				jQuery('tbody tr:nth-child('+weekNo+') td:nth-child(' + currentDay + ')').addClass('current');
			}
	}
}


 

(function(){
	
	fillDates();

})();


document.addEventListener("click", function(e) {
  console.log(e.target);
  if (event.target.tagName.toLowerCase() === 'td') {
    event.target.classList.toggle("active");
  }
});