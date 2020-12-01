import React, {useState, useRef} from "react";
import "./styles/app.scss";
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
import data from "./data";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [shuffleStatus, setShuffleStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = ((roundedCurrent / roundedDuration)*100);
  setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
}

let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
//TODO remove dupe
const activeLibraryHandler = (nextPrev) => {
  const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id) {
          song.active = true;
      } else {
          song.active = false;
      }
      
      return song;
  });
  setSongs(newSongs);
}
const songEndHandler = async () => {
  
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
  }

  //TODO remove dupe
  const shuffleHandler = async () => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    } 
    await setCurrentSong(songs[randomIndex]);
    activeLibraryHandler(songs[randomIndex]);
    audioRef.current.play();
}

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} songs={songs} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongInfo={setSongInfo} songInfo={songInfo} shuffleStatus={shuffleStatus} setShuffleStatus={setShuffleStatus} />
      <Library isPlaying={isPlaying} libraryStatus={libraryStatus} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}  setSongs={setSongs} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={shuffleStatus ? shuffleHandler : songEndHandler}></audio>
    </div>
  );
}

export default App;
