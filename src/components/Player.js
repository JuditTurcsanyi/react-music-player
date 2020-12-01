import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause, faRandom, faRedo} from "@fortawesome/free-solid-svg-icons";


const Player = ({ activeLibraryHandler, shuffleHandler, shuffleStatus, setShuffleStatus, setSongs, audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs }) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const skipTrackHandler = async (direction) => {
        
        if(direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
            } else {
            await setCurrentSong(songs[(currentIndex - 1)]);
            activeLibraryHandler(songs[(currentIndex - 1)]);
            }
        }
        
        if (isPlaying) audioRef.current.play();
    };

    const replay = () => {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
    }

    const shuffle = () => {
        setShuffleStatus(!shuffleStatus);
    }


    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input min={0} max={songInfo ? songInfo.duration : "0:00"} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={shuffleStatus ? shuffleHandler : () => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <div className="new-play-control">
                <FontAwesomeIcon onClick={() => shuffle()} icon={faRandom} size="2x" color={shuffleStatus ? "rgb(236, 0, 110)" : ""} />
                <FontAwesomeIcon onClick={() => replay()} icon={faRedo} size="2x" />
            </div>
            {/* Lifted up */}
            {/* <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio> */}
        </div>
    )
}

export default Player;