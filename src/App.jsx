import React ,{useState} from 'react';
import './styles/app.scss';
import data from './data';

// Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// Context
import ThemeContext from './ThemeContext';

function App() {

  // State
  const [songs, setSongs] = useState( data() );
  const [currentSong, setCurrentSong] = useState( songs[0] );
  const [isPlaying, setIsPlaying] = useState (false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Let's try a theme-component using context
  const [theme, setTheme] = useState("dark");


  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`App ${libraryStatus ? "library-active" : ""} ${theme}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

        <Song currentSong={currentSong} isPlaying={isPlaying} />
        
        <Player 
          currentSong={currentSong} setCurrentSong={setCurrentSong}
          isPlaying = {isPlaying} setIsPlaying = {setIsPlaying}
          songs = {songs} setSongs={setSongs}
        />

        <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} 
        libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

        {/* Load fonts globally    */   }
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"></link> 


      </div>
    </ThemeContext.Provider>
  );
}

export default App;
