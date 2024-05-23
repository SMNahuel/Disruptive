import React, { createContext, useReducer, useContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Definir el reducer para manejar acciones relacionadas con la sesión del usuario
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          email: "",
          nickname: "",
          type: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Definir el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {
      email: "",
      nickname: "",
      type: "",
    },
    isAuthenticated: false,
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto del usuario
export const useUser = () => useContext(UserContext);
