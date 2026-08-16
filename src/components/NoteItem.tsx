import type { Note } from '../types'

interface NoteItemProps {
  note: Note
  onOpen: (note: Note) => void
  onDelete: (id: string) => void
}

function NoteItem({ note, onOpen, onDelete }: NoteItemProps) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p className="note-text">{note.content}</p>
      <div className="container">
        <button className="note-button" onClick={() => onOpen(note)}>
          Open Note
        </button>
        <button className="note-button clear-button" onClick={() => onDelete(note.id)}>
          Delete Note
        </button>
      </div>
      <div className="spacer"></div>
    </div>
  )
}

export default NoteItem
