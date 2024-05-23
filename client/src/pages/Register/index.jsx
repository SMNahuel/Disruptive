import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useUser } from "../../context";
import style from "./style.module.css";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    type: "reader",
  });

  const { dispatch, state } = useUser();
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post(`http://localhost:3000/auth/register/${form.type}`, {
        email: form.email,
        nickname: form.nickname,
        password: form.password,
      })
      .then((r) => {
        const decoded = jwtDecode(r.data.token);

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
            placeholder="Ingrese un Email"
            name="email"
            type="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="nickname"
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese un nickname"
          />
          <input
            name="password"
            type="password"
            onChange={(e) => handleChange(e)}
            placeholder="Ingrese su password"
          />

          <div className={style.ctn_type}>
            <p>Seleccionar tipo de usuario</p>

            <div className={style.button}>
              <input
                type="radio"
                id="reader"
                name="type"
                value="reader"
                onChange={(e) => handleChange(e)}
              />
              <label className="btn btn-default">Lector</label>
            </div>

            <div className={style.button}>
              <input
                type="radio"
                id="creator"
                name="type"
                value="creator"
                onChange={(e) => handleChange(e)}
              />
              <label className="btn btn-default" for="creator">
                Creador
              </label>
            </div>
          </div>
          <button>Registrar</button>
          <button
            className={style.button_register}
            type="button"
            onClick={() => navigate("/login")}
          >
            Ya tienes una cuenta? Logueate
          </button>
        </form>
      )}
    </div>
  );
};
export default RegisterPage;
