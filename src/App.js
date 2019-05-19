import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

import { history } from './_helpers/history';
import { authenticationService } from './_services/authentication.service';
import { PrivateRoute } from './_components/PrivateRoute';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import ListItems from './_components/ListItems';
import Liabilities from './_components/Liabilities';
import Credits from './_components/Credits';
import SignUp from './SignUp/SignUp';
import ItemProposal from './_components/ItemProposal'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        let hrefLink = '#';
        return (
            <Router history={history}>
                <div>
                    {currentUser && <nav>
                        <div className="nav-wrapper deep-orange lighten-1">
                            <Link to="/" className="brand-logo"><i className="fas fa-money-bill-wave green-text"></i>Hajsownik</Link>
                            <ul className="right">
                            <li><Link to="/credits" className="nav-item nav-link">Uznania</Link></li>
                            <li><Link to="/liabilities" className="nav-item nav-link">Zadłużenia</Link></li>
                            <li><a href={hrefLink} onClick={this.logout} className="nav-item nav-link">Wyloguj</a></li>
                            </ul>
                        </div>
                    </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                <Switch>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/list/:id" component={ListItems} />
                                    <PrivateRoute path="/proposal/:id" component={ItemProposal}/>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/signup" component={SignUp} />
                                    <PrivateRoute path="/liabilities" component={Liabilities} />
                                    <PrivateRoute path="/credits" component={Credits} /> 
                                </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;