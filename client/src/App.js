import React from 'react';
import ComicList from './ComicList';
import './assets/styles/App.css';
import $ from 'jquery'

function openLeft() {
    document.querySelector('.main').classList.add('left-opened')
    setTimeout(() => { document.querySelector('.left').classList.add('opened'); }, 300)
}

function closeLeft() {
    document.querySelector('.main').classList.remove('left-opened')
    setTimeout(() => { document.querySelector('.left').classList.remove('opened'); }, 300)
}

function openRight() {
    document.querySelector('.main').classList.add('right-opened')
    document.querySelector('.right').classList.add('opened')
}

function closeRight() {
    document.querySelector('.main').classList.remove('right-opened')
    setTimeout(() => { document.querySelector('.right').classList.remove('opened'); }, 300)
}

export default function App() {
    return (
        <>      
            <div className='main'>
                <h1>Main content</h1>
                <button onClick={openLeft}>open left</button>
                <button onClick={openRight}> open right</button>
            </div>

            <div className='left'>
                <h4>Left Content</h4>
                <button onClick={closeLeft}>close left</button>
            </div>
           
           <div className='right'>
                <h4>Right Content</h4>
                <button onClick={closeRight}>close right</button>
           </div>
        </>
    );
}