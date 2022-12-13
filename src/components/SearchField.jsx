function SearchField(props){
    const handleSearch = e => {
        props.setSearch(e.target.value);
    }

    return(
        <div className="input-group rounded">
            <input type="search" className="form-control rounded" onChange={handleSearch} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />

        </div>
    )
}

export default SearchField;