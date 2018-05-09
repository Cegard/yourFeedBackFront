import React, {Component} from 'react'
import HeaderApp from './template/HeaderApp';
import FooterApp from './template/FooterApp';
import { Form  } from 'formsy-semantic-ui-react'
import axios from 'axios';
import { Button,  Grid, Header, Message, Segment } from 'semantic-ui-react'
import {
    Redirect
   } from 'react-router-dom'
import NewUser from './NewUser'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            login: true,
            email:"",
            password:"",
            error: false,
            redirectToReferrer: false
        }
    }

    handleChange = (event, data) => {
        this.setState({ [data.name]: data.value });
    };

    handleSubmit = event =>{
        axios.post(`http://localhost:9090/UserController/login`, { 
            "email": this.state.email ,
            "password": this.state.password,
            
         })
          .then(res => {
               console.log(res.data)
               if(res.data === "login"){
                this.setState({redirectToReferrer: true });
                
               }else{
                this.setState({error: true });
                
               }
            }).catch(error => {
                console.log(error.data)
            
        });
      }

      handleClick = (event, data) => {
        this.setState({ login: !this.state.login });
    };



    render(){
        const errorLabel = <span color="red"/>
        if (this.state.redirectToReferrer) {
            return <Redirect to={"/Template/Profile"} />;
          }
        return(
            <div className='login-form'>
                
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <HeaderApp />
                <Grid
                    textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
                >
                {this.state.login ? (
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2'  textAlign='center'>
                    {' '}Log-in to your account
                    </Header>
                    <Form size='large' onValidSubmit={this.handleSubmit}>
                    {this.state.error &&
                    <Message negative>
                        <Message.Header>Non-existent User or Unconnected Password</Message.Header>
                    </Message>
                }
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        validations="isEmail"
                        label="Email"
                        required
                        validationErrors={{ isEmail: 'Email not valid',isDefaultRequiredValue: 'Email is requiered'  }}
                        errorLabel={ errorLabel }
                        />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                        validationErrors={{isDefaultRequiredValue: 'Password is requiered'  }}
                        errorLabel={ errorLabel }
                        />

                        <Button className="orangeEndava" type = "submit"fluid size='large'>Login</Button>
                    </Segment>
                    </Form>
                    <Message>
                    <Button className="orangeEndava" type = "button"fluid size='large' onClick={this.handleClick}>Sign Up</Button>
                    </Message>
                </Grid.Column>
        ):(
            <NewUser login ={this.handleClick} />
        )}
                </Grid>
                <FooterApp/>
            </div>
        )
    }
}

export default Login