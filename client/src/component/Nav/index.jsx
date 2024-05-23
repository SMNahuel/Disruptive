import { useNavigate, useLocation } from "react-router-dom";
import style from "./style.module.css";
import { useUser } from "../../context";
import { useEffect } from "react";

const NavComponent = ({ title }) => {
  let location = useLocation();

  const { state, dispatch } = useUser();

  const navigate = useNavigate();

  const handleNavigate = (dest) => {
    navigate(dest);
  };

  const handleLogout = (dest) => {
    dispatch({ type: "LOGOUT" });

    navigate(dest);
  };

  useEffect(() => {
    !state?.user?.email && navigate("/login");
  }, []);

  return (
    <>
      {title === "Crear contenido" ? (
        <div className={style.ctn}>
          <button onClick={() => handleNavigate("/")}>Inicio</button>
          <h1>{title}</h1>
          <button onClick={() => handleLogout("/login")}>
            Salir de la cuenta
          </button>
        </div>
      ) : (
        <div className={style.ctn}>
          <div>
            {state.user.type === "Creator" && (
              <button onClick={() => handleNavigate("/creator")}>
                Crear Contenido
              </button>
            )}
            {state.user.type === "Admin" && (
              <>
              {
                location.pathname === '/crud' && <button onClick={() => handleNavigate("/")}>INICIO</button>
              }
              {
                location.pathname === '/' && <button onClick={() => handleNavigate("/crud")}>CRUD</button>
              }
              </>
            )}
          </div>
          <h1>{title}</h1>
          <button onClick={() => handleLogout("/login")}>
            Salir de la cuenta
          </button>
        </div>
      )}
    </>
  );
};

export default NavComponent;
