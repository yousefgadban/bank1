import React, {useEffect, useState} from "react";
import {  GetAllAction, TransferCash, DeleteUser, TransferFromManager, UpdateUserStatus } from '../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserCard = ({user, onDeleteUser}) => {

    const [allActions, setAllActions] = useState([]);
    const [currentAmount, setCurrentAmount] = useState(user.balance);
    const [amountToTransfer, setAmountToTransfer] = useState(0);
    const [status, setStatus] = useState(false);

    useEffect(()=> {

        setCurrentAmount(user.balance)
        setStatus(user.isActive)
     
    }, []);



    const onTransferClicked = () => {
        console.log('onTransferClicked ', amountToTransfer);

        if (+amountToTransfer > 0) {

            let params = {
                userId: user._id,
                amount: +amountToTransfer,
                isWithDrawal: false,
                toAccount: user.accountNumber,
                using: `Money From manager` 
            }   
            
            TransferFromManager(params).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);
                if (response.status === 201) {
                    setCurrentAmount((prevAmount) => prevAmount + +amountToTransfer);
                } else {
                    if (actionResponse.data === 'unactive user') {
                        console.log("UnActive account");
                        toast.info("UnActive account");
                    } else {
                        console.log('somthing wrong, try again later');
                    }
                }
            });
        } else {
            console.log('cant transfer zero or less');
        }

    }

    const onActiveClicked = () => {
        console.log('onActiveClicked', user._id);

        UpdateUserStatus(user._id).then((response)=>{
            let actionResponse = response.data;
            console.log(actionResponse);
            if (response.status === 200) {
                setStatus(!status)
            } else {
                console.log('somthing wrong, try again later');
            }
        });
    }

    const onDeleteUserClicked = () => {
        console.log('onDeleteUserClicked ', user._id);

        DeleteUser(user._id).then((response)=>{
            let actionResponse = response.data;
            console.log(actionResponse);
            if (response.status === 200) {
                onDeleteUser(user._id)
            } else {
                console.log('somthing wrong, try again later');
            }
        });
    }

    return (
        <div>
             <div style={{border: '1px solid #333', borderRadius: '12px', margin: '10px', width: '350px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <img className="account-profile-img" alt="" src={ user.avatar } style={{width: '100px'}} />
                    <input 
                        type='button' 
                        value='Active/unActive' 
                        onClick={(e)=>{onActiveClicked()}}
                        style={{backgroundColor: '#2196f3', border: '1px solid #2196f3', color: 'white', borderRadius: '5px', height: '30px', width: '100px'}} />
                    <input 
                        type='button' 
                        value='Delete'  
                        onClick={(e)=>{onDeleteUserClicked()}}
                        style={{backgroundColor: '#d14c47', border: '1px solid #d14c47', color: 'white', borderRadius: '5px', height: '30px', width: '100px'}} />

                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                    <p>Welcome: <span>{user.name }</span></p>
                    <p>Account Number: <span>{user.accountNumber}</span></p>
                    <p>Balance: <span>{currentAmount} &#8362;</span></p>
                    <p> isActive: <span>{status ? 'active' : 'unactive'}</span></p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input 
                            type='number' 
                            onChange={(e) => {setAmountToTransfer(e.target.value)}}
                            style={{height: '30px', width: '70px', backgroundClip: 'white', borderRadius: '4px', border: '1px solid #2196f3'}} />
                        <input 
                            type='button' 
                            value='Transfer' 
                            onClick={(e)=>{onTransferClicked()}}
                            style={{backgroundColor: '#2196f3', border: '1px solid #2196f3', color: 'white', borderRadius: '5px', height: '30px', width: '100px'}} />
                           
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}