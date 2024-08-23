import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const About = () => {

    const a = useContext(NoteContext);
    return (
        <div>
            This is {a.name} Page
        </div>
    )
}

export default About
