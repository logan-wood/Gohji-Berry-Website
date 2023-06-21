import React from 'react'
import './assets/styles/RecentWorkList.css'
import './assets/styles/ListAreas.css'
import $ from 'jquery';
import closeIcon from './assets/icons/close.svg'


class RecentWorkList extends React.Component {
    state = {
        isLoading: true,
        recentWorks: [],
        error: '',
        isDropdownOpen: false,
        selectedFilter: '',
        selectedWork: {},
        isBlurActive: false,
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

        // add active class to active button
        $(`#${tag}`).addClass('open')
        if (this.state.selectedFilter != '') {
            $(`#${this.state.selectedFilter}`).removeClass('open')
        }
        this.setState({ selectedFilter: tag })

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

    setSelectedWork(selectedWork) {
        this.setState({ selectedWork: selectedWork })
    }

    togglePageBlur() {
        this.setState({ isBlurActive: !this.state.isBlurActive }, () => {
            if (!this.state.isBlurActive) {
                $('.blur-area').removeClass('active')
                $('.selected-work').removeClass('active')
            } else {
                $('.blur-area').addClass('active')   
                $('.selected-work').addClass('active')
            }
        })
    }

    componentDidMount() {
        this.getAllRecentWorks();
    }
    render() {
        const {
            recentWorks,
            error,
            selectedWork,
            isBlurActive,
        } = this.state;
        return (
            <React.Fragment>
                <h1>Recent Works</h1>
                <div className='list-container'>
                    <div className='dropdown'>
                        <button id='show-dropdown' className='filter-btn' onClick={e => this.toggleDropdown(e)}>Filter</button>
                        <div id='dropdown-content'>
                            <button className="filter-btn" id='all' onClick={() => {this.getWorkByTag('all')}}>All</button>
                            <button className="filter-btn" id='sketch' onClick={() => {this.getWorkByTag('sketch')}}>Sketches</button>
                            <button className="filter-btn" id='animation' onClick={() => {this.getWorkByTag('animation')}}>Animation</button>
                            <button className="filter-btn" id='observation_study' onClick={() => {this.getWorkByTag('observation_study')}}>Observation/Study</button>
                            <button className="filter-btn" id='mixed_media' onClick={() => {this.getWorkByTag('mixed_media')}}>Mixed Media</button>
                            <button className="filter-btn" id='misc' onClick={() => {this.getWorkByTag('misc')}}>Miscellanceous</button>
                        </div>
                    </div>

                    <div className='content'>
                        {
                            error ? <p> { error } </p> : null
                        }

                        {
                            /* dynamicaly render recent works */

                            recentWorks.map(recentWork => {
                                const currentWork = recentWork;
                                const {
                                    work_id,
                                    work_name,
                                    work_description,
                                    file_path,
                                } = currentWork;
                                // dynamically save images to object

                                
                                // recent work object
                                return (
                                    <div key={work_id} onClick={() => {
                                        this.setSelectedWork(currentWork)
                                        this.togglePageBlur()
                                    }} className='card'>
                                        <img className='img' key={work_id} src={file_path} alt="artwork"></img> 
                                        <p className='work_name'>{work_name}</p>
                                        <br></br>
                                    </div>
                                );
                            })
                        }
                    </div>
                    
                    {
                        selectedWork ? 
                        
                        <div className={'blur-area'}>
                            <div className='selected-work'>
                                <h2>{selectedWork.work_name}</h2>
                                <img src={closeIcon} className='selected-close-icon' onClick={() => {
                                    this.togglePageBlur()
                                    setTimeout(() => { this.setSelectedWork(null) }, 1000)
                                }} alt='close'></img>
                                <img src={selectedWork.file_path} className='content-img'></img>
                                <p>{selectedWork.work_description}</p>
                            </div>
                        </div>

                        :

                        null
                    }
                    
                </div>
            </React.Fragment>
        );
    }
}

export default RecentWorkList