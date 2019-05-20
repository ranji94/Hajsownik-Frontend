import React from 'react';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';
import { Item } from '../_components/Item';
import { AddItemForm } from '../_components/AddItemForm';
import { AddUserForm } from '../_components/AddUserForm';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import UsersList from './UsersList';

export class ListItems extends React.Component{
    constructor(props){
        super(props);
        this.state = { items: [], owner: false }
    }

    componentDidMount(){
    const API = "https://hajsownik.herokuapp.com";
    const requestOptions = { method: 'GET', headers: authHeader() };

    axios.get(API+"/shopping/"+this.props.match.params.id, requestOptions)
        .then(res=> {
            const items = res.data;
            this.setState({ items });
        });

    axios.get(API+"/shopping/"+this.props.match.params.id+"/isOwner", requestOptions)
        .then(res => {
            const owner = res.data;
            this.setState({ owner });
        });
    document.body.style.backgroundImage = 'url("")';
    document.body.style.backgroundColor = '#FFFBE3';
    }

    deleteItem = (index, e, listid) => {
        e.preventDefault();
        const items = Object.assign([], this.state.items);
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'DELETE', mode: "cors", headers: authHeader()};
        console.log("Usunięto listę z serwera:"+items[index].id);
        axios.delete(`${API}/shopping/${this.props.match.params.id}/item/${items[index].id}`, requestOptions)
           .then(res => {
               console.log(res);
           })
        
        items.splice(index, 1);
        this.setState({items:items});
    }

    render() {
        const backToLists ={
            "position": '-webkit-sticky',
            marginTop:'30px',
            bottom: '20px'
        }

        return(
            <div className="center row">
            <div className={ this.state.owner ? "col s7" : "col s12"}>
            <h2 className="center"><Link to="/"><button style={backToLists} className="blue lighten-1 btn-floating waves-effect"><i className="fas fa-arrow-left"></i></button></Link> Szczegóły listy</h2>
            {   this.state.owner===true
                ? <AddItemForm shoppinglistid={this.props.match.params.id}></AddItemForm>
                : 
                <UsersList shoppinglistid={this.props.match.params.id}></UsersList>
            }
            <table className="table striped">
            <thead>
                <tr><th>Nazwa</th>
                    <th>Sklep</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Suma</th>
                    { this.state.owner
                        ? <th>Usuń</th>
                        : null
                    }
                </tr>
                </thead>
                <tbody>
                {this.state.items.map((item, index)=> {
                    return <Item owner={this.state.owner} key={`item-${item.id}`} delEvent={this.deleteItem.bind(this, index)} name={item.name} shop={item.shop} price={item.price} list={this.props.match.params.id} identifier={item.id}></Item>
                })}
            </tbody>
            </table>
            </div>
            {   this.state.owner
                ? <div className="col s5">
                <AddUserForm shoppinglistid={this.props.match.params.id}></AddUserForm>
                </div>
                : ""
            }
            </div>
            
        );
    }
}

export default ListItems;