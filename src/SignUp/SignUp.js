import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleSignupResponse } from '../_helpers/handle-signup-response';
import { Router, Route, Link, Switch } from 'react-router-dom';

export class SignUp extends React.Component{
    constructor(){
        super();
        this.state = { created: false };
    }

    signUp(username, password){
        const API = "http://localhost:8080";
        const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) };

        console.log("Utworzono nowego użytkownika")
        return fetch(API+"/signup", requestOptions)
            .then(handleSignupResponse)
            .then(user => {
                return user;
            });
    }

    render(){
        const formStyle = {
            padding: '60px 60px 40px 40px',
            "margin-top":'30px',
            "border-radius":'6px'
        };
        const errorStyle = {
            padding: '10px 10px 10px 10px',
            "border-radius": '6px'
        }

        return(
            <div className="container lime lighten-5 z-depth-4 animated zoomIn" style={formStyle}>
            <h2 className="center"><i className="blue-text text-lighten-2 fas fa-user-plus"></i> Hajsownik <i class="deep-orange-text text-lighten-1 fas fa-shopping-basket"></i></h2>
            <h5 className="center">Załóż użytkownika</h5>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmpassword: ''
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Nazwa użytkownika jest wymagana!').min(5, 'Nazwa użytkownika musi zawierać minimum 5 znaków'),
                    password: Yup.string().required('Hasło jest wymagane').min(8, 'Hasło musi zawierać minimum 8 znaków').matches(/[a-zA-Z]/, 'Hasło może zawierać tylko znaki łacińskie'),
                    confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Podane hasła różnią się').required('Potwierdź hasło')
                })}
                onSubmit={({ username, password, confirmpassword }, { setStatus, setSubmitting }) => {
                    setStatus();
                    this.signUp(username, password)
                        .then(
                            user => {
                                const { from } = this.props.location.state || { from: { pathname: "/login" } };
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
                        <div className="input-field col s12">
                            <label htmlFor="confirmpassword">Potwierdź hasło</label>
                            <Field name="confirmpassword" type="password" className={'form-control' + (errors.confirmpassword && touched.confirmpassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmpassword" component="div" style={errorStyle} className="red lighten-4 grey-text text-darken-3" />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col s12">
                            <button type="submit" className="btn waves-effect waves-light orange lighten-2 center" disabled={isSubmitting}>Załóż użytkownika</button>
                            {isSubmitting &&
                                <img alt="dolina" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        </div>
                        <p>Powrót do <Link to="/login">logowania</Link>.</p>
                        {status &&
                            <div style={errorStyle} className="red lighten-4 grey-text text-darken-3">{status==="Bad credentials" ? "Niepoprawne dane logowania":"Nazwa użytkownika jest już zajęta"}</div>
                        }
                    </Form>
                )}
            />
        </div>
        )
    }
}

export default SignUp;