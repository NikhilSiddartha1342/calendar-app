import { useState, useEffect } from 'react'
import './NotesSection.css'

function NotesSection({ startDate, endDate, notes, onSave, onDelete, currentDate }) {

  const [inputText, setInputText] = useState('')

  const buildKey = () => {
    if (!startDate) return null
    const opts = { month: 'short', day: 'numeric' }
    const start = startDate.toLocaleDateString('default', opts)
    const end = endDate ? endDate.toLocaleDateString('default', opts) : start
    return `${start} - ${end}`
  }

  const key = buildKey()

  // When selected range changes, pre-fill textarea if note already exists
  useEffect(() => {
    if (key && notes[key]) {
      setInputText(notes[key].text)
    } else {
      setInputText('')
    }
  }, [key, notes])

  const handleSave = () => {
    if (!key || !inputText.trim()) return
    onSave(key, inputText)
    // setInputText('')
  }

  // Filter: only show notes belonging to current month + year
  const filteredNotes = Object.entries(notes).filter(([rangeKey, value]) =>
    value.month === currentDate.getMonth() &&
    value.year === currentDate.getFullYear()
  )

  return (
    <div className="notes-section">
      <h3>NOTES</h3>

      {key ? (
        <p className="notes-range-label">
          For: <strong>{key}</strong>
        </p>
      ) : (
        <p className="no-selection-msg">Select a date range to add a note</p>
      )}

      {key && (
        <div>
          <textarea
            className="notes-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
          />
          <button className="save-btn" onClick={handleSave}>Save Note</button>
        </div>
      )}

      <div className="saved-notes">
        <h4>SAVED NOTES</h4>

        {filteredNotes.length === 0 && (
          <p className="no-selection-msg">No notes for this month</p>
        )}

        {filteredNotes.map(([range, value]) => (
          <div key={range} className="note-item">
            <div className="note-item-header">
              <span className="note-range">{range}</span>
              <button
                className="delete-btn"
                onClick={() => onDelete(range)}
              >✕</button>
            </div>
            <span className="note-text">{value.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesSection