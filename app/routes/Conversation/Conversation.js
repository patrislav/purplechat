import React from 'react'
import Shell from 'components/Shell'
import ConversationView from 'components/ConversationView'
import ConversationBar from 'components/ConversationBar'
import history from 'core/history'

const Conversation = (props) => (
  <Shell appBar={<ConversationBar title="Conversation" onGoBack={() => history.push('/messages')} />}>
    <ConversationView {...props} />
  </Shell>
)

export default Conversation
