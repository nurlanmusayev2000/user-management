interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface State {
  data: User[];
}

interface Action {
  type: string;
  payload: User[];
}

const initialState: State = {
  data: []
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
		case "GET_ALL_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default reducer;
