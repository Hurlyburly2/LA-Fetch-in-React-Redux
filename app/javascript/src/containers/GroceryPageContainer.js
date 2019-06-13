import React, { Component } from 'react'

import GroceryListContainer from './GroceryListContainer'
import GroceryFormContainer from './GroceryFormContainer'

class GroceryPageContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>Grocery List React</h1>
        <GroceryFormContainer />
        <GroceryListContainer />
      </div>
    )
  }
}

export default GroceryPageContainer
