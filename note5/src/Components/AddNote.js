import React, { useContext, useState } from 'react'
import ModeContext from '../Context/Mode/ModeContext';
import NoteContext from '../Context/Notes/NoteContext';
import AlertContext from '../Context/Alert/AlertContext';

const AddNote = () => {
    const a = useContext(ModeContext);
    const context = useContext(NoteContext);
    const {addNote} = context;
    const context2 = useContext(AlertContext);
    const {showAlert} = context2;
    const [note,setNote] = useState({title: "",description: "",tag: "default"});
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag)
        setNote({
            title: "",
            description: "",
            tag: ""
        });
        showAlert("Note Added Successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name] : e.target.value})
    }

    return (
        <>
            <div className='my-3'>
                <h3 className={`text-${a.mode === 'light' ? 'dark' : 'light'}`}><b>Add a Note :</b></h3>
                <form method='POST' className='my-3'>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="Title">Note Title</label>
                        <input type="text" value={note.title} onChange={onChange} className="form-control my-3" id="Tilte" aria-describedby="Title" name="title" placeholder="Enter Your Note Title" />
                    </div>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="Description">Note Description</label>
                        <input type="text" value={note.description} className="form-control my-3" onChange={onChange} id="Description" name="description" placeholder="Enter Description For Your Note" />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-primary my-3">Add Note</button>
                </form>
                <h3 className={`text-${a.mode === 'light' ? 'dark' : 'light'}`}><b>Your Notes :</b></h3>
            </div>
        </>
  )
}

export default AddNote
