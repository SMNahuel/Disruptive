import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useUser } from "../../context";
import style from "./style.module.css";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { dispatch, state } = useUser();

  useEffect(() => {
    state.user.email && navigate("/");
  }, []);
  const handleSumbit = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post(`http://localhost:3000/auth/login`, {
        email: form.email,
        password: form.password,
      })
      .then((r) => {
        const decoded = jwtDecode(r.data.token);
        localStorage.setItem('token', r.data.token);
        dispatch({
          type: "LOGIN",
          payload: { user: decoded.user, token: r.data.token },
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.ctn}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <form className={style.ctn_form} onSubmit={(e) => handleSumbit(e)}>
          <input
            placeholder="Ingrese email"
            name="email"
            type="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            placeholder="Ingrese password"
            name="password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Loguear</button>
          <button
            className={style.button_register}
            type="button"
            onClick={() => navigate("/register")}
          >
            Registrar
          </button>
        </form>
      )}
    </div>
  );
};
export default LoginPage;
