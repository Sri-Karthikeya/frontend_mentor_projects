
function FilterButtons({filter, setFilter}){
    return(
        <div className="filter-row">
            <h1 className="filter-heading">
                Extensions List
            </h1>
            <div className="filter-buttons">
                <button className={`filter-btn ${filter==="all"?"active":""}`} onClick={()=>setFilter("all")}>
                    All
                </button>
                <button className={`filter-btn ${filter === "active" ? "active":""}`} onClick={()=>setFilter("active")}>
                    Active
                </button>
                <button className={`filter-btn ${filter == "inactive" ? "active" : ""}`} onClick={()=>setFilter("inactive")}>
                    Inactive
                </button>
            </div>
        </div>
    );
}

export default FilterButtons;