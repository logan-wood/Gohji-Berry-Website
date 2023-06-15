import React, { useState } from 'react';
import ComicList from './ComicList';
import UpdateList from './UpdateList';
import RecentWorkList from './RecentWorkList';
import './assets/styles/App.css';
import CloseIcon from './assets/icons/close.svg'
import $ from 'jquery';
import Commissions from './Commissions';

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
    document.querySelector('#footer-p').classList.add('right-opened')

    setTimeout(() => { document.querySelector('.right').classList.add('opened'); }, 300)

    //disable main buttons
    $('.main-btns *').attr('disabled', true)
}
function closeRight() {
    document.querySelector('.main').classList.remove('right-opened')
    document.querySelector('#footer-p').classList.remove('right-opened')
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
                <a id="admin-link" href='/admin'>admin panel</a>
                {/*  */}
                <div className='main-btns'>
                    <button id="recentWorks-btn" className='main-btn right-btn' onClick={() => {
                        openRight()
                        setSelection('recentWorks')
                    }}>Recent Works</button>
                    <button id="updates-btn" className='main-btn left-btn' onClick={() => {
                        openLeft()
                        setSelection('updates')
                    }}>Updates</button>
                    <button id="comics-btn" className='main-btn right-btn' onClick={() => {
                        openRight()
                        setSelection('comics')
                    }}>Comics</button>
                    <button id="commissions-btn" className='main-btn left-btn' onClick={() => {
                        openLeft()
                        setSelection('commissions')
                    }}>Commissions</button>
                </div>
            </div>

            <div className='left'>
                <img src={CloseIcon} className='close-icon' alt='close' onClick={closeLeft}></img>
                {selection === 'updates' && <UpdateList></UpdateList>}
                {selection === 'commissions' && <Commissions></Commissions>}
            </div>
           
           <div className='right'>
                <img src={CloseIcon} className='close-icon' alt='close' onClick={closeRight}></img>
                {selection === 'recentWorks' && <RecentWorkList></RecentWorkList>}
                {selection === 'comics' && <ComicList></ComicList>}
           </div>

           <footer>
            <p id='footer-p'>copyright @gohjiberry 2023</p>
           </footer>
        </>
    );
}