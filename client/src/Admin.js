import React from 'react';

class Admin extends React.Component {
    state = {
        authenticated: false
    }

    checkPassword() {
        const password = prompt('Please Enter Admin Password')

        if (password.match('password')) {
            this.setState({ authenticated: true });
        }
    }

    componentDidMount() {
        this.checkPassword()
    }

    render() {
        if (this.state.authenticated) {
            return (
                <h1>Admin panel</h1>
            )
        } else {
            return (
                <h1>Authentication Failed</h1>
            )
        }
    }

    
}

export default Admin