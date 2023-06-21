import React from 'react'
import './assets/styles/ComicList.css'
import './assets/styles/ListAreas.css'

class ComicList extends React.Component {
    state = {
        isLoading: true,
        comics: [],
        error: null
    }
    getFetchComics() {
        this.setState({
            loading: true
        })
        fetch(process.env.REACT_APP_SERVER_DOMAIN + "getAllComics")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                loading: false,
                comics: result
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
    componentDidMount() {
        this.getFetchComics();
    }
    render() {
        const {
            comics,
            error
        } = this.state;
        return (
            <React.Fragment>
                <h1>All Comics</h1>
                <div className='list-container'>

                    {
                        error ? <p> { error.message } </p> : null
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
                                    <>
                                        <img className='comic_img' key={comic_id} src={link} alt="artwork"></img> 
                                    </>
                                )
                            });
                            
                            // comic object
                            return (
                                <div key={comic_id} className='card'>
                                    <p className='comic_name'>{comic_name}</p>
                                    {pictures}
                                    <p className='comic_description'>{comic_description}</p>
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

export default ComicList