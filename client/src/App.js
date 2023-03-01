import React from 'react';
import ComicList from './ComicList';
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
    return (
        <>     
            <div className='main'>
                <h1>Main content</h1>
                <div className='main-btns'>
                    <button onClick={openLeft}>open left</button>
                    <button onClick={openRight}> open right</button>
                </div>
            </div>

            <div className='left'>
                <button onClick={closeLeft}>close left</button>
                <ComicList></ComicList>
            </div>
           
           <div className='right'>
                <h4>Right Content</h4>
                <button onClick={closeRight}>close right</button>
                <ComicList></ComicList>
           </div>
        </>
    );
}