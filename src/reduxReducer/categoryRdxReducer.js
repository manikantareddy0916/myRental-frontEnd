const initialState = {
  category: [],
  serverErrors: []
};

export default function categoryRdx(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      console.log('rdx1', action.payload);
      return { ...state, category: [...state.category, action.payload] };
    }
    case "SET_ALL_CATEGORY": {
      return {...state, category: action.payload}
    }
    //removing from rdx
    case 'DELETE_CATEGORY' : {
      return {...state, category : state.category.filter(ele => ele._id != action.payload)}
    }
    default: {
      return state;
    }
  }
}

  