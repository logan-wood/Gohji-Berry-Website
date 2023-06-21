import React from 'react';
import './assets/styles/Commissions.css'

class Commissions extends React.Component {
    state = {
        termsAccepted: false
    }
    render() {
        return (
            <React.Fragment>
                <h1 class='commission-h1'>Commission Information</h1>

                <div className='commission-info'>
                    <p>Thank you for considering my work for commission!</p>
                    <p>Please read the T&Cs below before continuing:</p>
                    <ul>
                        <li>You pay me a million dollars</li>
                        <li>hurgen durgen durr</li>
                        <li>bullet point three</li>
                    </ul>


                    { this.state.termsAccepted ? (
                        <>
                            <p>Please get in contact with me at</p>
                            <ul>
                                <li>0800838383</li>
                                <li>pizza.hut@gmail.com</li>
                            </ul>
                        </> 
                    ) : (
                        <button className='accept-btn' onClick={() => this.setState({ termsAccepted: true })}>Agree</button>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Commissions