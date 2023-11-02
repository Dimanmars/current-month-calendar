function createCalendar(elem, year, month) {
	

	let mon = month - 1; // months in JS are 0-indexed; 0..11, not 1..12
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
	elem.setAttribute("data-app-date", elem.closest(".appartmentData").id + "-" + d.getFullYear() + "-" + d.getMonth());

	const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
	let monthName = months[month - 1];
	elem.previousElementSibling.innerText = monthName;
}

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
	let day = date.getDay();
	if (day == 0) day = 7; // make Sunday (0) the last day
	return day - 1;
}

function buildCalendars() {
  return new Promise((function (resolve, reject) {
		const date = new Date();
		let curMonth = date.getMonth() + 1;
		let curYear = date.getFullYear();
		
		createCalendar(calendar11, curYear, curMonth);
		if (curMonth > 11) {
			curMonth = 0;
			createCalendar(calendar12, curYear + 1, curMonth + 1);
			createCalendar(calendar13, curYear + 1, curMonth + 2);
		} else if (curMonth > 10) {
			createCalendar(calendar12, curYear, curMonth + 1);
			curMonth = 0;
			createCalendar(calendar13, curYear + 1, curMonth + 1);
		} else {
			createCalendar(calendar12, curYear, curMonth + 1);
			createCalendar(calendar13, curYear, curMonth + 2);
		}
		curMonth = date.getMonth() + 1;
		createCalendar(calendar21, curYear, curMonth);
		if (curMonth > 11) {
			curMonth = 0;
			createCalendar(calendar22, curYear + 1, curMonth + 1);
			createCalendar(calendar23, curYear + 1, curMonth + 2);
		} else if (curMonth > 10) {
			createCalendar(calendar22, curYear, curMonth + 1);
			curMonth = 0;
			createCalendar(calendar23, curYear + 1, curMonth + 1);
		} else {
			createCalendar(calendar22, curYear, curMonth + 1);
			createCalendar(calendar23, curYear, curMonth + 2);
		}
		resolve();
	}))
}

function readLocalData(){
	let calendars = {...localStorage};
	Object.entries(calendars).forEach(entry => {
		const [key, value] = entry;
		if (document.querySelector("[data-app-date=" + key + "]")) {
			document.querySelector("[data-app-date=" + key + "]").innerHTML = value;
		} else {
			localStorage.removeItem(key);
		}
	});
}
buildCalendars().then(function(){
	readLocalData()
});

function writeLocalData() {
	let calendars = document.querySelectorAll("[id^='calendar']");
	calendars.forEach((element) => {
		localStorage.setItem(element.getAttribute("data-app-date"), element.innerHTML);
	});
}

// выбор апартаментов
document.querySelector("[name='selectAppartment']").addEventListener("change", function(){
	let activeApp = this.value;
	const appartmentsData = document.querySelectorAll('.appartmentData');
	appartmentsData.forEach((element) => {
		element.classList.remove('appartmentData--active');
	});
	document.querySelector("#" + activeApp).classList.add("appartmentData--active");
});

// события указателя, работа с данными
let pointerHeld;
let pointerRole;
document.addEventListener("pointerdown", function(event) {
  if (event.target.tagName.toLowerCase() === 'td') {
		pointerHeld = 1;
		if (event.target.classList.contains("active")) {
			pointerRole = 1;
			event.target.classList.remove("active");
		} else {
			pointerRole = 0;
			event.target.classList.add("active");
		}
  }
});
document.addEventListener("pointerup", function() {
	pointerHeld = 0;
	pointerRole = null;
	writeLocalData();
});
document.addEventListener("pointermove", function(event) {
	if (pointerHeld) {
		let elem = document.elementFromPoint(event.clientX, event.clientY);
		if (elem.tagName.toLowerCase() === "td") {
			if (!pointerRole) {
				elem.classList.add("active");
			} else {
				elem.classList.remove("active");
			}
		}
	}
});