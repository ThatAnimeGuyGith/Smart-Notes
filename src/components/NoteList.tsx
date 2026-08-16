import type { Note } from '../types'
import NoteItem from './NoteItem'

interface NoteListProps {
  notes: Note[]
  onOpen: (note: Note) => void
  onDelete: (id: string) => void
}

function NoteList({ notes, onOpen, onDelete }: NoteListProps) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onOpen={onOpen} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default NoteList