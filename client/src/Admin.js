import React from 'react';
import './assets/styles/Admin.css';
import UploadComic from './assets/components/UploadComic';
import DeleteComic from './assets/components/DeleteComic';

class Admin extends React.Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        isConnected: false,
        selection: '',
        error: ''
    }

    pingDatabase() {
        fetch("http://localhost:8080/pingDB")
        .then((result) => {
            this.setState({
                loading: false,
                connected: result
            })
        })
        .catch((error) => {
            console.error(error)
            this.setState({ error: 'There was an error connecting to the database' })
        })
    }

    checkPassword() {
        this.setState({ authenticated: true })
        // FOR DEVELOPMENT, SKIP AUTHENTICATION
        // const password = prompt('Please Enter Admin Password')

        // if (password.match(process.env.REACT_APP_ADMIN_PASSWORD)) {
        //     this.setState({ authenticated: true });
        // }
    }

    componentDidMount() {
        this.checkPassword()
        this.pingDatabase()
    }

    render() {
        var {
            authenticated,
            connected,
            selection
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

                            <button onClick={() => {this.setState({ selection: 'addComic'})}}>Add Comic</button>
                            <button onClick={() => {this.setState({ selection: 'deleteComic'})}}>Delete Comic</button>


                        </div>
                        
                        <div className='contentPanel'>
                            {selection === 'addComic' && <UploadComic></UploadComic>}
                            {selection === 'deleteComic' && <DeleteComic></DeleteComic>}
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