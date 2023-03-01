import React from 'react';
import './assets/styles/Admin.css'
import AddComic from './assets/components/AddComic'

class Admin extends React.Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        isConnected: false
    }

    pingDatabase() {
        this.setState({
            loading: true
        }, () => {
            fetch("http://localhost:8080/pingDB").then(result => this.setState({
                loading: false,
                connected: result
            })).catch(console.log)
        })
    }

    checkPassword() {
        this.setState({ authenticated: true })
        // FOR DEVELOPMENT, SKIP AUTHENTICATION
        // const password = prompt('Please Enter Admin Password')

        // if (password.match('password')) {
        //     this.setState({ authenticated: true });
        // }
    }

    componentDidMount() {
        this.checkPassword()
        this.pingDatabase()
    }

    render() {
        const {
            authenticated,
            connected
        } = this.state

        if (authenticated) {
            return (
                <React.Fragment>
                    <div className='adminPanel'>
                        <div className='controlPanel'>
                            <h1>Admin panel</h1>
                            {
                                connected ? <h4>connected to database</h4> : <h4>could not connect to database</h4>
                            }

                            <button>Add Comic</button>


                        </div>
                        
                        <div className='contentPanel'>
                            <AddComic></AddComic>
                        </div>
                    </div>

                    


                </React.Fragment>

            )
        } else {
            return (
                <React.Fragment>
                    <h1>Authentication Failed</h1>
                </React.Fragment>
            )
        }
    }

    
}

export default Admin