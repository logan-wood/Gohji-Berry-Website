import React from 'react';

class UploadComic extends React.Component {
  state = {
    name: '',
    description: '',
    files: []
  }

  handleFileSelection = async (e) => {
    e.preventDefault()

    const fileList = e.target.files

    //loop replacing current array in state with a new array with the new element appended
    for (var i = 0; i < fileList.length; i++) {
      await this.setState({ files: [...this.state.files, fileList[i]] })
    }
  }

  handleSubmit = async () => {
    const formData = new FormData();
    
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    Object.values(this.state.files).forEach(file=>{
      formData.append("files", file)
    })

    console.log(formData)

    try {
      await fetch('http://localhost:8080/uploadComic', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData 
      })
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>Upload Comic</h2>

            <label>Enter Comic Name:
                <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
            </label>
            <label>Enter Comic Description:
                <textarea type='textbox' onChange={(e) => this.setState({ description: e.target.value })} />
            </label>
            <label>Upload File:
                <input type='file' onChange={(e) => { this.handleFileSelection(e) }} multiple />
            </label>

            <button onClick={this.handleSubmit}>Submit</button>

      </React.Fragment>
    )
  }
}

export default UploadComic
