import React from 'react';
import './assets/styles/Admin.css';
import UploadComic from './assets/components/UploadComic';
import DeleteComic from './assets/components/DeleteComic';
import UploadUpdate from './assets/components/UploadUpdate';
import DeleteUpdate from './assets/components/DeleteUpdate';
import UploadWork from './assets/components/UploadWork';
import DeleteWork from './assets/components/DeleteWork';

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

                            <a href='/'>Home</a>

                            <button onClick={() => {this.setState({ selection: 'addComic'})}}>Add Comic</button>
                            <button onClick={() => {this.setState({ selection: 'deleteComic'})}}>Delete Comic</button>  
                            <button onClick={() => {this.setState({ selection: 'uploadUpdate'})}}>Upload Update</button>
                            <button onClick={() => {this.setState({ selection: 'deleteUpdate'})}}>Delete Update</button>
                            <button onClick={() => {this.setState({ selection: 'uploadWork' })}}>Upload Work</button>
                            <button onClick={() => {this.setState({ selection: 'deleteWork'})}}>Delete Work</button>

                        </div>
                        
                        <div className='contentPanel'>
                            {selection === 'addComic' && <UploadComic></UploadComic>}
                            {selection === 'deleteComic' && <DeleteComic></DeleteComic>}
                            {selection === 'uploadUpdate' && <UploadUpdate></UploadUpdate>}
                            {selection === 'deleteUpdate' && <DeleteUpdate></DeleteUpdate>}
                            {selection === 'uploadWork' && <UploadWork></UploadWork>}
                            {selection === 'deleteWork' && <DeleteWork></DeleteWork>}
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