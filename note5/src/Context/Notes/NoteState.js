import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{

    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes,setNotes] = useState(notesInitial)

    const FetchAllNotes = async () =>{

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
        });
      const json = await response.json();
      setNotes(json);
  }

    const addNote = async (title,description,tag) =>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
        const json = await response.json();
        setNotes(notes.concat(json));
    }

    const editNote = async (id,title,description,tag) =>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
        const json = await response.json();

        const newNote = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
              newNote[index].title = title;
              newNote[index].description = description;
              newNote[index].tag = tag;
              break;
            }
        }

        setNotes(newNote);
    }

    const deleteNote = async (id) =>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              "auth-token" : localStorage.getItem('token')
            }
          });
        const json = await response.json();
        const newNotes = notes.filter((note) => {return note._id!==id})
        setNotes(newNotes)
    }
    return(
        <NoteContext.Provider value = {{notes , addNote ,editNote ,deleteNote,FetchAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;