import React from 'react';

class AddComic extends React.Component {

    render() {
        return(
            <React.Fragment>
                <h2>Upload Comic</h2>

                <form >
                    <label>Enter Comic Name:
                        <input type="text" />
                    </label>

                </form>
            </React.Fragment>
        )
    }

}

export default AddComic