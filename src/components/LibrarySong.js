import React from 'react';

const LibrarySong = ( {currentSong, setCurrentSong, songs, setSongs} ) => {

    //console.log('were in LibrarySong, currentSong:' + currentSong);

    const songSelectHandler = (e) => 
    {
        setCurrentSong(currentSong);

        // Modify list of songs to update the active-property
        const newSongs = songs.map(song => 
        {
            if(song.id == currentSong.id)
            {
                return ( {...song, active: true,} );
            } else {
                return ( {...song, active: false,} );
            }

        })

        setSongs(newSongs);
    }

    return(
        <div className={`library-song ${currentSong.active ? 'selected' : 'unsel'}`} onClick={songSelectHandler} >
            <img src={currentSong.cover} alt={currentSong.name} />

            <div className="song-description">
                <h3> {currentSong.name} </h3>
                <h4> {currentSong.artist} </h4>
            </div>

        </div>

    )
}


export default LibrarySong;