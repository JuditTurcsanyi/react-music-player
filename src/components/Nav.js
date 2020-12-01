import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
// import { library } from '@fortawesome/fontawesome-svg-core';

const Nav = ({libraryStatus, setLibraryStatus, darkMode, setDarkMode}) => {
    const addDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add("dark-mode");
            document.getElementById('library-section').classList.add("dark-mode");
            Array.from(document.getElementsByClassName('active-library')).forEach(lib => lib.classList.add("dark-mode"));
  
        } else {
            document.body.classList.remove("dark-mode");
            document.getElementById('library-section').classList.remove("dark-mode");
            Array.from(document.getElementsByClassName('active-library')).forEach(lib => lib.classList.remove("dark-mode"));
        }
    }
    return(
        <nav>
            <h1>Waves</h1>
            <div className="buttons">
                <button onClick={() => setLibraryStatus(!libraryStatus)} >
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
                <button onClick={() => addDarkMode()}>
                    <FontAwesomeIcon  icon={darkMode ? faMoon : faSun} />
                </button>
            </div>
        </nav>
    )
}

export default Nav;