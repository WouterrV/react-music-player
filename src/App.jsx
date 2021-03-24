import React ,{useState} from 'react';
import './styles/app.scss';
import data from './data';

// Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {

  // State
  const [songs, setSongs] = useState( data() );
  const [currentSong, setCurrentSong] = useState( songs[0] );
  const [isPlaying, setIsPlaying] = useState (false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} `}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

      <Song currentSong={currentSong} />
      
      <Player 
        currentSong={currentSong} setCurrentSong={setCurrentSong}
        isPlaying = {isPlaying} setIsPlaying = {setIsPlaying}
        songs = {songs} setSongs={setSongs}
       />

       <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} 
       libraryStatus={libraryStatus} />

      {/* Load fonts globally    */   }
       <link rel="preconnect" href="https://fonts.gstatic.com"/>
       <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"></link> 


    </div>
  );
}

export default App;
