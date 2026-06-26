


function Navbar({theme, toggleTheme}){
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/images/logo.svg" alt="Extensions logo" className="navbar-logo"/>
            </div>
            <button className="theme-btn" onClick={toggleTheme}>
                <img src={theme === "dark" ? "/images/icon-sun.svg": "/images/icon-moon.svg"} alt="toogle theme"/>

            </button>
        </nav>
    )

}
export default Navbar;