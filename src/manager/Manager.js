import React, {useEffect, useState} from "react";
import { GetAllUsers, GetFilteredUsers } from '../api/api'
import { UserCard } from "./UserCard";
import '../App.css'
import Spinner from "../Spinner/Spinner";

export const Manager = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [filterValue, setFilterValue] = useState(0);
    const [filter, setFilter] = useState('equal');

    useEffect(()=> {
        setShowLoader(true);
        GetAllUsers().then((response)=>{
            let allUsers = response.data.data;
            console.log('allUsers', allUsers);
            setShowLoader(false);
            setAllUsers(allUsers);

        });
    }, []);

    const onDeleteUser= (deleteId) => {
        console.log('manager onDeleteUser ', deleteId);
        let updated = allUsers.filter((user) => {
            return user.id !== deleteId;
        })
        setAllUsers(updated);
    }


    const onselectionchange = (e) => {
        console.log('onselectionchange', e.target.value);
        setFilter(e.target.value);
    }

    const onFilterClicked = () => {
        console.log('onFilterClicked', filter, filterValue);
        setShowLoader(true);

        let params = {
            filter: filter,
            filterValue: filterValue
        }
        GetFilteredUsers(params).then((response)=>{
            let filteredUsers = response.data.data;
            console.log('filteredUsers', filteredUsers);
            setShowLoader(false);
            setAllUsers(filteredUsers);

        });
    }

   
    return (
        <div>
            <div style={{display: showLoader ? 'flex': 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '92vh'}}>
                <Spinner message="Loading..."/>
            </div>
            <div style={{display: !showLoader ? 'flex': 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                <label >filter</label> <br />
                    <select name="filter" id="filter" onChange={(e) => {onselectionchange(e)}}>
                        <option value="equal">Equal to</option>
                        <option value="greater">Greater than</option>
                        <option value="lesser">Less than</option>
                    </select>
                    <input
                        type='number' 
                        value={filterValue}
                        onChange={(e) => {setFilterValue(e.target.value)}}
                        style={{height: '30px', width: '70px', backgroundClip: 'white', borderRadius: '4px', border: '1px solid #2196f3'}} />
                        <br />
                    <input type='button' value='filter' onClick={() => {onFilterClicked()}} />
                </div>
                <div className="manager-grid" >
                    {allUsers.map((user) => {
                        return <UserCard key={user.id} user={user} onDeleteUser={onDeleteUser} />
                    })}
                </div>
            </div>
        </div>
    );
}