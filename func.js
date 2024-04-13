const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
const currentDate = new Date();
let currentMounthState=currentDate.getMonth()+1;
let currentYearState=currentDate.getFullYear();
let currentDay = currentDate.getDate(); 
let inNextMonth = 0;

function init() {
    createCalendar(currentYearState, currentMounthState);
    document.getElementById("prevMonth").addEventListener("click", function() {
        let tempMonth = currentMounthState;
        tempMonth = currentMounthState === 1 ? 12 : currentMounthState - 1;
        currentYearState = currentMounthState === 1 ? currentYearState - 1 : currentYearState;
        currentMounthState = tempMonth;
        createCalendar(currentYearState, currentMounthState);
    });
    document.getElementById("nextMonth").addEventListener("click",function(){
        let tempMonth = currentMounthState;
        tempMonth = currentMounthState === 12 ? 1 : currentMounthState + 1;
        currentYearState = currentMounthState === 12 ? currentYearState + 1 : currentYearState;
        currentMounthState = tempMonth;
        createCalendar(currentYearState, currentMounthState);

    });
    document.getElementById("Today").addEventListener("click",function(){
        currentMounthState = currentDate.getMonth()+1
        currentYearState = currentDate.getFullYear()
        createCalendar(currentYearState, currentMounthState);

    });
    document.getElementById('calendarBody').addEventListener("click", function(event) {
       if (event.target.tagName === 'TD') {
        handleCellClick(event.target)
    }
  });
    
}
function createCalendar(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay() + 1;
  const lastDayPrevMonth = new Date(year, month - 1, 0).getDate(); // Last day of the previous month

  const calendarBody = document.getElementById('calendarBody');
  calendarBody.innerHTML = '';

  let dayCounter = 1;
  let prevMonthDaysToShow = firstDay > 1 ? firstDay - 1 : 0; // Number of days from the previous month to show
  let title = document.getElementById('monthTitle');
  title.textContent = months[month-1]+", "+year;
  let num = (prevMonthDaysToShow + daysInMonth) / 7;
  if (num % 1 !== 0) {
    num = Math.ceil(num); // Round up if there's a remainder
  }
  for (let i = 0; i < num; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      if (prevMonthDaysToShow > 0) {
        const prevMonthDay = lastDayPrevMonth - prevMonthDaysToShow + 1;
        const cell = document.createElement('td');
        cell.textContent = prevMonthDay;
        cell.setAttribute('data-month', month === 1 ? 12 : month - 1); 
        cell.id = "color-other-month";
        if(currentMounthState==1)
        {
          cell.setAttribute('data-year',year-1);
        }
        else cell.setAttribute('data-year',year);

        row.appendChild(cell);
        prevMonthDaysToShow--;
      } else if (dayCounter <= daysInMonth) {
        const cell = document.createElement('td');
        cell.textContent = dayCounter;
        if(inNextMonth == 0 && currentDay == dayCounter 
          && year == currentDate.getFullYear() 
          && month == currentDate.getMonth()+1){
          cell.id = 'currentDay'; 
        }
        if(dayCounter==daysInMonth)
        {
            dayCounter=0;
            inNextMonth = 1;
            cell.setAttribute('data-month',month);
            cell.setAttribute('data-year',year);
        }
        else{
          if(inNextMonth == 1)
          {
            if(currentMounthState==12)
            {
               cell.setAttribute('data-year',year+1);
            }  
            else cell.setAttribute('data-year',year);

            cell.setAttribute('data-month', month === 12 ? 1 : month +1); 
            cell.id = "color-other-month";
          }
          else{
            cell.setAttribute('data-year',year);
            cell.setAttribute('data-month',month);
          }
        }
        row.appendChild(cell);
        dayCounter++;

      } 

    }
    calendarBody.appendChild(row);
  }
  inNextMonth = 0;
}
function handleCellClick(cell) {
  const day = cell.textContent;
  const year = cell.getAttribute("data-year");
  const month = cell.getAttribute('data-month');

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  const title = document.createElement('div'); // Create a div for the title
  const twoInputs = document.createElement('div'); // Create a div for the title
  twoInputs.id = "twoInputs";
  title.textContent = 'New Event at ' + day + ' ' + months[month - 1] + ', ' + year;
  popupDiv.appendChild(title);
  title.id = "fullTitle";
  // Create labels and input fields for begin time, end time, and description
  const beginTimeLabel = document.createElement('label');
  const endTimeLabel = document.createElement('label');
  const descriptionLabel = document.createElement('label');
  beginTimeLabel.textContent = 'Begin Time: ';
  endTimeLabel.textContent = 'End Time: ';
  descriptionLabel.textContent = 'Description: ';
  const beginTimeInput = document.createElement('input');
  beginTimeInput.id = "beginTimeInput";
  const endTimeInput = document.createElement('input');
  endTimeInput.id = "endTimeInout";
  const descriptionInput = document.createElement('input');
  twoInputs.appendChild(beginTimeLabel)
  twoInputs.appendChild(beginTimeInput)
  twoInputs.appendChild(endTimeLabel)
  twoInputs.appendChild(endTimeInput)
  descriptionInput.id = "inputDescription";
  beginTimeInput.setAttribute('type', 'text');
  endTimeInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('type', 'text');
  popupDiv.appendChild(twoInputs);
  popupDiv.appendChild(descriptionLabel);
  popupDiv.appendChild(descriptionInput);
  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.addEventListener('click', function() {
      popupDiv.remove(); // Remove the popup on OK button click
  });
  popupDiv.appendChild(okButton);
  document.body.appendChild(popupDiv); // Append the popup to the body
}

 