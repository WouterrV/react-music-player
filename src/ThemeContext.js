import {createContext} from 'react';

const ThemeContext = createContext();

let changeTheme = ( {theme, setTheme} ) => {
    if (theme == "light") {
        setTheme("dark")
    } else if (theme == "dark"){
        setTheme("light");
    } else {
        throw new Error('Theme is in invalid state');
    }
}

export {changeTheme};

export default ThemeContext;
