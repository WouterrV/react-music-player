import React, {useContext} from 'react';
import LibrarySong from './LibrarySong';
import '../styles/_library.scss';
import ThemeContext, {changeTheme} from '../ThemeContext';


const Library = ( {songs, setCurrentSong, setSongs, libraryStatus, setLibraryStatus} ) => {

    //console.log('were in library, here are songs:', songs);

    const {theme, setTheme} = useContext(ThemeContext);

    // todo: refactor this to be in ThemeContext, so we can DRY up our code
    if (theme == undefined){
        throw new Error('theme undefined, are you consuming a context in a component thats a child of the right context provider?')
    }

    let libraryToggleHandler = () => {
        setLibraryStatus(!libraryStatus);
    }


    let songComponents = songs.map(
         (song) => { 
             //console.log(song);
            return (< LibrarySong currentSong={ song } key={song.name + song.artist }
                 setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} />  );
            }
          );


    return(
        

        <div className={`library ${libraryStatus? "active-library": ""}  ${theme}`}>
            
            <h2 onClick={libraryToggleHandler} >Library</h2>
            
            <div className="library-songs">
                {songComponents}
            </div>
        </div>
    )

}

export default Library;