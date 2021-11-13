import React from "react";
import './Spinner.css';

class Spinner extends React.Component {

    render() {
        return(
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className="message">{this.props.message}</p>
            </div>
           
        );
    }
}

export default Spinner;