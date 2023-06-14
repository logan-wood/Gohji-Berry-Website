import React from 'react'

class DeleteWork extends React.Component {
    state = {
        isLoading: true,
        works: [],
        error: ''
    }

    getAllWorks() {
        var comics;

        // get all comics from backend
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'getAllWorks')
        .then(async(res) => {
            const result = await res.json()

            this.setState({
                isLoading: false,
                works: result
            })
        })
        .catch((error) => {
            this.setState({ error: 'There was an error fetching works' })
            console.error(error)
        })
    }

    deleteWork(work_id) {
        this.setState({ isLoading: true })

        // make api call
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'deleteWork/' + work_id, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.status === 204) {
                this.getAllWorks()
                this.setState({ error: 'Work successfully deleted', isLoading: false })
            } else {
                this.setState({ error: 'An error occured deleting the work. Please try again later', isLoading: false })
            }
        })
    }

    componentDidMount() {
        this.getAllWorks()
    }

    render() {
        const {
            works,
            isLoading,
            error
        } = this.state;
        return (
            <React.Fragment>
                <div className='works-container'>
                    <h2>All Works:</h2>

                    {
                        error ? <p> { error } </p> : null
                    }

                    {
                        /* dynamicaly render comics */

                        works.map(work => {
                            const {
                                work_id,
                                work_name,
                                work_description,
                                file_path
                            } = work
                            // dynamically save images to object

                            
                            // recent work object
                            return (
                                <div key={work_id} className='work'>
                                    <p className='work_name'>{work_name}</p>
                                    <p className='work_description'>{work_description}</p>
                                    <img className='work_img' key={work_id} src={file_path} alt="artwork"></img> 
                                    <button onClick={() => this.deleteWork(work_id)}>Delete Work</button> 
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

export default DeleteWork