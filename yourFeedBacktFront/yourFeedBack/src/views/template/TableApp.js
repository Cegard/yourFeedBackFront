import React,{Component} from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import axios from 'axios';

class TableApp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            demos: [],
            headers:["Document Type","Document","Email","Name","Last Name","Role","Status"],
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/users`)
          .then(res => {
            const demos = res.data;
            this.setState({ demos });
            console.log(demos);
            
        })
    }


    render(){
        const  colspanheader= this.state.headers.length
        const users = this.state.demos.map((demo, index) => 
            <Table.Row key = {index}>
                <Table.HeaderCell >{demo.documentType.name}</Table.HeaderCell> 
                <Table.HeaderCell>{demo.document}</Table.HeaderCell> 
                <Table.HeaderCell >{demo.email}</Table.HeaderCell> 
                <Table.HeaderCell >{demo.name}</Table.HeaderCell> 
                <Table.HeaderCell >{demo.lastName}</Table.HeaderCell> 
                <Table.HeaderCell >{demo.role.name}</Table.HeaderCell> 
                <Table.HeaderCell >{demo.status}</Table.HeaderCell> 
            </Table.Row>
            );
        const headers = this.state.headers.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={colspanheader}>User</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Header>
                    <Table.Row>
                        {headers}
                    </Table.Row>
                    
                </Table.Header>

                <Table.Body>
        {users}
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
        );
    }
}

export default TableApp
