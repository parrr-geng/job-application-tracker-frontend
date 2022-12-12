function SearchField(props){
    const handleSearch = e => {
        props.setSearch(e.target.value);
    }

    return(
        <div>
            <input type="text" name="search" onChange={handleSearch} />
        </div>
    )
}

export default SearchField;