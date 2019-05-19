import React from 'react';
import { userService } from '../_services/user.service';
import { authenticationService } from '../_services/authentication.service';
import ShoppingLists from '../_components/ShoppingLists';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
        };
    }

    componentDidMount(){
        userService.getAll().then(users => this.setState({ users }));
        document.body.style.backgroundImage = 'url("")';
        document.body.style.backgroundColor = '#FFFBE3';
    }

    render() {
        //const { currentUser, users } = this.state;
        return (
            <div>
                <h2 className="center animated fadeIn">Twoje listy zakupowe</h2>
                <ShoppingLists></ShoppingLists>
            </div>
        );
    }
}

export default HomePage;