import React,{Component} from 'react'
import { Icon, Menu, Table , Popup , Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class TableReport extends Component{

    constructor(props) {
        super(props);

        this.state = {
            evaluatedUser: [],
            headers:["Name","Name Place","Date",""],
            userAppId: 1,
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/getEvaluatedsUserById/${this.state.userAppId}`)
          .then(res => {
            const evaluatedUser = res.data;
            this.setState({ evaluatedUser });
        })
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    render(){
        const  colspanheader= this.state.headers.length
        const evaluatedUser = this.state.evaluatedUser.map((evaluatedUser, index) => 
            <Table.Row key = {index}>
                <Table.Cell >{evaluatedUser.event.description}</Table.Cell> 
                <Table.Cell >{evaluatedUser.event.place.name}</Table.Cell> 
                <Table.Cell >
                    {new Intl.DateTimeFormat('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: '2-digit' 
                    }).format(evaluatedUser.event.data)}
                </Table.Cell> 
                <Table.HeaderCell > <Link to={`/Template/ReportEvent/${evaluatedUser.id}`}  className="ui large fluid positive button">Show Report</Link></Table.HeaderCell> 
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
                        {evaluatedUser}
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

export default TableReport
