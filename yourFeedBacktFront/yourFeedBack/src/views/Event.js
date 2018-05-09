import React,{ Component } from 'react';
import {  Button, Message , Popup } from 'semantic-ui-react'
import { Form  } from 'formsy-semantic-ui-react'
import axios from 'axios';
import TableUserEventApp from "./TableUserEventApp.js";

 
class Event extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            usersEvent:[],
            success: false,
            error: false,
            title: "Event",
            documentsType: [],
            roles: [],
            idEvent: "",
            name: "",
            description: "",
            date: "",
            maximumPeople: "",
            peopleRegistered: "",
            maximumPeopleWating: "",
            peopleWating: "",
            note:"",
        };
    }

    getUserEventId(){
       /* axios.get(`http://localhost:9090/UserEventController/getUserEventByEventId/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ usersEvent :  res.data });                       
           
        })*/
    }
    

    componentDidMount() {
        axios.get(`http://localhost:9090/getEventById/${this.props.match.params.id}`)
        .then(res => {
          this.setState({ idEvent :  res.data.id });                       
          this.setState({ name :  res.data.name });                       
          this.setState({ namePlace :  res.data.place.name });                       
          this.setState({ date :  res.data.date });                       
          this.setState({ peopleRegistered :  0 });    
          this.setState({ note :  res.data.description });                       
      })
       this.getUserEventId();

       
    }

    handleChange = (event, data) => {
        this.setState({ [data.name]: data.value });
      };

      handleSubmit = event => {
        console.log(this.state.documentType)
        axios.post(`http://localhost:9090/UserEventController/setUserEvent`, { 
			"note":"",
			"status": "active",
			"type": "registered",
			"event":{"id": this.state.idEvent},
			"userApp":{"id":1}
         })
          .then(res => {
                this.setState({success: true });
                this.setState({error: false });
                this.getUserEventId();
            }).catch(error => {
            console.log(error.response)
                this.setState({success: false });
                this.setState({error: true });
        });
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
                    <h1>{this.state.title}</h1>
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <div className=" field"><label> Name:  {this.state.name}</label></div>
                        <div className=" field"><label> Description:  {this.state.description} </label></div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className=" field"><label> Name Place:   {this.state.namePlace}</label></div>
                        <div className=" field"><label> Date:  {this.state.date} 
                        </label></div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className=" field"><label> Maximum People: {this.state.maximumPeople} </label></div>
                        <div className=" field"><label> People Registered: {this.state.peopleRegistered} </label></div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className=" field"><label> Maximum People Wating: {this.state.maximumPeopleWating} </label></div>
                        <div className=" field"><label> People Wating {this.state.peopleWating} </label></div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className=" field"><label> Note:  </label><label>{this.state.note}</label> </div>
                    </Form.Group>
                    <Form.Field className="center">
                        <Button size = "large" type='submit'  positive>Register</Button>
                    </Form.Field>
                    
                    
                </Form>

                <TableUserEventApp usersEvent = {this.state.usersEvent} />
            </div>
        );
    }
}

export default Event