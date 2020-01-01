import React, {Component} from 'react'
import MessageView from './../view/MessageView2'
import Message from './../model/group/Message'

class MessageController extends Component {

      constructor(props)
      {
        super(props);
        
        this.state = { messages: []};
      }
    
      componentDidMount()
      {
        Message.getMessage(this.setMessages);
      }

      setMessages = (data) => {
        this.setState({messages: data})
      }

      sendMessage = (message) => {
        Message.pushMessage(message);
      }

    render() {

        return(

            <MessageView 
                messages={this.state.messages}
                sendMessage={this.sendMessage}/>


        )


    }




}

export default MessageController;