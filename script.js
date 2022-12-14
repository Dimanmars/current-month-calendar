function createCalendar(elem, year, month) {
	

	let mon = month - 1; // months in JS are 0..11, not 1..12
	let d = new Date(year, mon);

	let table = '<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';

	// spaces for the first row
	// from Monday till the first day of the month
	// * * * 1  2  3  4
	for (let i = 0; i < getDay(d); i++) {
		table += '<td></td>';
	}

	// <td> with actual dates
	while (d.getMonth() == mon) {
		table += '<td>' + d.getDate() + '</td>';

		if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
			table += '</tr><tr>';
		}

		d.setDate(d.getDate() + 1);
	}

	// add spaces after last days of month for the last row
	// 29 30 31 * * * *
	if (getDay(d) != 0) {
		for (let i = getDay(d); i < 7; i++) {
			table += '<td></td>';
		}
	}

	// close the table
	table += '</tr></table>';

	elem.innerHTML = table;

	const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
	let monthName = months[month - 1];
	elem.previousElementSibling.innerText = monthName;
}

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
	let day = date.getDay();
	if (day == 0) day = 7; // make Sunday (0) the last day
	return day - 1;
}


const date = new Date();
curMonth = date.getMonth() + 1;
curYear = date.getFullYear();

createCalendar(calendar1, curYear, curMonth);
if (curMonth > 11) {
	curMonth = 0;
	createCalendar(calendar2, curYear + 1, curMonth + 1);
	createCalendar(calendar3, curYear + 1, curMonth + 2);
} else if (curMonth > 10) {
	createCalendar(calendar2, curYear, curMonth + 1);
	curMonth = 0;
	createCalendar(calendar3, curYear + 1, curMonth + 1);
} else {
	createCalendar(calendar2, curYear, curMonth + 1);
	createCalendar(calendar3, curYear, curMonth + 2);
}


document.addEventListener("click", function(event) {
  if (event.target.tagName.toLowerCase() === 'td') {
    event.target.classList.toggle("active");
  }
});

// $(document).on("touchstart mousedown", function(event) {
//   if (event.target.tagName.toLowerCase() === 'td') {
// 		event.preventDefault();
// 		event.stopPropagation();
//     event.target.classList.toggle("active");
//   }
// });