import React from 'react';

class UploadUpdate extends React.Component {
    state = {
        isLoading: true,
        name: '',
        description: '',
        error: ''
    };

    handleSubmit = async () => {
        this.setState({ error: 'Uploading update. Please wait...', isLoading: true })
        
        // populate formdata
        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);


        // make api request
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'uploadUpdate', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({ error: 'Update Uploaded. Please allow some time for the changes to be dispalyed on the homepage', isLoading: false })
            } else {
                this.setState({ error: 'An error occured uploading the update. Please try again later (error ' + response.status + ")", isLoading: false })
            }
            
        })
        .catch(() => {
            this.setState({ error: 'A server error occured. Please try again later', isLoading: false })
        });
    };

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    render() {
        const error = this.state.error
        return (
          <React.Fragment>
            <h2>Upload Update</h2>
                <label>Enter Update Name:
                    <input type='text' onChange={(e) => this.setState({ name: e.target.value })} required />
                </label>
                <label>Enter Update Description:
                    <textarea type='textbox' onChange={(e) => this.setState({ description: e.target.value })} required />
                </label>
    
                <button type='submit' onClick={this.handleSubmit}>Submit</button>
    
                <p className='error'>{error}</p>
          </React.Fragment>
        )
    };
}

export default UploadUpdate