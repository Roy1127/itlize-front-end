import React from 'react'
import { connect } from 'react-redux'

import Login from './Login';

export const Main = (props) => {
  return (
    <div className="Main">
      <Login/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}



export default connect(mapStateToProps, mapDispatchToProps)(Main)
