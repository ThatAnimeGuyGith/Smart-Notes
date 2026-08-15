import { useRef, useState, useEffect } from 'react'
import './App.css'
import { getItem, setItem } from './utils/localStorage'

interface Note {
  id: number
  title: string
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const item = getItem('notes')
    return item || []
  });

  const [tempTitle, setTempTitle] = useState<string>('')
  const [text , setText] = useState('')
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null)
  const scrollPos = useRef<number>(0)

  const addNote = (title: string, content: string) => {
    if (title.trim()=='') {
      alert('Error: Note title cannot be empty.')
      // content and title can be empty somehow without throwing an error, so i did it myself
      return
    }

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  }

  const clearInput = () => {
    setText('')
    setTempTitle('')
    setActiveNoteId(null)
  }

  useEffect(() => {
    setItem("notes", notes)
  }, [notes])

  return (
    <>
      <h1>Smart Notes</h1>
      <p>Welcome to the Smart Notes app! Write your notes below:</p>

      <div className="spacer"></div>

      <textarea className="title-input"
        value={tempTitle}
        onChange={(e) => setTempTitle(e.target.value)}
        placeholder="Note Title"
      />

      <div className="container">
        <button className="note-button" onClick={() =>
          {
            if (activeNoteId !== null) {
              setNotes((prevNotes) => prevNotes.map(note => {
                if (note.id === activeNoteId) {
                  return { ...note, title: tempTitle, content: text };
                }
                return note;
              }));
              setActiveNoteId(null);
              clearInput()
              window.scrollTo(0, scrollPos.current)
              scrollPos.current = 0
            } else {
              addNote(tempTitle, text)
              setText('')
              setTempTitle('')
            }
          }
          }> {activeNoteId === null ? 'New Note' : 'Save Note'}
        </button>

        <button className="note-button clear-button" onClick={() =>
          {
            setText('')
          }
          }> Clear Note Body
        </button>

        <button className="note-button" onClick={() =>
          {
            setNotes([])
            clearInput()
          }
          }> Delete All
        </button>
      </div>

      <div className="spacer"></div>

      <textarea
        className="note-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your note here..."
      />

      <div className="spacer"></div>     

      <div className="note-list">
        {notes.map(note => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>

            <div className="container">
              <button className="note-button" onClick={() =>
                {
                  setActiveNoteId(note.id)
                  setText(note.content)
                  setTempTitle(note.title)
                  scrollPos.current = window.scrollY
                  window.scrollTo(0, 0);
                }
                }> Open Note
              </button>

              <button className="note-button clear-button" onClick={() =>
                {
                  deleteNote(note.id)
                }
                }> Delete Note
              </button>
            </div>
            <div className="spacer"></div>
          </div>
        ))}
    </div>
    </>
  )
}

export default App
