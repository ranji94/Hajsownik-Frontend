import React from 'react';

export class Liability extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    Round(n,k){
        var factor = Math.pow(10,k);
        return Math.round(n*factor)/factor;
    }

    render() {
        const icon ={
            fontSize: '30px',
            paddingTop: '50%'
        }

        const field = {
            paddingTop: '3%'
        }
        
        return(
            <li className="collection-item center">
                <div className="row">
                    <div className="col s1 center"><i style={icon} className="red-text text-lighten-2 fas fa-times-circle"></i></div>
                    <div className="col s6 center" style={field}>{this.props.whom}</div>
                    <div className="col s5 center" style={field}>{this.Round(this.props.amount,2)} zł</div>
                </div>
            </li>
        )
    }
}

export default Liability;