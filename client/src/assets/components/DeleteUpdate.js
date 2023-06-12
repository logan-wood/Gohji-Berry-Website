import React from 'react'

class DeleteUpdate extends React.Component {
    state = {
        isLoading: true,
        updates: [],
        error: ''
    };

    getAllUpdates() {
        this.setState({ isLoading: true });
        var updates;

        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'getAllUpdates')
        .then(async(result) => {
            const updates = await result.json();

            this.setState({
                isLoading: false,
                updates: updates
            });
        })
        .catch(() => {
            this.setState({ error: 'There was an error fetching updates', isLoading: false });
        });
    }

    deleteUpdate(update_id) {
        this.setState({ isLoading: true })

        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'deleteUpdate/' + update_id, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.status === 204) {
                this.getAllUpdates();
                this.setState({ error: 'Update successfully deleted', isLoading: false });
            } else {
                this.setState({ error: 'There was an error deleting the update. Please try again later', isLoading: false });
            }
        })
        .catch(() => {
            this.setState({ error: 'There was an error deleting the update. Please try again later.', isLoading: false });
        });
    }

    componentDidMount() {
        this.getAllUpdates()
    }

    render() {
        const {
            updates,
            isLoading,
            error
        } = this.state;

        console.log(this.state)

        return(
            <React.Fragment>
                <div className='update-container'>
                    <h2>All Updates:</h2>

                    {
                        error ? <p>{error}</p> : null
                    }

                    {
                        // dynamically render updates
                        updates.map(update => {
                            console.log(update)
                            const {
                                update_id,
                                update_name,
                                update_description
                            } = update;

                            return (
                                <div key={update_id} className='update'>
                                    <p className='update_name'>{update_name}</p>
                                    <p className='update_description'>{update_description}</p>
                                    <button onClick={() => this.deleteUpdate(update_id)}>Delete Update</button> 
                                    <br></br>                                   
                                </div>
                            );
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default DeleteUpdate