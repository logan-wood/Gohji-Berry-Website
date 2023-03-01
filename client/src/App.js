import React from 'react';
import ComicList from './ComicList';
import './assets/styles/App.css';

function openLeft() {
    document.querySelector('.main').classList.add('left-opened')
    setTimeout(() => { document.querySelector('.left').classList.add('opened'); }, 300)
}
function closeLeft() {
    document.querySelector('.main').classList.remove('left-opened')
    document.querySelector('.left').classList.remove('opened');
}

function openRight() {
    document.querySelector('.main').classList.add('right-opened')
    setTimeout(() => { document.querySelector('.right').classList.add('opened'); }, 300)
}
function closeRight() {
    document.querySelector('.main').classList.remove('right-opened')
    document.querySelector('.right').classList.remove('opened');
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
                <ComicList></ComicList>
            </div>
           
           <div className='right'>
                <h4>Right Content</h4>
                <button onClick={closeRight}>close right</button>
           </div>
        </>
    );
}