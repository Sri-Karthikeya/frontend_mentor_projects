function ExtensionCard({ name, logo, description, isActive, onToggle, onRemove }) {
  return (
    <div className="card">
      <div className="card-top">
        <img src={logo} alt={name} className="card-logo" />
        <div className="card-info">
          <h2 className="card-name">{name}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>

      <div className="card-bottom">
        <button className="remove-btn" onClick={onRemove}>
          Remove
        </button>

        <button
          className={`toggle ${isActive ? "toggle-on" : "toggle-off"}`}
          onClick={onToggle}
          aria-label={isActive ? "Deactivate extension" : "Activate extension"}
        >
          <span className="toggle-thumb"></span>
        </button>
      </div>
    </div>
  );
}

export default ExtensionCard;