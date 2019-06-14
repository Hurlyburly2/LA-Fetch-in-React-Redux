const initialState = {
  groceryList: [],
  name: '',
  isFetching: false
}

const groceries = (state = initialState, action) => {
  switch(action.type) {
    case ADD_GROCERY:
      const newGroceries = state.groceryList.concat(action.grocery)
      return {...state, groceryList: newGroceries }
    case CLEAR_FORM:
      return {...state, name: ''}
    case HANDLE_NAME_CHANGE:
      return {...state, name: action.newName}
    case GET_GROCERIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case GET_GROCERIES_REQUEST_SUCCESS:
      return {
        ...state,
        groceryList: action.groceries,
        isFetching: false
      }
    default:
      return state
  }
}

const ADD_GROCERY = 'ADD_GROCERY'

const addNewGrocery = grocery => {
  return {
    type: ADD_GROCERY,
    grocery
  }
}

const CLEAR_FORM = 'CLEAR_FORM'

const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

const HANDLE_NAME_CHANGE = 'HANDLE_NAME_CHANGE'

const handleNameChange = event => {
  const newName = event.target.value
  return {
    type: HANDLE_NAME_CHANGE,
    newName
  }
}

const GET_GROCERIES_REQUEST = 'GET_GROCERIES_REQUEST'
const getGroceriesRequest = () => {
  return {
    type: GET_GROCERIES_REQUEST
  }
}

const GET_GROCERIES_REQUEST_SUCCESS = 'GET_GROCERIES_REQUEST_SUCCESS'
const getGroceriesRequestSuccess = groceries => {
  return {
    type: GET_GROCERIES_REQUEST_SUCCESS,
    groceries
  }
}

const getGroceries = () => {
  return (dispatch) => {
    dispatch(getGroceriesRequest())
    
    return fetch('/api/v1/groceries.json')
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          dispatch(displayAlertMessage("Something went wrong."))
          return { error: 'Something went wrong.' }
        }
      })
      .then(groceries => {
        if (!groceries.error) {
          dispatch(getGroceriesRequestSuccess(groceries))
        }
      })
  }
}

export {
  groceries,
  addNewGrocery,
  clearForm,
  getGroceries,
  handleNameChange
}
