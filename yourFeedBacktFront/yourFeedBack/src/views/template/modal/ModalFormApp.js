import React , {Component} from 'react';
import { Popup, Button, Modal, Form } from 'semantic-ui-react'


class ModalFormApp extends Component{
    state = { open: false }

    closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
      this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
    }
  
    close = () => this.setState({ open: false })

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
    render(){

        return(
            
        <div>
             <Modal size="large" trigger={<Button>New</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content >
                <Form>
                        <Form.Field>
                            <label>Type Document</label>
                            <input placeholder='Type Document' />
                        </Form.Field>
                        <Form.Field>
                            <label>Document</label>
                            <input placeholder='Document' />
                        </Form.Field>
                        
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <input placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Role</label>
                            <input placeholder='Role' />
                        </Form.Field>
                        <Form.Field>
                            <label>Status</label>
                            <input placeholder='Status' />
                        </Form.Field>
                        
                        
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            <Modal size="large" trigger={<Button>Search</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content >
                    <Form>
                        <Form.Field>
                            <label>Type Document</label>
                            <input placeholder='Type Document' />
                        </Form.Field>
                        
                        
                        
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            <Popup trigger={<Button onClick={this.show(false)}>Help</Button>}>
            <Popup.Header>Heads up!</Popup.Header>
            <Popup.Content>
                By default, a Modal closes when escape is pressed or when the dimmer is
                clicked. Setting the dimmer to "None" (dimmer={'{'}false{'}'}) means that there is no
                dimmer to click so clicking outside won't close the Modal. To close on
                outside click when there's no dimmer, you can pass the "closeOnDocumentClick" prop.
            </Popup.Content>
            </Popup>
           
        </div>
        );
    }
}
export default ModalFormApp