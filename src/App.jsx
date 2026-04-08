import { useState} from "react";
import CalendarGrid from './components/CalendarGrid'
import CalendarHeader from "./components/CalendarHeader";
import NotesSection from "./components/NotesSection";
import HeroImage from "./components/HeroImage";
import './App.css'
import { useEffect } from "react";

function App() {

  const [currentDate, setCurrentDate] = useState(new Date())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('calendar-notes')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes))
  }, [notes])



  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDayClick = (day) => {
    const clicked = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    if(!startDate || (startDate && endDate)) {
      setStartDate(clicked)
      setEndDate(null)
    } else {
      if(clicked < startDate) {
        setEndDate(startDate)
        setStartDate(clicked)
      } else {
        setEndDate(clicked)
      }
    }
  }

  const handleNoteSave = (key, text) => {
    setNotes(prev => ({
      ...prev,
      [key]: { text, month: currentDate.getMonth(), year: currentDate.getFullYear() }
    }))
  }

  const handleNoteDelete = (key) => {
    setNotes(prev => {
      const updated = { ...prev }
      delete updated[key]
      return updated
    })
  }

  return (
    
    <div className="app-container">
      <HeroImage currentDate={currentDate} />
      
      <div className="calendar-body">
        <div className="calendar-left">

           <CalendarHeader 
            currentDate={currentDate}
            onPrev={prevMonth}
            onNext={nextMonth}
          />

          <CalendarGrid 
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            onDayClick={handleDayClick}
          />

        </div>

        <div className="calendar-right">
           <NotesSection
            startDate={startDate}
            endDate={endDate}
            notes={notes}
            onSave={handleNoteSave}
            onDelete={handleNoteDelete}
            currentDate={currentDate}
          />
        </div>

      </div>
    </div>
  )
}

export default App