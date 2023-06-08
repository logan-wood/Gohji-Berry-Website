import React from 'react';

class UploadComic extends React.Component {
  state = {
    name: '',
    description: '',
    uploadedFiles: [],
    error: ''
  }

  handleFileSelection = async (e) => {
    e.preventDefault()

    const fileList = e.target.files

    //loop replacing current array in state with a new array with the new element appended
    for (var i = 0; i < fileList.length; i++) {
      this.setState({ uploadedFiles: [...this.state.uploadedFiles, fileList[i]] })
    }
  }

  handleSubmit = async () => {
    this.setState({ error: 'Uploading comic. Please wait...' })

    const formData = new FormData();
    
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    Object.values(this.state.uploadedFiles).forEach(file=>{
      formData.append('uploadFiles', file)
    })

    fetch('http://localhost:8080/uploadComic', {
        method: 'POST',
        body: formData 
    }).then(() => {
      this.setState({ error: 'Comic uploaded. Please allow some time for the files to be uploaded before displaying on the homepage' })
    }).catch((error) => {
      console.error(error)
      this.setState({ error: 'There was an error uploading the comic. Please try again later' })
    })
  }

  render() {
    const error = this.state.error
    return (
      <React.Fragment>
        <h2>Upload Comic</h2>
            <label>Enter Comic Name:
                <input type='text' onChange={(e) => this.setState({ name: e.target.value })} required />
            </label>
            <label>Enter Comic Description:
                <textarea type='textbox' onChange={(e) => this.setState({ description: e.target.value })} required />
            </label>
            <label>Upload File:
                <input type='file' onChange={(e) => { this.handleFileSelection(e) }} multiple required />
            </label>

            <button type='submit' onClick={this.handleSubmit}>Submit</button>

            <p className='error'>{error}</p>
      </React.Fragment>
    )
  }
}

export default UploadComic
