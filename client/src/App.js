import React from 'react';
import ComicList from './ComicList';
import './assets/styles/App.css';
import $ from 'jquery'

function revealLeft() {
    $('#main').animate({marginLeft: '80vw'})
    $('#left').animate({width: '80vw'}, function() {
        $('#left').children().css('display', 'block')
    })
}

function closeLeft() {
    $('#main').animate({marginLeft: '0vw'})
    $('#left').animate({width: '0vw'}, function() {
        $('#center').children().css('display', 'block')
    })
}

export default function Nav() {
    return (
        <>      
            <div id='main'>

                <section id='left'>
                    <div id='leftContent'>
                        <button onClick={closeLeft}>close</button>
                        <br></br>Content listed here...
                        <ComicList></ComicList>
                    </div>
                </section>

                <section id='center'>
                    <div id='centerContent'>
                        <h1>Gohji Berry</h1>
                        <div className='nav'>
                            <button onClick={revealLeft} className='left-btn'>reveal left</button><br></br>
                            <button disabled className='right-btn'>reveal right</button><br></br>
                        </div>
                        <div className='footer'>
                            <h4>all rights reserved</h4>
                        </div>
                    </div>
                </section>

                {/* <section id='right'>
                    <div id='rightContent'>
                        <button onClick={closeRight}>close</button>
                        <br></br>Content listed here...
                    </div>
                </section> */}

            </div>
        </>
    );
}