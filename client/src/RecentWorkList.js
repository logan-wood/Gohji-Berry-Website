import React from 'react'
import './assets/styles/RecentWorkList.css'
import './assets/styles/ListAreas.css'
import $ from 'jquery';


class RecentWorkList extends React.Component {
    state = {
        isLoading: true,
        recentWorks: [],
        error: '',
        isDropdownOpen: false
    }

    toggleDropdown = (e) => {
        e.preventDefault()
        if (this.state.isDropdownOpen) {
            $('#dropdown-content').slideUp(300)
            // $('#dropdown-content').hide(300)
            $('#show-dropdown').removeClass('open')
        } else {
            $('#dropdown-content').slideDown(300)
            // $('#dropdown-content').show(300)
            $('#show-dropdown').addClass('open')
        }

        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
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
                recentWorks: result,
                error: ""
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
            error,
            isDropdownOpen
        } = this.state;
        return (
            <React.Fragment>
                <h1>Recent Works</h1>
                <div className='list-container'>
                    <div className='dropdown'>
                        <button id='show-dropdown' className='filter-btn' onClick={e => this.toggleDropdown(e)}>Filter</button>
                        <div id='dropdown-content'>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('all')}}href="#">All</button>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('sketch')}}href="#">Sketches</button>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('animation')}}href="#">Animation</button>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('observation_study')}}href="#">Observation/Study</button>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('mixed_media')}}href="#">Mixed Media</button>
                            <button className="filter-btn" onClick={() => {this.getWorkByTag('misc')}}href="#">Miscellanceous</button>
                        </div>
                    </div>

                    <div className='content'>
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
                                    <div key={work_id} className='card'>
                                        <img className='img' key={work_id} src={file_path} alt="artwork"></img> 
                                        <p className='name'>{work_name}</p>
                                        {/* <p className='description'>{work_description}</p> */}
                                        <br></br>
                                    </div>
                                );
                            })


                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RecentWorkList