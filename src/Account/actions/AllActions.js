import React, { useState, useEffect } from "react";
import '../../App.css'

export const AllActions = ({display, allActions}) => {

    const [myActions, setMyActions] = useState([...allActions]);
    let currentBalance = 0;

    useEffect(() => {
        
        let actions = allActions.map((action, index) => {
            let date = action.date;
            let amount = action.isWithDrawal ? -action.amount : action.amount;
        
            return (
                <div key={action.id} style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
        
                    <div className="allActions-line" style={{height: allActions.length - 1 === index ? '65px' : '130px' }}> 
                    {/* &#8362; */}
                    </div> 
        
                    <div className="allActions-horiz-line"></div>
        
                    <div className="allActions-balance">
                        {currentBalance += amount} &#8362; 
                    </div>
        
                    <div className="allActions-horiz-line2"></div>
        
                    <div className="allActions-action">
                        <p>Amount: {amount}</p>
                        <p>Date: {date}</p>
                        <p>Action: {action.using }</p>
                    </div>
                    
                </div>
            );
            
        })
        setMyActions(actions);
    }, []);


    let allMyActions = allActions.map((action, index) => {
        let date = action.date;
        let amount = action.isWithDrawal ? -action.amount : action.amount;
    
        return (
            <div key={action.id} style={{display: 'flex', alignItems: 'center', position: 'relative'}}>

                <div className="allActions-line" style={{height: allActions.length - 1 === index ? '65px' : '130px' }}> 
                {/* &#8362; */}
                </div> 

                <div className="allActions-horiz-line"></div>

                <div className="allActions-balance">
                    {currentBalance += amount} &#8362; 
                </div>

                <div className="allActions-horiz-line2"></div>

                <div className="allActions-action">
                    <p>Amount: {amount}</p>
                    <p>Date: {date}</p>
                    <p>Action: {action.using }</p>
                </div>
                
            </div>
        );
        
    })
    //setMyActions(kareem);

    return ( 
        <div style={{display: display === 'allActions' ? 'block' : 'none'}} className="allActions-actions">
            {allMyActions}
        </div>
    );
}