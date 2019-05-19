import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Router, Route, Link, Switch } from 'react-router-dom';
import './style.css';

import { authenticationService } from '../_services/authentication.service';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        if(authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        const formStyle = {
            padding: '80px 80px 40px 40px',
            "margin-top":'30px',
            "border-radius":'6px'
        };
        const errorStyle = {
            padding: '10px 10px 10px 10px',
            "border-radius": '6px'
        }
        return (
            <div className="container lime lighten-5 z-depth-4 animated zoomIn" style={formStyle}>
            <h2 className="center"><i class="fas fa-money-bill-wave green-text text-lighten-2"></i> Hajsownik <i class="deep-orange-text text-lighten-1 fas fa-shopping-basket"></i></h2>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Nazwa użytkownika jest wymagana!'),
                    password: Yup.string().required('Hasło jest wymagane')
                })}
                onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                    setStatus();
                    authenticationService.login(username, password)
                        .then(
                            user => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                this.props.history.push(from);
                            },
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                    <Form>
                        <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="username">Nazwa użytkownika</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" style={errorStyle} className="red lighten-4 grey-text text-darken-3" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="password">Hasło</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" style={errorStyle} className="red lighten-4 grey-text text-darken-3" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col s12">
                            <button type="submit" className="btn waves-effect waves-light orange lighten-2 center" disabled={isSubmitting}>Zaloguj</button>
                            {isSubmitting &&
                                <img alt="dolina" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        </div>
                        <p>Nie posiadasz jeszcze konta? Załóż je <Link to="/signup">tutaj</Link>.</p>
                        {status &&
                            <div style={errorStyle} className="red lighten-4 grey-text text-darken-3">{status==="Bad credentials" ? "Niepoprawne dane logowania":"Wystąpił błąd"}</div>
                        }
                    </Form>
                )}
            />
        </div>
        )
    }
}

export default LoginPage;