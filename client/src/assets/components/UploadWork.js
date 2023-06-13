import React from 'react';

class UploadWork extends React.Component {
    state = {
        isLoading: true,
        name: '',
        description: '',
        tags: new Set(),
        uploadedFile: '',
        error: ''
    };

    handleSubmit = async () => {
        this.setState({ error: 'Uploading work. Please wait...', isLoading: true })
        
        // populate formdata
        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('uploadFile', this.state.uploadedFile);

        // convert set to formdata
        const tagsArray = Array.from(this.state.tags);
        const tagsJSON = JSON.stringify(tagsArray);
        formData.append('tags', tagsJSON);


        // make api request
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'uploadWork', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({ error: 'Work Uploaded. Please allow some time for the changes to be dispalyed on the homepage', isLoading: false })
            } else {
                this.setState({ error: 'An error occured uploading the work. Please try again later (error ' + response.status + ")", isLoading: false })
            }
            
        })
        .catch(() => {
            this.setState({ error: 'A server error occured. Please try again later', isLoading: false })
        });
    };

    handleCheckboxChange(event) {
        const { value, checked } = event.target;
    
        if (checked) {
          // Add the tag to the array
          this.state.tags.add(value)
        } else {
          // Remove the tag from the array
          this.state.tags.delete(value)
        }
      }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    render() {
        const error = this.state.error
        return (
          <React.Fragment>
            <h2>Upload Work</h2>
                <label>Enter Work Name:
                    <input type='text' onChange={(e) => this.setState({ name: e.target.value })} required />
                </label>
                <label>Enter Work Description:
                    <textarea type='textbox' onChange={(e) => this.setState({ description: e.target.value })} required />
                </label>
                <label>Add Tags:
                    <label>sketch
                        <input type='checkbox' name='sketch' value='sketch' onChange={(e) => this.handleCheckboxChange(e)}></input>
                    </label>
                    <label>sketch
                        <input type='checkbox' name='surreal' value='surreal' onChange={(e) => this.handleCheckboxChange(e)}></input>
                    </label>
                </label>
                <label>Upload File:
                    <input type='file' onChange={(e) => { this.setState({ uploadedFile: e.target.files[0] }) }} required />
                </label>
    
                <button type='submit' onClick={this.handleSubmit}>Submit</button>
    
                <p className='error'>{error}</p>
          </React.Fragment>
        )
    };
}

export default UploadWork