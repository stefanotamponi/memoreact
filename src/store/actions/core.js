import * as actionTypes from './actionTypes';
import axios from '../../shared/axios';

export const pushData = (user, token) => {
  return {
    type: actionTypes.PUSH_DATA,
    payload: {
      user: user,
      token: token
    }
  }
}

export const fetchData = (user, token) => {
  return dispatch => {
    axios.get(`/${user}.json?auth=${token}`)
      .then(response => {
        dispatch(mergeData(response.data))
      }) 
  }
}

export const mergeData = (data) => {
  return {
    type: actionTypes.MERGE_DATA,
    payload: data
  }
}

export const clearData = () => {
  return {
    type: actionTypes.CLEAR_DATA
  }
}

export const createCategory = (newCategory) => {
  return {
    type: actionTypes.CREATE_CATEGORY,
    payload: newCategory
  }
}

export const editCategory = (newName, oldName) => {
  return {
    type: actionTypes.EDIT_CATEGORY,
    payload: {
      oldName: oldName,
      newName: newName
    }
  }
}

export const deleteCategory = (categoryToDelete) => {
  return {
    type: actionTypes.DELETE_CATEGORY,
    payload: categoryToDelete
  }
}

export const createTodo = (newTodo, parent, time) => {
  return {
    type: actionTypes.CREATE_TODO,
    payload: {
      name : newTodo,
      parent: parent,
      time: time
    }
  }
}

export const updateTodoStatus = (id, parent, status) => {
  return {
    type: actionTypes.UPDATE_TODO_STATUS,
    payload: {
      id: id,
      parent: parent,
      status: status
    }
  }
}

export const updateTodoContent = (id, parent, content) => {
  return {
    type: actionTypes.UPDATE_TODO_CONTENT,
    payload: {
      id: id,
      parent: parent,
      content: content
    }
  }
}
 
export const deleteTodo = (id, parent) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload: {
      id: id,
      parent: parent
    }
  }
}