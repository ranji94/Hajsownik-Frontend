import React from 'react';
import UsersList from './UsersList';
import axios from 'axios';
import { authHeader } from '../_helpers/auth-header';
import Select from 'react-select';

export class AddUserForm extends React.Component{
    constructor(){
        super();
        this.state = { users:[] };
    }
    
    state = {
        selectedOption: null,
    }

handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
}

componentDidMount(){
    const API = "https://hajsownik.herokuapp.com";
    const requestOptions = { method: 'GET', headers: authHeader() };

    axios.get(API+"/users/getall", requestOptions)
        .then(res=> {
            const users = res.data;
            this.setState({ users });
        });
}

addUserToList(e){
    e.preventDefault();
    const API = "https://hajsownik.herokuapp.com";
    const requestOptions = { method: 'PUT', mode: "cors", headers: authHeader() };
    console.log("Powiązano obiekt z listą")
  
    fetch(API+"/shopping/"+this.props.shoppinglistid+"/user/"+this.state.selectedOption.value, requestOptions)
        .then(res =>{
            window.location.reload();
        });
    
  }

    render(){
        const { selectedOption } = this.state;
        let options = this.state.users.map(function (user) {
            return { value: user.id, label: user.username };
          })

        const buttonStyle ={
            marginTop: '30px'
        }

        return(
            <div className="center container">
            <h2>Współdzielący</h2>
                <div className="row">
                    <div className="col s10">
                        Dodaj do rozliczeń
                        <Select value={selectedOption} onChange={this.handleChange} options={options}/>
                    </div>
                    <div style={buttonStyle} className="col s2 right">
                    <button onClick={ (e) => {this.addUserToList(e); }} className="btn-floating waves-effect purple lighten-1"><i className="fas fa-user-plus"></i></button>
                    </div>
                </div>
            <div><UsersList shoppinglistid={this.props.shoppinglistid}></UsersList></div>
            </div>
        );
    }
}

export default AddUserForm;