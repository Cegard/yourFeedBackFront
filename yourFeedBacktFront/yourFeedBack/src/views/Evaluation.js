import React, {Component} from 'react'
import axios from 'axios';
import {  Button, Message , Popup } from 'semantic-ui-react'
import { Form  } from 'formsy-semantic-ui-react'


class Evaluation extends Component{
    constructor(props){
        super(props);
        this.state= {
            evaluatedUser: "",
            event: "",
            questions: "",
            userApp: ""
        };
    }

    getUserEventId() {
        axios.get(`http://localhost:9090/getEvaluatedUserById/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ evaluatedUser :  res.data }); 
            this.setState({ event :  res.data.event }); 
            this.setState({ userApp :  res.data.userApp }); 
            this.getQuestions();
            
        })
    }

    getQuestions() { 
        console.log(this.state.event.id)
        axios.get(`http://localhost:9090/getQuestionbyEvent/${this.state.event.id}`)
          .then(res => {
            this.setState({ questions :  res.data }); 
        })
        
    }

    componentDidMount() {
       this.getUserEventId();
    }
    show = dimmer => () => this.setState({ dimmer, open: true })    
    render(){
        return(
            <div>
                <Popup trigger={<Button onClick={this.show(false)}>Help</Button>}>
                <Popup.Header>Information</Popup.Header>
                <Popup.Content>
                   In this place you can watch and register on the event avalaible for you.
                </Popup.Content>
                </Popup>
                <Form className = "profile-form" onValidSubmit={this.handleSubmit}
                    loading={ this.props.isLoading }
                >
                    {this.state.error &&
                        <Message negative>
                            <Message.Header>You are already registered </Message.Header>
                        </Message>
                    }
                    {this.state.success &&
                        <Message positive>
                            <Message.Header>Success Operation</Message.Header>
                        </Message>
                    }
                    <Form.Field className="center">
                    <h1>{`Event ${this.state.event.name} User ${this.state.userApp.name} ${this.state.userApp.lastName}`}</h1>
                    </Form.Field>
                </Form>

            </div>

        );
    }
}
export default Evaluation;