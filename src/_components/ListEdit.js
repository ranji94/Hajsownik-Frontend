import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class ListEdit extends React.Component{
    constructor(){
        super();
        this.state = { items: [] }
    }

    handleClick(e){
        e.preventDefault();
        console.log(this.props.id);
        
    }

    render() {
        return(
            <Link to={`/list/${this.props.id}`}><button className="btn-large btn-floating waves-effect orange lighten-2"><i className="fas fa-list"></i>
            </button></Link>
        );
    }
}

export default ListEdit;