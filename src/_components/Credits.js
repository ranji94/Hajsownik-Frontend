import React from 'react';
import axios from 'axios';
import Credit from './Credit';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { authHeader } from '../_helpers/auth-header';

export class Credits extends React.Component {
    constructor(){
        super();
        this.state = { credits: [], sum: 0}
    }

    componentDidMount(){
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'GET', headers: authHeader() };
    
        axios.get(API+"/creditsstack", requestOptions)
            .then(res=> {
                const credits = res.data;
                this.setState({ credits });
            });

        axios.get(API+"/credits/sum", requestOptions)
            .then(res=> {
                const sum = res.data;
                this.setState({ sum });
            });
        document.body.style.backgroundImage = 'url("")';
        document.body.style.backgroundColor = '#FFFBE3';
    }

    Round(n,k){
        var factor = Math.pow(10,k);
        return Math.round(n*factor)/factor;
    }

    render() {
        const backToLists ={
            marginTop:'30px',
            bottom: '20px'
        }

        return(
            <div className="container animated fadeIn">
            <h2 className="center"><Link to="/"><button style={backToLists} className="blue lighten-1 btn-floating waves-effect"><i className="fas fa-arrow-left"></i></button></Link> Uznania</h2>
                <ul className="collection">
                    <li className="collection-item">
                        <div className="row">
                            <div className="col s1 center"></div>
                            <div className="col s6 center"><h4>Kto</h4></div>
                            <div className="col s5 center"><h4>Ile</h4></div>
                        </div>
                    </li>
                    { this.state.credits.map(credit => {
                        return <Credit key={`credit-${credit.id}`} who={credit.name} amount={credit.amount}></Credit>
                    })}
                    <li className="collection-item center"><h4>Suma długów do ściągnięcia: {this.Round(this.state.sum,2)} zł</h4></li>
                </ul>
            </div>
        )
    }
}

export default Credits;