const initialState = {
  projects: [],
  isFatching: false,
  error: false
}

export default function projectReducer(state = initialState, action){
  switch (action.type) {
    case 'FETCHING_PROJECTS':{
      return {
        ...state,
        isFetching: true,
        projects: []
      }
      break
    }
    case 'FETCHING_PROJECTS_SUCCESS' : {
      return {
        ...state,
        isFetching: false,
        projects: action.data
      }
      break
    }
    case 'FETCHING_PROJECTS_FAILUREE' : {
      return {
        ...state,
        isFetching: false,
        error: true
      }
      break
    }        
    default:
    return state
  }
}