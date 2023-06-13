import React, { useState } from 'react';
import ComicList from './ComicList';
import UpdateList from './UpdateList';
import RecentWorkList from './RecentWorkList';
import './assets/styles/App.css';
import $ from 'jquery';

function openLeft() {
    document.querySelector('.main').classList.add('left-opened')
    setTimeout(() => { document.querySelector('.left').classList.add('opened'); }, 300)

    //disable main buttons
    $('.main-btns *').attr('disabled', true)
}
function closeLeft() {
    document.querySelector('.main').classList.remove('left-opened')
    document.querySelector('.left').classList.remove('opened');

    //enable main buttons
    $('.main-btns *').attr('disabled', false)
}

function openRight() {
    document.querySelector('.main').classList.add('right-opened')
    setTimeout(() => { document.querySelector('.right').classList.add('opened'); }, 300)

    //disable main buttons
    $('.main-btns *').attr('disabled', true)
}
function closeRight() {
    document.querySelector('.main').classList.remove('right-opened')
    document.querySelector('.right').classList.remove('opened');

    //enable main buttons
    $('.main-btns *').attr('disabled', false)
}

export default function App() {
    const [selection, setSelection] = useState("");

    return (
        <>     
            <div className='main'>
                <h1>GohjiBerry</h1>
                <a href='/admin'>admin panel</a>
                <div className='main-btns'>
                    <button className='main-btn' onClick={() => {
                        openRight()
                        setSelection('recentWorks')
                    }}>Recent Works</button>
                    <button className='main-btn' onClick={() => {
                        openLeft()
                        setSelection('updates')
                    }}>Updates</button>
                    <button className='main-btn' onClick={() => {
                        openRight()
                        setSelection('comics')
                    }}>Comics</button>
                    <button className='main-btn'>Commisions</button>
                </div>
            </div>

            <div className='left'>
                <button onClick={closeLeft}>close left</button>
                {selection === 'updates' && <UpdateList></UpdateList>}
            </div>
           
           <div className='right'>
                <h4>Right Content</h4>
                <button onClick={closeRight}>close right</button>
                {selection === 'recentWorks' && <RecentWorkList></RecentWorkList>}
                {selection === 'comics' && <ComicList></ComicList>}
           </div>
        </>
    );
}