import React from 'react';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';
import { ShoppingList } from '../_components/ShoppingList';

export class ShoppingLists extends React.Component {
constructor(){
    super();
    this.state = { shoppingLists: [] }
    this.createList = this.createList.bind(this);
    }

    componentDidMount() {
    const API = "https://hajsownik.herokuapp.com";
    const requestOptions = { method: 'GET', headers: authHeader() };

    axios.get(API+"/shopping", requestOptions)
        .then(res=> {
            const shoppingLists = res.data;
            this.setState({ shoppingLists });
        });
    }

    deleteList = (index, e, listid) => {
        e.preventDefault();
        const shoppingLists = Object.assign([], this.state.shoppingLists);
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'DELETE', mode: "cors", headers: authHeader()};
        console.log("Usunięto listę z serwera:"+shoppingLists[index].id);
        axios.delete(`${API}/shopping/${shoppingLists[index].id}`, requestOptions)
           .then(res => {
               console.log(res);
           })
        
        shoppingLists.splice(index, 1);
        this.setState({shoppingLists:shoppingLists});
    }

    createList(e){
        e.preventDefault();
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'POST', headers: authHeader() };
        console.log("Utworzono nową listę na serwerze")
        axios.post(API+"/shopping", {}, requestOptions)
            .then(res => {
                window.location.reload();
            });
    }

    render() {
        const dodajListeStyle ={
            position: 'sticky',
            bottom: '20px',
            zIndex: '7'
        }

        return (
        <div className="container">
            <ul className="collection">
                {this.state.shoppingLists.map((list, index) => {
                    return <li className="collection-item center" key={`list-${list.createdAt}`}>
                    <ShoppingList id={list.id} creationdate={list.createdAt} total={list.listtotal} delEvent={this.deleteList.bind(this, index)}></ShoppingList>
                    </li>
                })}
            </ul>
            <span className="right" style={dodajListeStyle}><button onClick={ (e) => {this.createList(e); }} className="deep-orange lighten-1 btn-floating waves-effect btn-large"><i className="fas fa-plus"></i></button></span>
        </div>
        
        );
    }
}

export default ShoppingLists;