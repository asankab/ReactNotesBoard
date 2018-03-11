import React, { Component } from 'react'
import Draggable from 'react-draggable'

class Notes extends Component {

    constructor(props) {
        super(props)

        this.state = { notes: [], editing: false }

        this.handleEditing = this.handleEditing.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount() {
        //fetch 10 notes from API and set to state
        let result = {
            notes: [
                {
                    id: 0,
                    noteText: 'Call Mishel'
                },
                {
                    id: 1,
                    noteText: 'Meet Methuka'
                }
                ,
                {
                    id: 3,
                    noteText: 'Meet Asanka'
                }
                ,
                {
                    id: 4,
                    noteText: 'Meet Anusha'
                }
            ],
            editing: false,
            currentEditingNoteId: 0
        };

        this.setState({ notes: result.notes })

        this.style = {

        }
    }

    randomBetween(x, y, s){
        return (x + Math.ceil(Math.random() * (x-y))
    }

    componentDidUpdate(){
        if(this.state.editing){
            this.newText.focus()
            this.newText.select()
        }
    }

    handleEditing(id) {
        this.setState({ editingNoteId: id, editing: true })
    }

    handleSave() {
        this.updateNote(this.newText.value, this.state.editingNoteId)
        this.setState({ editing: false })
    }

    handleCancel() {
        this.setState({ editing: false })
    }

    nextId(){
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    add(newNote){
        var notes = [
                ...this.state.notes, newNote,
                {
                    id: this.nextId(),
                    noteText: newNote
                }
            ]

        this.setState({notes})
    }

    updateNote(updatedNote, id){
        var notes = this.state.notes.map(
            note => (note.id !== id) ?
                note:
                {
                    ...note,
                    noteText: updatedNote
                }
        )

        console.log(notes)
        this.setState({notes})
    }

    getNoteText(id){
        let filteredNotes = this.state.notes.filter(x => x.id === id);

        if(filteredNotes[0] === undefined){
            null;
        }
        else {
            return filteredNotes[0].noteText;
        }
    }

    renderDisplay(note) {
        return (
            <Draggable>
                <div key={note.id} className="note" >
                    <span>
                        {note.noteText}
                    </span>
                    <div>
                        <button onClick={() => this.handleEditing(note.id)}>Edit</button>
                    </div>
                </div>
            </Draggable>
        )
    }

    renderForm(id) {
        let noteText = this.getNoteText(id) || 'New Note'
        return (
            <div className="note">
                <div>
                    <textarea
                        id={id}
                        ref={(input) => { this.newText = input; }}
                        defaultValue={noteText}>
                    </textarea>

                </div>
                <div>
                    <button onClick={() => this.handleSave()}>Save</button>
                    <button onClick={() => this.handleCancel()}>Cancel</button>
                </div>
            </div>
        )
    }

    render() {
        //console.log('rendered')
        if(!this.state.editing) {
            return this.state.notes.map((note => {
                return this.renderDisplay(note)
            }))
        }
        else {
            return this.renderForm(this.state.editingNoteId)
        }
    }
}

export default Notes;