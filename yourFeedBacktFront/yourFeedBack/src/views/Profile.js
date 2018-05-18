import React,{ Component } from 'react';
import {  Button, Message } from 'semantic-ui-react'
import { Form  } from 'formsy-semantic-ui-react'
import axios from 'axios';


 
class Profile extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            iduser: localStorage.getItem("idUSer"),
            success: false,
            error: false,
            title: "My Profile",
            documentsType: [],
            roles: [],
            areas: [],
            id: "",
            documentType: "",
            document: "",
            password: "",
            names: "",
            lastName: "",
            gender: "",
            email: "",
            role:"",
            area:"",
            status:"",
        };
    }

    componentDidMount() {
        
        axios.get(`http://localhost:9090/getDocumentsType`)
          .then(res => {
            const documentsType = res.data ? res.data.map(
                (documentType) => ({ 
                    key: documentType.id, 
                    text: documentType.name, 
                    value: documentType.id, 
                })
            ) : null;
            this.setState({ documentsType });           
        })

        axios.get(`http://localhost:9090/getRoles`)
          .then(res => {
            const roles = res.data ? res.data.map(
                (role) => ({ 
                    key: role.id, 
                    text: role.name, 
                    value: role.id, 
                })
            ) : null;
            this.setState({ roles });           
        })
        axios.get(`http://localhost:9090/getAreas`)
          .then(res => {
            const areas = res.data ? res.data.map(
                (area) => ({ 
                    key: area.id, 
                    text: area.name, 
                    value: area.id, 
                })
            ) : null;
            this.setState({ areas });           
        })

        axios.get(`http://localhost:9090/getUserById/${this.state.iduser}`)
          .then(res => {
            this.setState({ id :  res.data.id });                       
            this.setState({ documentType :  res.data.documentType.id });                       
            this.setState({ document :  res.data.document });                       
            this.setState({ names :  res.data.name });                       
            this.setState({ lastName :  res.data.lastName });                       
            this.setState({ gender :  res.data.gender });                       
            this.setState({ email :  res.data.email });                       
            this.setState({ password :  res.data.password });                       
            this.setState({ role :  res.data.role.id });                       
            this.setState({ area :  res.data.area.id });                       
            this.setState({ status :  res.data.status });                       
                   
        })
    }

    handleChange = (event, data) => {
        this.setState({ [data.name]: data.value });
      };

      handleSubmit = event => {
        console.log(this.state.documentType)
        axios.post(`http://localhost:9090/setUser`, { 
            "id": this.state.id,
            "documentType": { "id" : this.state.documentType},
            "document":this.state.document,
            "name": this.state.names,
            "lastName": this.state.lastName,
            "gender": this.state.gender,
            "email": this.state.email,
            "password": this.state.password,
            "role": {"id" : this.state.role},
            "area": {"id" : this.state.area},
            "status": this.state.status
         })
          .then(res => {
                this.setState({success: true });
                this.setState({error: false });
            }).catch(error => {
            console.log(error.response)
                this.setState({success: false });
                this.setState({error: true });
        });
      }

     
    

    render(){
        const errorLabel = <span color="red"/>
        const genders = [
            { key: 'male', text: 'Male', value: 'male' },
            { key: 'female', text: 'Female', value: 'female' },
          ]
          const status = [
            { key: 'ACTIVE', text: 'Active', value: 'ACTIVE' },
            { key: 'INACTIVE', text: 'Inactive', value: 'INACTIVE' },
          ]
        return(
            <Form className = "profile-form" onValidSubmit={this.handleSubmit}
                loading={ this.props.isLoading }
            >
                {this.state.error &&
                    <Message negative>
                        <Message.Header>Error Operation</Message.Header>
                    </Message>
                }
                {this.state.success &&
                    <Message positive>
                        <Message.Header>Success Operation</Message.Header>
                    </Message>
                }
                <Form.Field className="center">
                   <h2>{this.state.title}</h2>
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Document Type'  options={this.state.documentsType}  value={this.state.documentType} name = "documentType" onChange={this.handleChange} placeholder='Select...'
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Document type is required' }}
                     errorLabel={ errorLabel } />
                    <Form.Input fluid label='Document' type="number" placeholder='Document' value={this.state.document} name = "document" onChange={this.handleChange} 
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Document is required' }}
                     errorLabel={ errorLabel }
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Names' name="names" placeholder='Names' value={this.state.names} onChange={this.handleChange}  
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Names is requiered' }}
                     errorLabel={ errorLabel }
                    />
                    <Form.Input fluid label='Last name' placeholder='Last name' value={this.state.lastName} name = "lastName" onChange={this.handleChange} 
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Last name is requiered' }}
                     errorLabel={ errorLabel }
                    />
                    <Form.Select fluid label='Gender' options={genders} placeholder='Select...' value={this.state.gender} name = "gender" onChange={this.handleChange}
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Gender is requiered' }}
                     errorLabel={ errorLabel }
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email'  placeholder='Email' value={this.state.email} name = "email" onChange={this.handleChange} 
                     validations="isEmail"
                     required
                     validationErrors={{ isEmail: 'Email not valid',isDefaultRequiredValue: 'Email is requiered'  }}
                     errorLabel={ errorLabel }
                    />
                   <Form.Input fluid label='Password'  placeholder='Password' type="password" value={this.state.email} name = "password" onChange={this.handleChange} 
                     required
                     validationErrors={{ isDefaultRequiredValue: 'Password is requiered'  }}
                     errorLabel={ errorLabel }
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Select fluid label='Role' options={this.state.roles} value={this.state.role} placeholder='Select...' name = "role" onChange={this.handleChange} 
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Role is requiered' }}
                     errorLabel={ errorLabel }
                    />
                      <Form.Select fluid label='Area' options={this.state.areas} value={this.state.area} placeholder='Select...' name = "area" onChange={this.handleChange} 
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Area is requiered' }}
                     errorLabel={ errorLabel }
                    />
                    <Form.Select fluid label='Status' options={status} placeholder='Select...' value={this.state.status} name = "status" onChange={this.handleChange} 
                     required 
                     validationErrors={{ isDefaultRequiredValue: 'Status is requiered' }}
                     errorLabel={ errorLabel }
                    />
                </Form.Group>
                <Form.Field className="center">
                    <Button size = "large" type='submit'  positive>Save</Button>
                </Form.Field>
                
            </Form>
        );
    }
}

export default Profile