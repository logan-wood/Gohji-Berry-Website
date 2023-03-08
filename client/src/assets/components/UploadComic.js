import React, { useState } from 'react';

class UploadComic extends React.Component {
  state = {
    name: '',
    description: '',
    files: FileList,
  }

  handleSubmit = async () => {
    fetch('https://reqbin.com/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: 'test'})
    }).then(data => {
      console.log(data)
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Upload Comic</h2>

        <form className='form'>
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

        </form>
      </React.Fragment>
    )
  }
}

export default UploadComic
