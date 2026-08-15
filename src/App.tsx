import { useState } from 'react'
import './App.css'

interface Note {
  id: number
  title: string
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [tempTitle, setTempTitle] = useState<string>('')
  const [text , setText] = useState('')

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
            addNote(tempTitle, text)
            setText('')
            setTempTitle('')
          }
          }> New Note
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
            setTempTitle('')
            setText('')
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
            <button className="note-button clear-button" onClick={() =>
              {
                deleteNote(note.id)
              }
              }> Delete Note
            </button>
            <div className="spacer"></div>
          </div>
        ))}
    </div>
    </>
  )
}

export default App
