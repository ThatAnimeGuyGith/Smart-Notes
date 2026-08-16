import { useRef, useState, useEffect } from 'react'
import './App.css'
import { getItem, setItem } from './utils/localStorage'
import type { Note } from './types'
import NoteEditor from './components/NoteEditor'
import NoteList from './components/NoteList'

function App() {
  const [notes, setNotes] = useState<Note[]>(() => getItem('notes') || [])
  const [tempTitle, setTempTitle] = useState('')
  const [text, setText] = useState('')
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const scrollPos = useRef<number>(0)

  useEffect(() => {
    setItem('notes', notes)
  }, [notes])

  const clearInput = () => {
    setText('')
    setTempTitle('')
    setActiveNoteId(null)
  }

  const handleSave = () => {
    const title = tempTitle.trim()

    if (title === '') {
      alert('Error: Note title cannot be empty.')
      return
    }

    if (activeNoteId !== null) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === activeNoteId ? { ...note, title, content: text } : note
        )
      )
      window.scrollTo(0, scrollPos.current)
      scrollPos.current = 0
      clearInput()
    } else {
      setNotes((prev) => [...prev, { id: crypto.randomUUID(), title, content: text }])
      clearInput()
    }
  }

  const handleOpen = (note: Note) => {
    setActiveNoteId(note.id)
    setText(note.content)
    setTempTitle(note.title)
    scrollPos.current = window.scrollY
    window.scrollTo(0, 0)
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))

    if (id === activeNoteId) {
      clearInput()
    }
  }

  return (
    <>
      <h1>Smart Notes</h1>
      <p>Welcome to the Smart Notes app! Write your notes below:</p>
      <div className="spacer"></div>

      <NoteEditor
        title={tempTitle}
        text={text}
        isEditing={activeNoteId !== null}
        onTitleChange={setTempTitle}
        onTextChange={setText}
        onSave={handleSave}
        onClearBody={() => setText('')}
        onDeleteAll={() => { setNotes([]); clearInput() }}
      />

      <div className="spacer"></div>
      <NoteList notes={notes} onOpen={handleOpen} onDelete={handleDelete} />
    </>
  )
}

export default App
