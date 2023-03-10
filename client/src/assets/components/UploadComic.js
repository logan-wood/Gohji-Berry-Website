import React from 'react';

class UploadComic extends React.Component {
  state = {
    name: '',
    description: '',
    files: FileList,
  }

  handleSubmit = async () => {
    try {
      await fetch('http://localhost:8080/uploadComic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
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
                <input type='file' onChange={(e) => this.setState({ files: e.target.files})} multiple />
            </label>

            <button onClick={this.handleSubmit}>Submit</button>

      </React.Fragment>
    )
  }
}

export default UploadComic
