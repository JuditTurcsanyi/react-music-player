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
const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = ((roundedCurrent / roundedDuration)*100);
  setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
}
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
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} songs={songs} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongInfo={setSongInfo} songInfo={songInfo} />
      <Library isPlaying={isPlaying} libraryStatus={libraryStatus} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}  setSongs={setSongs} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>
  );
}

export default App;
