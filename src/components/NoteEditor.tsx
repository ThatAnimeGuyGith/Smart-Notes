interface NoteEditorProps {
  title: string
  text: string
  isEditing: boolean
  onTitleChange: (value: string) => void
  onTextChange: (value: string) => void
  onSave: () => void
  onClearBody: () => void
  onDeleteAll: () => void
}

function NoteEditor({
  title, text, isEditing,
  onTitleChange, onTextChange, onSave, onClearBody, onDeleteAll,
}: NoteEditorProps) {
  return (
    <>
      <input
        className="title-input"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Note Title"
      />

      <div className="container">
        <button className="note-button" onClick={onSave}>
          {isEditing ? 'Save Note' : 'New Note'}
        </button>
        <button className="note-button clear-button" onClick={onClearBody}>
          Clear Note Body
        </button>
        <button className="note-button" onClick={onDeleteAll}>
          Delete All
        </button>
      </div>

      <textarea
        className="note-input"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type your note here..."
      />
    </>
  )
}

export default NoteEditor