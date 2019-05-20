import React from 'react';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';
import Select from 'react-select';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import '../css/additem.css';

export class AddItemForm extends React.Component {
    constructor(){
        super();
        this.state = { items:[], quantity: '1' };
    }
    
    state = {
        selectedOption: null,
    }

handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
}
    
handleValueChange(event){
  this.setState({quantity: event.target.value});
}

componentDidMount(){
    const API = "https://hajsownik.herokuapp.com";
    const requestOptions = { method: 'GET', headers: authHeader() };

    axios.get(API+"/items/getall", requestOptions)
        .then(res=> {
            const items = res.data;
            this.setState({ items });
        });
}

addItemToList(e){
  if(this.state.selectedOption != null){
  e.preventDefault();
  const API = "https://hajsownik.herokuapp.com";
  const requestOptions = { method: 'PUT', mode: "cors", headers: authHeader() };
  console.log("Powiązano obiekt z listą")

  fetch(API+"/shopping/"+this.props.shoppinglistid+"/item/"+this.state.selectedOption.value+"/quantity/"+this.state.quantity, requestOptions)
    .then(res =>{
      window.location.reload();
    })
  }
}

render() {
  const buttonStyle ={
    marginTop: '0px'
  }

  const quantityStyle ={
    height: '70px'
  }

    const { selectedOption } = this.state;
    let options = this.state.items.map(function (item) {
        return { value: item.id, label: item.name+", " +item.shop };
      })

    return (
    <div>
    <div className="row">
    <div className="col s6">Wybierz produkt: <Select value={selectedOption} onChange={this.handleChange} options={options}/></div>
    <div className="col s1">
          Ilość:
          <input placeholder="1" id="quant" type="text" style={quantityStyle} value={this.state.quantity} onChange={this.handleValueChange.bind(this)} />
        </div>
      <div style={buttonStyle} className="col s5 center">
        Dodaj:
        <p><button onClick={ (e) => {this.addItemToList(e); }} className="btn-floating waves-effect deep-orange lighten-2"><i className="fas fa-plus"></i></button></p>
      </div>
      </div>
      <p>Nie widzisz swojego produktu na liście? Zaproponuj <Link to={`/proposal/${this.props.shoppinglistid}`}>dodanie go do bazy</Link>!</p>
      </div>
    );
  }
}

export default AddItemForm;