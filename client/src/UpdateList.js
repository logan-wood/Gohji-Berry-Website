import React from 'react'
import './assets/styles/UpdateList.css'
import './assets/styles/ListAreas.css'

class UpdateList extends React.Component {
    state = {
        isLoading: true,
        updates: [],
        error: null
    }
    getAllUpdates() {
        this.setState({
            loading: true
        })

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
    componentDidMount() {
        this.getAllUpdates();
    }
    render() {
        const {
            updates,
            error
        } = this.state;
        return (
            <React.Fragment>
                <h1>Updates</h1>

                <div className='list-container'>

                    {
                        error ? <p> { error } </p> : null
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
                                <div key={update_id} className='card'>
                                    <p className='name'>{update_name}</p>
                                    <p className='description'>{update_description}</p>
                                    <br></br>                                   
                                </div>
                            );
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateList