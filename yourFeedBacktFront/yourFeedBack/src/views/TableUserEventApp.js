import React,{Component} from 'react'
import { Icon, Menu , Table} from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class TableUserEventApp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            headers:["Order","Name","Type Evaluation","Action"],
            title: "Event People"

        };
    }



    show = dimmer => () => this.setState({ dimmer, open: true })
    render(){
        console.log(this.props.usersEvent)
        const  colspanheader= this.state.headers.length
        const events = this.props.usersEvent.map((userEvent, index) => 
            <Table.Row key = {index}>
                <Table.Cell >{index+1}</Table.Cell> 
                <Table.Cell>{`${userEvent.userApp.name} ${userEvent.userApp.lastName}`}</Table.Cell> 
                <Table.Cell >User</Table.Cell> 
                <Table.Cell > <Link to={`/Template/Evaluation/${userEvent.event.id}`}  className="ui large fluid positive button">Evaluate</Link></Table.Cell>                 
            </Table.Row>
            );
        const headers = this.state.headers.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        return(
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={colspanheader}>{this.state.title}</Table.HeaderCell>
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

export default TableUserEventApp
