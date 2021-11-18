import React, {useState, useEffect} from "react";
import "./login.css";
import {  useHistory  } from 'react-router-dom';
import { GetAllUsers, LoginUser } from '../api/api'

 const Login = ({updateHeader})=> {

    const history = useHistory();
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [userLoggedInSuccessfully, setUserLoggedInSuccessfully] = useState(false);

    const currentUser = {
        createdAt: "2021-10-26T13:00:30.538Z",
        name: "Kyle Gleason",
        avatar: "https://cdn.fakercloud.com/avatars/mirfanqureshi_128.jpg",
        userName: "kyle",
        password: "kyle",
        accountNumber: 74732,
        id: "1"
    }

    const [user, setUser] = useState({});

    useEffect(()=>{
        // get user data from db
        console.log('did mount ', userLoggedInSuccessfully);
        if (userLoggedInSuccessfully) {
            history.push(`/account/${userId}/${'123'}`);
        } else {
            GetAllUsers().then((response)=>{
                let allUsers = response.data;
                console.log(allUsers);
                setAllUsers(allUsers);
            });
        }
        
    }, [])


    const onLoginClick = () => {
        console.log('onLoginClick ', userEmail, password);

        if (!validateEmail(userEmail) || password.trim().length < 6) {
            console.log('Invalid input');
        } else {
            console.log('start loginn');


            LoginUser(userEmail, password).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);

                if (actionResponse.result === 'success') {
                    setUserLoggedInSuccessfully(true);

                    setUserId(actionResponse.data._id);
                    history.push(`/account/${actionResponse.data._id}/${'123'}`);
                    
                    if (actionResponse.data.role === 'manager') {
                        updateHeader(2)
                    } else {
                        updateHeader(1)
                    }
                } else {
                    console.log('Incorrect Username or Password');
                }

                // if (response.status === 201) {
                //     updateHeader(1)
                //     history.push(`/account/${actionResponse.id}/${'123'}`);
                // } else {
                //     alert('Something went wrong... sorry');
                // }
            });

            // let userCredintals = allUsers.find((user) => {
            //     return user.userName === userName && user.password === password
            // });

            // if (userCredintals === undefined) {
            //     console.log('Incorrect Username or Password');
            // } else {
            //     setUserLoggedInSuccessfully(true);
            //     setUserId(userCredintals.id);
            //     history.push(`/account/${userCredintals.id}/${'123'}`);
                
            //     if (userCredintals.id === '3') {
            //         console.log('yousef', userCredintals.id, typeof userCredintals.id);
            //         updateHeader(2)
            //     } else {
            //         updateHeader(1)
            //     }
               
            // }

           
            //setUser(currentUser);
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
              <label >Email</label>
              <input 
                type="text" 
                placeholder="E-mail" 
                id="email" 
                name="email"
                onChange={(e) => {setUserEmail(e.target.value)}}/>
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
             <a href="#">forgot your password?</a>
             <button id="btn" className="btn" onClick={()=> {onLoginClick()}}>Sign in</button>
           </div>
         </div>
        </div>
    )
}
export default Login ;