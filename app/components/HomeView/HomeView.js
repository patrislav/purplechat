import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const actionButtonStyle = {
  position: 'fixed',
  right: '20px',
  bottom: '20px'
}

const HomeView = () => (
  <div>
    <FloatingActionButton style={actionButtonStyle}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default HomeView
