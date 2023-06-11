import React from 'react'

class DeleteComic extends React.Component {
    state = {
        isLoading: true,
        comics: [],
        error: ''
    }

    getAllComics() {
        var comics;

        // get all comics from backend
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'getAllComics')
        .then(async(res) => {
            const result = await res.json()
            console.log(result)

            this.setState({
                isLoading: false,
                comics: result
            })
        })
        .catch((error) => {
            this.setState({ error: 'There was an error fetching comics' })
            console.error(error)
        })
    }

    deleteComic(comic_id) {
        this.setState({ isLoading: true })

        // make api call
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'deleteComic/' + comic_id, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.status === 204) {
                this.getAllComics()
                this.setState({ error: 'Comic successfully deleted', isLoading: false })
            } else {
                this.setState({ error: 'An error occured deleting the comic. Please try again later', isLoading: false })
            }
        })
    }

    componentDidMount() {
        this.getAllComics()
    }

    render() {
        const {
            comics,
            isLoading,
            error
        } = this.state;
        return (
            <React.Fragment>
                <div className='comic-container'>
                    <h2>All Comics:</h2>

                    {
                        error ? <p> { error } </p> : null
                    }

                    {
                        /* dynamicaly render comics */

                        comics.map(comic => {
                            const {
                                comic_id,
                                comic_name,
                                comic_description,
                                file_paths
                            } = comic
                            // dynamically save images to object
                            const file_paths_array = JSON.parse(file_paths)
                            const pictures = file_paths_array.map(link => {
                                return ( 
                                    <img className='comic_img' key={comic_id} src={link} alt="artwork"></img> 
                                )
                            });
                            
                            // comic object
                            return (
                                <div key={comic_id} className='comic'>
                                    <p className='comic_name'>{comic_name}</p>
                                    <p className='comic_description'>{comic_description}</p>
                                    <button onClick={() => this.deleteComic(comic_id)}>Delete Comic</button>
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

export default DeleteComic