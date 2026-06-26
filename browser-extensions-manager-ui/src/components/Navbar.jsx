


function Navbar({theme, toggleTheme}){
    const base = import.meta.env.BASE_URL;

    return(
        <nav className="navbar">
            <div className="navbar-left">
                <img src={`${base}images/logo.svg`} alt="Extensions logo" className="navbar-logo"/>
            </div>
            <button className="theme-btn" onClick={toggleTheme}>
                <img src={theme === "dark" ? `${base}images/icon-sun.svg` : `${base}images/icon-moon.svg`} alt="toogle theme"/>

            </button>
        </nav>
    )

}
export default Navbar;