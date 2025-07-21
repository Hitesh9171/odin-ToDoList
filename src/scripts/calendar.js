import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isToday
} from "date-fns";
import loadTasks from './tasks.js';
function loadCalendar() {
    const main = document.querySelector(".main-content");
  if (!main) {
    console.error("❌ .main-content not found!");
    return;
  }

  main.innerHTML = "";
  const today=new Date();
  const monthStart=startOfMonth(today);
  const monthEnd=endOfMonth(today);
  const calendarStart=startOfWeek(monthStart, {weekStartsOn : 0});
  const calendarEnd=endOfWeek(monthEnd, {weekStartsOn: 0});

  const allDays=eachDayOfInterval({start: calendarStart , end:calendarEnd});

  //Month Heading
  const heading=document.createElement("h2");
  heading.textContent=format(today,'MMMM yyyy');
  heading.style.marginBottom="1rem";
  main.appendChild(heading);

  // Weekday Labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdayRow = document.createElement("div");
  weekdayRow.style.display = "grid";
  weekdayRow.style.gridTemplateColumns = "repeat(7, 1fr)";
  weekdayRow.style.fontWeight = "bold";

  weekdays.forEach(day => {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.style.textAlign = "center";
    weekdayRow.appendChild(cell);
  });

  main.appendChild(weekdayRow);

  // Calendar Grid
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(7, 1fr)";
  grid.style.gap = "5px";

  allDays.forEach(day => {
    const dayBox = document.createElement("div");
    dayBox.textContent = format(day, "d");
    dayBox.style.textAlign = "center";
    dayBox.style.padding = "10px";
    dayBox.style.borderRadius = "6px";
    dayBox.style.cursor = "pointer";

    // Visual cues
    if (!isSameMonth(day, today)) {
      dayBox.style.opacity = "0.3";
    }

    if (isToday(day)) {
      dayBox.style.backgroundColor = "#3b82f6";
      dayBox.style.color = "white";
    } else {
      dayBox.style.backgroundColor = "#e5e7eb";
    }

    // Future: attach task loading
    dayBox.addEventListener("click", () => {
      const dateStr=format(day,"yyyy-MM-dd");
      console.log("selected date:",dateStr);
      console.log("loding tasks for date:",dateStr);
      loadTasks(dateStr);
    });

    grid.appendChild(dayBox);
  });

  main.appendChild(grid);

}

export default loadCalendar;