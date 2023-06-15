import React from 'react';

class Commissions extends React.Component {
    state = {
        termsAccepted: false
    }
    render() {
        return (
            <React.Fragment>
                <div className='commission-info'>
                    <h1>Commission Information</h1>
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
                        <button onClick={() => this.setState({ termsAccepted: true })}>Agree</button>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Commissions