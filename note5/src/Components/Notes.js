import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import ModeContext from '../Context/Mode/ModeContext';
import AlertContext from '../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
    const a = useContext(ModeContext);
    const context = useContext(NoteContext);
    const {notes , FetchAllNotes , editNote} = context;
    const context2 = useContext(AlertContext);
    const {showAlert} = context2;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'));
            FetchAllNotes()
        }else{
            navigate("/Login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:"",etitle: "",edescription: "",etag: "default"});

    const UpdateNote = (currentNote) =>{
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
        ref.current.click();
    }

    const handleClick = (e) =>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        showAlert("Note Updated Successfully","success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name] : e.target.value})
    }

    return (
        <>
            <AddNote/>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal"></button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className={`modal-content bg-${a.mode}`}>
                    <div className="modal-header">
                        <h5 className={`modal-title text-${a.mode === 'light' ? 'dark' : 'light'}`} id="exampleModalLabel">Modal title</h5>
                        <button type="button" className={`close text-${a.mode === 'light' ? 'dark' : 'light'}`} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={`modal-body`}>
                        <div className='my-3'>
                            <h3 className={`text-${a.mode === 'light' ? 'dark' : 'light'}`}><b>Add a Note :</b></h3>
                            <form method='POST' className='my-3'>
                                <div className="form-group my-3">
                                    <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="etitle">Note Title</label>
                                    <input type="text" value={note.etitle} onChange={onChange} className="form-control my-3" id="etitle" aria-describedby="etitle" name="etitle" placeholder="Enter Your Note Title" />
                                </div>
                                <div className="form-group my-3">
                                    <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="edescription">Note Description</label>
                                    <input type="text" value={note.edescription} className="form-control my-3" onChange={onChange} id="edescription" name="edescription" placeholder="Enter Description For Your Note" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={refClose} className={`btn btn-${a.mode === 'light' ? 'dark' : 'light'}`} data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                    </div>
                </div>
            </div>
            </div>

            
            <div className='row my-3'>
                {notes.map((note) =>{
                    return <NoteItem key={note._id} UpdateNote = {UpdateNote} note = {note}/>;
                })}
            </div>
        </>
    )
}

export default Notes
