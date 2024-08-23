import React, { useContext, useState } from 'react'
import ModeContext from '../Context/Mode/ModeContext';
import AlertContext from '../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const a = useContext(ModeContext);
    const context = useContext(AlertContext);
    const {showAlert} = context;

    const host = "http://localhost:5000";

    const [Credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let  navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name,email,password} = Credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: Credentials.name ,email : Credentials.email ,password : Credentials.password})
        });

        const json = await response.json();
        console.log(json)

        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/")
            showAlert("Login Successfully","success")
        }else{
            showAlert("Invalid Credentials","danger")
        }
        setCredentials({
            name:"",
            email:"",
            password:"",
            cpassword:""
        })
    }

    const onChange = (e) =>{
        setCredentials({...Credentials,[e.target.name] : e.target.value})
    }
    return (
        <>
            <div className='my-3'>
                <h3 className={`text-${a.mode === 'light' ? 'dark' : 'light'}`}><b>Sign Up :</b></h3>
                <form onSubmit={handleSubmit} method='POST' className='my-3'>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="name">Name</label>
                        <input type="text" value={Credentials.name} className="form-control my-3" onChange={onChange} id="name" name="name" placeholder="Enter Your name" />
                    </div>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="email">Email</label>
                        <input type="email" value={Credentials.email} onChange={onChange} className="form-control my-3" id="email" aria-describedby="email" name="email" placeholder="Enter Your Email" />
                    </div>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="password">Password</label>
                        <input type="password" value={Credentials.password} className="form-control my-3" onChange={onChange} id="password" name="password" placeholder="Enter Your Password" />
                    </div>
                    <div className="form-group my-3">
                        <label className={`text-${a.mode === 'light' ? 'dark' : 'light'}`} htmlFor="cpassword">Confirm Password</label>
                        <input type="password" value={Credentials.cpassword} className="form-control my-3" onChange={onChange} id="cpassword" name="cpassword" placeholder="Confirm Your Password" />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp
