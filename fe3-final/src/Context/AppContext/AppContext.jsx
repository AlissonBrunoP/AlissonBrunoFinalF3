import React, { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext();




export const actionTypes = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
    REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  };
  
  const appReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.TOGGLE_THEME:
        return { ...state, darkMode: !state.darkMode };
      case actionTypes.ADD_TO_FAVORITES:
        return { ...state, favorites: [...state.favorites, action.payload] };
      case actionTypes.REMOVE_FROM_FAVORITES:
        return {
          ...state,
          favorites: state.favorites.filter((dentist) => dentist.id !== action.payload.id),
        };
      default:
        return state;
    }
  };
  
export const AppProvider = ({ children }) => {
    const initialState = {
        darkMode: !!localStorage.theme,
        favorites: localStorage.favs ? JSON.parse(localStorage.favs) : []
    };

    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};