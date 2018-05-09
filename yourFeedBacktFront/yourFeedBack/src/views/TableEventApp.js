import React,{Component} from 'react'
import { Icon, Menu, Table , Popup , Button } from 'semantic-ui-react'
import axios from 'axios';
import {
    Link
   } from 'react-router-dom'

class TableEventApp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            headers:["Name","Name Place","People Registered","Date",""],
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/getEvents`)
          .then(res => {
            const events = res.data;
            this.setState({ events });
            console.log(events);
            
        })
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    render(){
        const  colspanheader= this.state.headers.length
        const events = this.state.events.map((event, index) => 
            <Table.Row key = {index}>
                <Table.HeaderCell >{event.description}</Table.HeaderCell> 
                <Table.HeaderCell >{event.place.name}</Table.HeaderCell> 
                <Table.HeaderCell >{0}</Table.HeaderCell> 
                <Table.HeaderCell >
                    {new Intl.DateTimeFormat('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: '2-digit' 
                    }).format(event.data)}
                </Table.HeaderCell> 
                <Table.HeaderCell > <Link to={`/Template/Event/${event.id}`}  className="ui large fluid positive button">Evaluater</Link></Table.HeaderCell> 
            </Table.Row>
            );
        const headers = this.state.headers.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        return(
            <div>
                <Popup trigger={<Button onClick={this.show(false)}>Help</Button>}>
                <Popup.Header>Information</Popup.Header>
                <Popup.Content>
                   In this place you can watch and register on the event avalaible for you.
                </Popup.Content>
                </Popup>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={colspanheader}>Current Event</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            {headers}
                        </Table.Row>
                        
                    </Table.Header>

                    <Table.Body>
                        {events}
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={colspanheader}>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
            
        );
    }
}

export default TableEventApp
