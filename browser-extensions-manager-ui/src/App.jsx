import { useState } from 'react'
import './styles/global.css'
import Navbar from './components/Navbar'
import FilterButtons from './components/FilterButtons';
import ExtensionCard from './components/ExtensionCard';
import extensionData from './data/data.json';

function App() {
  const [theme, settheme] = useState("light");
  const [filter, setFilter] = useState("all");
  const [extensions, setExtensions] = useState(extensionData);

  function toggleTheme() {
    settheme(theme === "light" ? "dark" : "light");
  }

  function handleToggle(index) {
    const updated = extensions.map((ext, i) =>
      i === index ? { ...ext, isActive: !ext.isActive } : ext
    );
    setExtensions(updated)
  }

  function handleRemove(index) {
    const updated = extensions.filter((_, i) => i != index);
    setExtensions(updated)
  }

  const visibleExtensions = extensions.filter((ext) => {
    if (filter === "all") return true;
    if (filter === "active") return ext.isActive === true;
    if (filter === "inactive") return ext.isActive === false;
  });
  return (
    <>
      <div className={`app ${theme}`}>
        <div className="container">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <FilterButtons filter={filter} setFilter={setFilter} />
          <div className="cards-grid">
            {visibleExtensions.length === 0 && (
              <p className="empty-message">No extensions found.</p>
            )}
            {
              visibleExtensions.map((ext) => (
                <ExtensionCard
                  key={ext.name}
                  name={ext.name}
                  logo={ext.logo}
                  description={ext.description}
                  isActive={ext.isActive}
                  onToggle={() => handleToggle(extensions.indexOf(ext))}
                  onRemove={() => handleRemove(extensions.indexOf(ext))} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
