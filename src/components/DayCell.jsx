import './DayCell.css'

function DayCell({ day, currentDate, startDate, endDate, onDayClick }) {
  if (day === null) {
    return <div className="day-cell empty"></div>
  }

  const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
  const today = new Date()

  const isStart = startDate && thisDate.toDateString() === startDate.toDateString()
  const isEnd = endDate && thisDate.toDateString() === endDate.toDateString()
  const isInRange = startDate && endDate && thisDate > startDate && thisDate < endDate
  const isToday = thisDate.toDateString() === today.toDateString()

  // Build className string based on state
  let className = 'day-cell'
  if (isStart) className += ' start'
  else if (isEnd) className += ' end'
  else if (isInRange) className += ' in-range'
  if (isToday && !isStart && !isEnd) className += ' today'

  return (
    <div className={className} onClick={() => onDayClick(day)}>
      {day}
    </div>
  )
}

export default DayCell;