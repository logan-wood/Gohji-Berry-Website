import React, {
    
} from 'react'

class ComicList extends React.Component {
    state = {
        isLoading: true,
        comics: [],
        error: null
    }
    getFetchComics() {
        this.setState({
            loading: true
        }, () => {
            fetch("http://localhost:8080/getAllComics").then(res => res.json()).then(result => this.setState({
                loading: false,
                comics: result
            })).catch(console.log)
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
                {
                    error ? <p> { error.message } </p> : null
                } 
                {
                    comics.map(comic => {
                        const {
                            comic_id,
                            comic_name,
                            comic_description,
                            file_paths
                        } = comic
                        //dynamically display pictures
                        const file_paths_array = JSON.parse(file_paths)
                        const pictures = file_paths_array.map(link => {
                            return ( 
                                <img key={comic_id} src={link} style={{width: '64px', height: 'auto'}} alt="artwork"></img> 
                            )
                        });
                        
                        return (
                            <div key={comic_id}>
                                <p>{comic_name}</p>
                                <p>{comic_description}</p>
                                {pictures}
                                <br></br>
                            </div>
                        );
                    })


                }
            </React.Fragment>
        );
    }
}

export default ComicList