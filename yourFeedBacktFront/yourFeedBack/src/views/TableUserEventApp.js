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
        const  colspanheader= this.state.headers.length
        const events = this.props.usersEvent.map((userEvent, index) => 
            <Table.Row key = {index}>
                <Table.HeaderCell >{index+1}</Table.HeaderCell> 
                <Table.HeaderCell>{`${userEvent.userApp.name} ${userEvent.userApp.lastName}`}</Table.HeaderCell> 
                <Table.HeaderCell >User</Table.HeaderCell> 
                <Table.HeaderCell > <Link to={`/Template/Event/${userEvent.id}`}  className="ui large fluid positive button">Evaluate</Link></Table.HeaderCell>                 
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
