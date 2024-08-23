import { useState } from "react";
import ModeContext from "./ModeContext";

const ModeState = (props) =>{

    const [mode,setmode] = useState('light');

    const toggleMode = () =>{
        if(mode === 'light'){
          setmode('dark');
          document.body.style.backgroundColor = 'black';
        }else{
          setmode('light');
          document.body.style.backgroundColor = 'white';
        }
      }

    return(
        <ModeContext.Provider value = {{mode,toggleMode}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState;