import * as actionTypes from '../actions/actionTypes';
import axios from '../../shared/axios';

const initialState = {}


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.PUSH_DATA:
      axios.put(`/${action.payload.user}.json?auth=${action.payload.token}`, state);
      return state;

    case actionTypes.MERGE_DATA:
      return state = {
        ...action.payload
      }

    case actionTypes.CLEAR_DATA:
      return state = {}

    case actionTypes.CREATE_CATEGORY:
      if (!state[action.payload]) {
        return {
          ...state,
          [action.payload]: {
            children: [],
            icon: "list"
          }
        }
      } else {
        console.log('[CORE REDUCER]: cannot create new category.')
      }
      
    case actionTypes.EDIT_CATEGORY:
      let updatedState = {...state};
      updatedState[action.payload.newName] = updatedState[action.payload.oldName];
      delete updatedState[action.payload.oldName];
      return updatedState;

    case actionTypes.DELETE_CATEGORY:
      updatedState = {
        ...state
      };
      delete updatedState[action.payload];
      return updatedState;

    case actionTypes.CREATE_TODO:
      const newTodo = {
        title: action.payload.name,
        completed: false,
        time: action.payload.time,
        content: ""
      }

      let childrenArray = [];

      if (state[action.payload.parent].children) {
        childrenArray = [...state[action.payload.parent].children]
      }

      let todoFilter = childrenArray.filter(todo => todo.title === action.payload.name);

      if (todoFilter !== 'undefined' && todoFilter.length > 0) {
        return state;
      } else {
        return {
          ...state,
          [action.payload.parent]: {
            ...state[action.payload.parent],
            children: childrenArray.concat(newTodo)
          }
        }
      }

    case actionTypes.UPDATE_TODO_STATUS:
      let newChildren = state[action.payload.parent].children.map((item) => {
        if (item.title === action.payload.id) {
          return {
            ...item,
            completed: action.payload.status
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        [action.payload.parent]: {
          ...state[action.payload.parent],
          children: [
            ...newChildren
          ]
        }
      };

      case actionTypes.UPDATE_TODO_CONTENT:
        let updatedChildren = state[action.payload.parent].children.map((item) => {
          if (item.title === action.payload.id) {
            return {
              ...item,
              content: action.payload.content
            }
          } else {
            return item;
          }
        });
  
        return {
          ...state,
          [action.payload.parent]: {
            ...state[action.payload.parent],
            children: [
              ...updatedChildren
            ]
          }
        };
  

    case actionTypes.DELETE_TODO:
      let newArray = state[action.payload.parent].children.filter((el) => {
        if (el.title === action.payload.id) {
          return false;
        } 
        return true;
      });

      return {
        ...state,
        [action.payload.parent]: {
          ...state[action.payload.parent],
          children: [
            ...newArray
          ]
        }
      };

    default:
      return state;
  }
}

export default reducer;