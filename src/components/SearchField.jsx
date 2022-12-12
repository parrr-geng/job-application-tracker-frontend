function SearchField(props){
    const handleSearch = e => {
        props.setSearch(e.target.value);
    }

    return(
        <div class="input-group rounded">
            <input type="search" class="form-control rounded" onChange={handleSearch} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
            </span>
        </div>
    )
}

export default SearchField;