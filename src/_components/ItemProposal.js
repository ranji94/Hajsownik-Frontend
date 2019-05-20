import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';
import { tsMethodSignature } from '@babel/types';
import M from "materialize-css";


export class ItemProposal extends React.Component{
    constructor(){
        super();
        this.state = { name: 'Banany', price: '1.19', shop: 'Carrefour', data:{} }
    }

    componentDidMount(){
        document.body.style.backgroundImage = 'url("")';
        document.body.style.backgroundColor = '#FFFBE3';
        M.AutoInit();
    }

    handleNameChange(event){
        this.setState({name: event.target.value});
    }
    handlePriceChange(event){
        this.setState({price: event.target.value});
    }
    handleShopChange(event){
        this.setState({shop: event.target.value});
    }

    itemProposal(e){
        var resultElement = document.getElementById('postResult');

        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'POST', mode: "cors", headers: authHeader()};
        resultElement.style = 'text-align: left; margin-top: 20px; padding: 20px 20px 20px 20px; border-radius: 8px; font-size: 16px'


        this.state.click = true;
        axios.post(API+"/items/add", {
            "name": this.state.name,
            "price": this.state.price,
            "shop": this.state.shop
        }, requestOptions)
        .then(function (response) {
            resultElement.innerHTML = 'Pomyślnie zaproponowano produkt';
            resultElement.className = "green lighten-3";
        })
        .catch(function (error) {
            resultElement.innerHTML = 'Niepoprawne dane lub produkt już istnieje';
            resultElement.className = "red lighten-3"
        });
        e.preventDefault();
    }

    render(){
        const backToLists ={
            "position": '-webkit-sticky',
            marginTop:'30px',
            bottom: '20px'
        }

        const errorStyle = {
            padding: '10px 10px 10px 10px',
            "border-radius": '6px'
        }

        return(
            <div className="container center">
                <h2><Link to={`/list/${this.props.match.params.id}`}><button style={backToLists} className="blue lighten-1 btn-floating waves-effect"><i className="fas fa-arrow-left"></i></button></Link> Zaproponuj produkt: </h2>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix red-text text-lighten-1">fastfood</i>
                        <input value={this.state.name} onChange={this.handleNameChange.bind(this)} placeholder="Banany" id="nazwa_produktu" type="text" className="validate"></input>
                        <label className="active" htmlFor="nazwa_produktu">Nazwa produktu</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix blue-text text-lighten-1">shopping_basket</i>
                        <input value={this.state.shop} onChange={this.handleShopChange.bind(this)} placeholder="Carrefour" id="nazwa_sklepu" type="text" className="validate"></input>
                        <label className="active" htmlFor="nazwa_sklepu">Nazwa sklepu</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix green-text text-lighten-1">attach_money</i>
                        <input value={this.state.price} onChange={this.handlePriceChange.bind(this)} placeholder="1.20" id="cena" type="text" className="validate"></input> 
                        <label className="active" htmlFor="cena">Cena [zł]</label>
                    </div>
                    <div className="col s12">
                    <button onClick={(e) => {this.itemProposal(e); }} className="deep-orange lighten-1 btn waves-effect waves-light" type="submit" name="action">Wyślij
                    <i className="material-icons right">send</i>
                    </button>
                    <div id="postResult"></div>
                    </div>
            </div>
            </div>
        )
    }
}

export default ItemProposal;