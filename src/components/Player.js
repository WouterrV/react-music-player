import React, {useRef, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";


const Player = ( {
        currentSong, setCurrentSong,
        isPlaying, setIsPlaying,
        songs, setSongs
    } ) => {

        // Ref
    const audioRef = useRef(null);

    // Event Handlers
    useEffect( () => { 

        let newSongs = songs.map
        (
            (song) => 
            { 
                //console.log(song);

                if(song.id == currentSong.id){
                    return {...song, active: true}
                }

                else {
                    return {...song, active: false}
                }

            }
        );

        setSongs( newSongs);
        
    }, [currentSong])

    const playSongHandler = () => {

        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }

        console.log(audioRef.current);
    }

    const timeUpdateHandler = (e) => {
        // update songInfo state here
        const current = e.target.currentTime;
        const duration = e.target.duration;
        
        // Calculate percentage
        const  roundedAnimationPercent = Math.round(current/duration*100);

        setSongInfo({
            ...songInfo, currentTime: current, duration, animationPercentage: roundedAnimationPercent
        })
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = ("0" + Math.floor(time % 60)).slice(-2);
        let niceTime = minutes + ":" + seconds;
        return niceTime;
    }

    const dragHandler = (e) => {
        let newTime = e.target.value;
        setSongInfo({...songInfo, currentTime: newTime});
        audioRef.current.currentTime = newTime;
    }

    const skipHandler = (direction) => {
        
        // Find out: is song playing? Then back == return to 0th second
        if (isPlaying && direction == 'back'){
            audioRef.current.currentTime = 0;
            return;
        }

        let currentIndex = songs.findIndex
        ( 
            (s)=>
            {return s.id == currentSong.id} 
        );


        let newIndex = -1; // default value
        let maxIndex = songs.length-1; // 3 songs, index = 0,1,2 so we need -1 here

        if (direction == "forward"){ 
            newIndex = currentIndex + 1
            if (newIndex > maxIndex) {newIndex = 0;}
          }

        if (direction == "back"){ 
            newIndex = currentIndex - 1  
            if (newIndex < 0) { newIndex = maxIndex;}
        }

        //console.log("Current, new index is: " + currentIndex + "," + newIndex);
        setCurrentSong( songs[newIndex] );

    }

    const endedHandler = () => {
        // if playing, then go to next song
        if (isPlaying){
            skipHandler('forward');
        }
    }

    // State
    const [songInfo, setSongInfo] = useState(
        {
            currentTime: 0,
            duration: 0,
            animationPercentage: 0,
        }
    )

    const onLoadedHandler = (e) => {
        if (isPlaying){
            e.target.play();
        }
    }


    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    const myGradient = `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1] } )`

    return(
        <div className="player">
            <div className="time-control">
                <p>{ formatTime(songInfo.currentTime) }</p>

                <div className="track" 
                    style=
                    { 
                        {
                            background: myGradient
                        } 
                    }
                    >
                    <input 
                        type="range"
                        min={0}
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                
                <p>{songInfo.duration? formatTime(songInfo.duration) : "0:00" }</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}
                onClick={ ()=> skipHandler("back") } />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" 
                icon={isPlaying? faPause : faPlay }
                 />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}
                onClick={ ()=> skipHandler("forward") } />
                
            </div>

            <audio
                ref={audioRef} 
                src={currentSong.audio} 
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler}
                onLoadedData={onLoadedHandler}
                onEnded = { endedHandler }
             ></audio>

        </div>

    )
}


export default Player;