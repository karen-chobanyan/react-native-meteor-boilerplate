export function fetchProjectsFromAPI() {
  return (dispatch) => {
    dispatch(getProjects())
    fetch('https://swapi.co/api/projects/')
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      dispatch(getProjectsSuccess(json.results))
    })
    .catch(err => dispatch(getProjectsFailure(err)))
  }
}

export function getProjects() {
  return {
    type: 'FETCHING_PROJECTS'
  }
}

export function getProjectsSuccess(data) {
  return {
    type: 'FETCHING_PROJECTS_SUCCESS',
    data,
  }
}

export function getProjectsFailure() {
  return {
    type: 'FETCHING_PROJECTS_FAILURE'
  }
}