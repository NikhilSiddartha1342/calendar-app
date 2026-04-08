import DayCell from "./DayCell";
import './CalendarGrid.css'

function CalendarGrid({ currentDate, startDate, endDate, onDayClick }) {

    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();

    let startDay = new Date(year, month, 1).getDay();
    let noOfDays = new Date(year, month + 1, 0).getDate();

    let arr = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let i = 1; i <= noOfDays; i++) arr.push(i);

    return (
        <div className="calendar-grid">
            <div className="day-headers">
            {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                <div key={d} className="day-header">{d}</div>
            ))}
            </div>
            <div className="days-grid">
            {arr.map((day, index) => (
                <DayCell 
                    key={index}
                    day={day} 
                    currentDate={currentDate}
                    startDate={startDate}
                    endDate={endDate}
                    onDayClick={onDayClick}
                 />
            ))}
            </div>
        </div>
    )
}

export default CalendarGrid;