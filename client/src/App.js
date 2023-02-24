import React from 'react';
import ComicList from './ComicList';
import './App.css';
import $ from 'jquery'

function revealLeft() {
    $('#center').children().css('display', 'none')
    $('#left').animate({width: '80vw'}, function() {
        $('#left').children().css('display', 'block')
    })
    $('#center').animate({width: '20vw'})
}

function closeLeft() {
    $('#left').children().css('display', 'none')
    $('#left').animate({width: '0vw'}, function() {
        $('#center').children().css('display', 'block')
    })
    $('#center').animate({width: '100vw'})
}

function revealRight() {
    $('#center').children().css('display', 'none')
    $('#right').animate({width: '80vw'}, function() {
        $('#right').children().css('display', 'block')
    })
    $('#center').animate({width: '20vw'})
}

function closeRight() {
    $('#right').children().css('display', 'none')
    $('#right').animate({width: '0vw'}, function() {
        $('#center').children().css('display', 'block')
    })
    $('#center').animate({width: '100vw'})
}

export default function Nav() {
    return (
        <>      
            <div id='main'>
                <section id='left'>
                    <div id='leftContent'>
                        <button onClick={closeLeft}>close</button>
                        <br></br>Content listed here...
                    </div>
                </section>
                <section id='center'>
                    <div id='centerContent'>
                        <h1>Main</h1>
                        <button onClick={revealLeft}>reveal left</button><br></br>
                        <button onClick={revealRight}>reveal right</button><br></br>
                        <ComicList></ComicList>
                    </div>
                </section>
                <section id='right'>
                    <div id='rightContent'>
                        <button onClick={closeRight}>close</button>
                        <br></br>Content listed here...
                    </div>
                </section>
            </div>
        </>
    );
}