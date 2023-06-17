import React from 'react'
import './assets/styles/RecentWorkList.css'

class RecentWorkList extends React.Component {
    state = {
        isLoading: true,
        recentWorks: [],
        error: ''
    }
    getAllRecentWorks() {
        this.setState({ isLoading: true });
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'getAllWorks')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoading: false,
                recentWorks: result
            })
        })
        .catch((error) => {
            this.setState({ error: 'There was an error fetching the recent works'})
            console.error(error)
        })
    }
    getWorkByTag(tag) {
        this.setState({ isLoading: true });
        fetch(process.env.REACT_APP_SERVER_DOMAIN + 'getWorksByTag/' + tag)
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoading: false,
                recentWorks: result
            })
        })
        .catch((error) => {
            this.setState({ error: 'There was an error fetching the recent works' });
            console.error(error)
        });
    }
    componentDidMount() {
        this.getAllRecentWorks();
    }
    render() {
        const {
            recentWorks,
            error
        } = this.state;
        return (
            <React.Fragment>
                <div className='recentWorks-container'>
                    <h1>All Recent Works</h1>

                    <div class="dropdown">
                        <button class="dropbtn">Dropdown</button>
                        <div class="dropdown-content">
                            <a onClick={() => {this.getWorkByTag('all')}}href="#">All</a>
                            <a onClick={() => {this.getWorkByTag('sketch')}}href="#">Sketches</a>
                            <a onClick={() => {this.getWorkByTag('animation')}}href="#">Animation</a>
                            <a onClick={() => {this.getWorkByTag('observation/study')}}href="#">Observation/Study</a>
                            <a onClick={() => {this.getWorkByTag('mixed_media')}}href="#">Mixed Media</a>
                            <a onClick={() => {this.getWorkByTag('misc')}}href="#">Miscellanceous</a>

                        </div>
                    </div>

                    {
                        error ? <p> { error } </p> : null
                    }

                    {
                        /* dynamicaly render recent works */

                        recentWorks.map(recentWork => {
                            const {
                                work_id,
                                work_name,
                                work_description,
                                file_path
                            } = recentWork
                            // dynamically save images to object

                            
                            // recent work object
                            return (
                                <div key={work_id} className='work'>
                                    <p className='work_name'>{work_name}</p>
                                    <p className='work_description'>{work_description}</p>
                                    <img className='work_img' key={work_id} src={file_path} alt="artwork"></img> 
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

export default RecentWorkList