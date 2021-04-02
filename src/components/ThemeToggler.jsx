import React,  {useContext} from 'react';
import ThemeContext, {changeTheme} from '../ThemeContext';


const ThemeToggler = () => { 

    const {theme, setTheme} = useContext(ThemeContext);

    if (theme == undefined){
        throw new Error('theme undefined, are you using a theme in a component thats a child of the right context provider?')
    }


    return(
        <div id="togglyWoggly" onClick={() => changeTheme({theme, setTheme}) } >
            {theme}
        </div>
    )


}

export default ThemeToggler;