import React, {useState, useEffect} from "react";
import "../Login/login.css";
import {  useHistory  } from 'react-router-dom';
import {  AddNewUser } from '../api/api'

 const Register = ({updateHeader})=> {

    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        
        
    }, [])


    const onLoginClick = () => {
        console.log('onLoginClick ',name, email, password);

        if (!validateEmail(email) || password.trim().length < 6 || name.trim().length < 6) {
            console.log('invalid input');
        } else {
            console.log('start register ');

            let params = {
                name: name,
                email: email,
                password: password
            }

            AddNewUser(params).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);
                if (response.status === 201) {
                    updateHeader(1)
                    history.push(`/account/${actionResponse.id}/${'123'}`);
                } else {
                    alert('Something went wrong... sorry');
                }
            });

        }

    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    return(
    <div className="container">
        <div className="form">
         <div className="input-field">
              <label >Name</label>
              <input 
                type="text" 
                placeholder="User Name" 
                id="name" 
                name="name"
                onChange={(e) => {setName(e.target.value)}}/>
          </div>
          <div className="input-field">
              <label >Email</label>
              <input 
                type="text" 
                placeholder="User Name" 
                id="email" 
                name="email"
                onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
        <div className="input-field">
           <label >Password</label>
           <input 
                type="password" 
                placeholder="********" 
                id="password" 
                name="password"
                onChange={(e) => {setPassword(e.target.value)}}/>
       </div>
       <div className="input-field">
            <label >
                 <input type="checkbox" name="" id="remember"/>Remember me
           </label>
       </div>
       <div className="action">
             <button id="btn" className="btn" onClick={()=> {onLoginClick()}}>Register</button>
           </div>
         </div>
        </div>
    )
}
export default Register ;