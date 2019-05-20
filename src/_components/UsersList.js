import React from 'react';
import { authHeader } from '../_helpers/auth-header';
import axios from 'axios';

export class UsersList extends React.Component {
    constructor(){
        super();
        this.state = { users: [], currentUser: ''}
    }

    componentDidMount(){
            const listId = this.props.shoppinglistid;
            const API = "https://hajsownik.herokuapp.com";
            var uzytkownicy = new Request(API+"/shopping/"+listId+"/users");
            const requestOptions = { method: 'GET', headers: authHeader() };
        
            fetch(uzytkownicy, requestOptions)
                .then(response => response.json())
                .then(data => {
                this.setState({ users:data })
            })

            axios.get(API+"/users/current", requestOptions)
                .then(res => {
                    const currentUser = res.data;
                    this.setState({ currentUser });
                });
    }


    deleteUser(userid) {
        const API = "https://hajsownik.herokuapp.com";
        const requestOptions = { method: 'DELETE', mode: "cors", headers: authHeader()};
        console.log("Usunięto usera z listy:"+userid);
        axios.delete(`${API}/shopping/${this.props.shoppinglistid}/user/${userid}`, requestOptions)
           .then(res => {
               console.log(res);
           })
    }

    isOwner(index){
        if(index==0)
            return false;
        else if(this.state.currentUser==this.state.users[0].username)
        {
            return true;
        }
    }

    render() {
        return(
            <div>
            {this.state.users.map((user, index) =>{
                return <div className={index===0 ? "chip red white-text lighten-2" : "chip blue white-text lighten-2"} key={`user-${user.id}`}>{user.username}
                { this.isOwner(index)
                    ? <i onClick={this.deleteUser.bind(this, user.id)} className="close material-icons">close</i>
                    : ""
                }
                </div>
            })}
            </div>
        );
    }
}

export default UsersList;