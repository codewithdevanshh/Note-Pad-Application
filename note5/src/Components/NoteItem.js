import React, { useContext } from 'react';
import ModeContext from '../Context/Mode/ModeContext';
import NoteContext from '../Context/Notes/NoteContext';
import AlertContext from '../Context/Alert/AlertContext';

const NoteItem = (props) => {
    const {note ,UpdateNote} = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const a = useContext(ModeContext);
    const context2 = useContext(AlertContext);
    const {showAlert} = context2;

    const handledelete = () =>{
        deleteNote(note._id);
        showAlert("Note Deleted Successfully","success")
    }

    const UpdateNotes = () =>{
        UpdateNote(note);
    }
    return (
        <div className="col-md-3">
            <div className={`card bg-${a.mode === 'dark'?'dark' : ''} my-3 ${a.mode === 'dark'?'border-light' : ''}`}>
                <div className={`card-body text-${a.mode === 'light'?'dark' : 'light'}`}>
                    <h5 className="card-title"><b>{note.title}</b></h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={UpdateNotes}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
