import React, {Component} from 'react'
import axios from 'axios';
import Carousel from 'nuka-carousel'
import {  Icon, Menu , Table, Button, Message , Popup ,Checkbox} from 'semantic-ui-react'
import { Form  } from 'formsy-semantic-ui-react'



class Evaluation extends Component{
    constructor(props){
        super(props);
        this.state= {
            evaluatedUser: "",
            event: "",
            questions: "",
            groups: [],
            userApp: "",
            headers:["Question","1","2","3","4"],
            p:[],
            answers: {},
            checked: [],
            values: [1,2,3,4],
        };
    }

    getUserEventId() {
        axios.get(`http://localhost:9090/getEvaluatedUserById/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ evaluatedUser :  res.data }); 
            this.setState({ event :  res.data.event }); 
            this.setState({ userApp :  res.data.userApp }); 
            this.getGroup();
            
        })
    }

    async getGroup() { 
        console.log(this.state.event.id)
        const newGroups = [];
        await axios.get(`http://localhost:9090/getQuestionsGroups/${this.state.event.id}`)
          .then(res => {
            res.data.map((item, index) => {
                const group =
                    {
                        id: item.id,
                        name: item.name,
                        questions: [],
                    };
                this.getQuestion(item.id, index);
                newGroups.push(group);
            });

        })
        console.log('AAA', newGroups);
        this.setState({ groups : newGroups }); 
    }

    async getQuestion(id, index) {
        console.log('getQuestion', id, index);
        let questions = [];
        await axios.get(`http://localhost:9090/getQuestions/${this.state.event.id}/${id}`)
            .then(res => {
                questions = res.data;
            });
            console.log("acacaxdcas",questions);
    const newGroups = this.state.groups;
    newGroups[index].questions = questions;
    this.setState({ groups : newGroups }); 
    }

    componentDidMount() {
       this.getUserEventId();
    }
    show = dimmer => () => this.setState({ dimmer, open: true })    

    handleChange = (event, data) => {
        console.log('data: ', data);
        this.setState({ [data.name]: data.value });
        const key = data.quiestionId;
        const val = data.value;
        const updatedAnswers = {...this.state.answers, [key]: val};
        this.setState({answers: updatedAnswers});

        const updatedCheck = this.state.checked;
        updatedCheck[data.quiestionId] = data.value;
        this.setState({checked: updatedCheck});
        console.log('new answers', this.state.answers);
      };

    render(){
        const  colspanheader= this.state.headers.length        
        const headers = this.state.headers.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        const style = {
            height: "40px;"
        }
        const errorLabel = <span color="red"/>        
        const groupsApp = this.state.groups
        const form = this.state.groups.map((groupCurrent,index) => 
            <div className = "div-carousel" key={index}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={colspanheader} >{groupCurrent.name}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                    {headers}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {groupCurrent.questions.map((question,index) => 
                        <Table.Row key={`question_${question.id}`}>
                        <Table.Cell >{question.question}</Table.Cell> 
                        {this.state.values.map(value => 
                            <Table.Cell key = {`question_${question.id}_${value}`}>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    quiestionId={question.id}
                                    value={value}
                                    index = {index}
                                    checked={this.state.checked[question.id] === value}
                                    onChange={this.handleChange}
                                />    
                            </Form.Field>
                        </Table.Cell>   
                        )}
                                          
                    </Table.Row>
                    )}
                   
                </Table.Body>

            </Table>
            <Form.Group widths='equal'>
                <Form.TextArea  label='Comments' type="number" placeholder='Comments For Group' value={this.state.document} name = "document" onChange={this.handleChange} 
                required 
                validationErrors={{ isDefaultRequiredValue: 'Document is required' }}
                errorLabel={ errorLabel }
                />
            </Form.Group>
        </div>
            );
            
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
                    <Form.Field className="center">                    
                        <Carousel>
                            {form}                        
                        </Carousel>
                    </Form.Field>
                        
                </Form>

            </div>

        );
    }
}
export default Evaluation;