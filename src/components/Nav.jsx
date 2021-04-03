import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import ThemeToggler from './ThemeToggler';


let libraryToggleHandler = (libraryStatus, setLibraryStatus) => {
    setLibraryStatus(!libraryStatus);
}

let Nav = ( {libraryStatus, setLibraryStatus}  ) => {


    return(
        <nav>
            <h1>Waves</h1>
            <ThemeToggler></ThemeToggler>
            <button onClick={() => { libraryToggleHandler(libraryStatus, setLibraryStatus) }}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav;
