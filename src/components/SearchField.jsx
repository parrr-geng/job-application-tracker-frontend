import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function SearchField(props){
    const handleSearch = e => {
        props.setSearch(e.target.value);
    }

    return(
        <div>        
            <Form.Group className="d-flex flex-row align-items-center">
                <Form.Control type="search" className="form-control rounded" onChange={handleSearch} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                {/* <Icon.Search className="ms-3" style={{height: 20, width: 20}}/> */} 
            </Form.Group>
        </div>
    )
}

export default SearchField;