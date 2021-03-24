import React from 'react';
import LibrarySong from './LibrarySong';
import '../styles/_library.scss';

const Library = ( {songs, setCurrentSong, setSongs, libraryStatus} ) => {

    //console.log('were in library, here are songs:', songs);

    let songComponents = songs.map(
         (song) => { 
             //console.log(song);
            return (< LibrarySong currentSong={ song } key={song.name + song.artist }
                 setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} />  );
            }
          );


    return(
        

        <div className={`library ${libraryStatus? "active-library": ""}  `}>
            
            <h2>Library</h2>
            
            <div className="library-songs">
                {songComponents}
            </div>
        </div>
    )

}

export default Library;