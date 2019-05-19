import React from 'react';
import { UsersList } from '../_components/UsersList';
import { ListEdit } from '../_components/ListEdit';
import axios from 'axios';
import { authHeader } from '../_helpers/auth-header';

export class ShoppingList extends React.Component{
    constructor(){
        super();
        this.state={ users: [], currentUser: '', owner: false } ;
    }

    handleClick(e){
        console.log("Wejście w liste")
    }

    componentDidMount(){
        const API = "http://localhost:8080";
        const requestOptions = { method: 'GET', headers: authHeader() };

        axios.get(API+"/shopping/"+this.props.id+"/isOwner", requestOptions)
            .then(res => {
                const owner = res.data;
                this.setState({ owner });
        });
    }

    render(){
        const infoStyle = {
            paddingTop: '6%'
        };

        function Round(n,k){
            var factor = Math.pow(10,k);
            return Math.round(n*factor)/factor;
        }

        function formatDate(dataDodaniaListy){
            let date = new Date(dataDodaniaListy);
            var miesiac = date.getUTCMonth() +1;
            var dzien = date.getUTCDate();
            var godzina = date.getHours();
            var minuta = date.getUTCMinutes();
            var sekunda = date.getUTCSeconds();

            if(miesiac<10) { miesiac="0"+miesiac; }
            if(dzien<10) { dzien="0"+dzien;}
            if(godzina<10) { godzina="0"+godzina;}
            if(minuta<10) { minuta="0"+minuta;}
            if(sekunda<10) { sekunda="0"+sekunda;}

            let formatted = dzien+"-"+miesiac+"-"+date.getUTCFullYear()+" "+godzina+":"+minuta+":"+sekunda;
            return formatted;
        }

        return(
            <div className="row animated fadeIn">
                <div style={infoStyle} className="col s2 center">
                <ListEdit id={this.props.id} aktualnalista={this.handleClick.bind(this)} createdat={this.props.createdat}></ListEdit>
                </div>
                <div className="col s9">
                <h5><i className="fas fa-shopping-basket"></i> Rozliczenie z dnia: {formatDate(this.props.creationdate)}</h5>
                <UsersList shoppinglistid={this.props.id}></UsersList>
                <p>Suma zakupów: {Round(this.props.total,2)} zł</p>
                </div>
                <div className="col s1">
                    { this.state.owner
                        ? <button onClick={this.props.delEvent} className="btn-floating waves-effect red lighten-1"><i className="far fa-trash-alt"></i></button>
                        : <button className="btn-floating disabled"><i className="far fa-trash-alt"></i></button>
                    }
                </div>
            </div>
        );
    }
}

export default ShoppingList;