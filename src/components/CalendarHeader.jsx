import './CalendarHeader.css'

function CalendarHeader({ currentDate, onPrev, onNext }) {
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  return (
    <div className="calendar-header">
      <button className="nav-btn" onClick={onPrev}>&#8592;</button>
      <span className="header-month">{monthName} {year}</span>
      <button className="nav-btn" onClick={onNext}>&#8594;</button>
    </div>
  )
}

export default CalendarHeader