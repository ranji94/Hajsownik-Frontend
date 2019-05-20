import React from 'react';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';

export class Item extends React.Component{
    constructor(){
        super();
        this.state = { itemQuantity: [] }
    }

    componentDidMount(){
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'GET', headers: authHeader() };
        
        axios.get(API+"/shopping/"+this.props.list+"/item/"+this.props.identifier+"/quantity", requestOptions)
                .then(res=> {
                    const itemQuantity = res.data;
                    this.setState({ itemQuantity });
        });
    }

    render(){
        return(<tr>
        <td>{this.props.name}</td>
        <td>{this.props.shop}</td>
        <td>{this.props.price} zł</td>
        <td>{this.state.itemQuantity.quantity}</td>
        <td>{this.state.itemQuantity.total} zł</td>
        {   this.props.owner
            ? <td><button onClick={this.props.delEvent} className="btn-floating waves-effect red lighten-1"><i className="far fa-trash-alt"></i></button></td>
            : null
        }
        </tr>
        );
    }
}