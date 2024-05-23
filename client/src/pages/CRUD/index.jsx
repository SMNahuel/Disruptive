import React, { useContext, useEffect, useState } from "react";
import NavComponent from "../../component/Nav";
import style from "./style.module.css";
import api from "../../utils/api";
import CRUDCategory from "./Category";
import CRUDTheme from "./Theme";
const CRUDPage = () => {
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([]);
  const [theme, setTheme] = useState([]);
  const [formCategory, setFormCategory] = useState({
    name: "",
    typeDto: "",
  });
  const [formTheme, setFormTheme] = useState({
    name: "",
    category: [],
  });

  useEffect(() => {
    api
      .get("/category")
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((err) => {
        alert("Fijate que paso");
      });

    api
      .get("/content")
      .then(({ data }) => {
        setContent(data);
      })
      .catch((err) => {
        alert("Fijate que paso");
      });
    api
      .get("/theme")
      .then(({ data }) => {
        setTheme(data);
      })
      .catch((err) => {
        alert("Fijate que paso");
      });
  }, []);

  const handleCategoria = async () => {
    api
      .post("/category", formCategory)
      .then(({ data }) => {
        setCategory(data);
      })
      .finally(
        setFormCategory({
          name: "",
          typeDto: "",
        })
      );
  };

  const handleTheme = async () => {
    api
      .post("/theme", formTheme)
      .then(({ data }) => {
        console.log("create");
      })
      .finally(console.log("create"));
  };

  const handleChange = (e) => {
    setFormCategory({ ...formCategory, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;

    const { category } = formTheme;
    if (checked) {
      setFormTheme({
        ...formTheme,
        category: [...category, value],
      });
    } else {
      setFormTheme({
        ...formTheme,
        category: category.filter((e) => e !== value),
      });
    }
  };

  const handleDeleteContent = (id) => {
    api.delete(`/content/${id}`).then((r) => setContent(r.data.data));
  };

  const handleDeleteCategory = (id) => {
    api.delete(`/category/${id}`).then((r) => setCategory(r.data.data));
  };
  const handleDeleteTheme = (id) => {
    api.delete(`/theme/${id}`).then((r) => setCategory(r.data.data));
  };

  return (
    <>
      <NavComponent title={"Seccion Admin"} />
      <div className={style.ctn}>
        <div className={style.ctn_item}>
          {category.length === 0 ? (
            <>
              <h1>
                Aun no hay categoria cree una para poder crear una tematica
              </h1>
            </>
          ) : (
            <>
              <h1>Aqui puedes crear tematicas</h1>
              <input
                onChange={(e) =>
                  setFormTheme({ ...formTheme, name: e.target.value })
                }
                placeholder="Ingrese el nombre de la tematica"
              />
              <h1>Seleccionar las categorias que tendra la tematica</h1>
              <div>
                {category.map((item, index) => {
                  return (
                    <div className={style.button} key={index}>
                      <input
                        type="checkbox"
                        id="a50"
                        name="name"
                        value={item.typeDto}
                        onChange={(e) => handleCheckBox(e)}
                      />
                      <label className="btn btn-default">{item.name}</label>
                    </div>
                  );
                })}
              </div>
              <button onClick={handleTheme}>Crear tematica</button>
            </>
          )}
        </div>
        <div className={style.ctn_item}>
          <h1>Aqui puedes crear categorias</h1>
          <input
            placeholder="Ingrese el nombre de la categoria"
            onChange={(e) => handleChange(e)}
            value={formCategory.name}
            name="name"
          />
          <h1>Seleccionar dato que acepta</h1>
          <div>
            <div className={style.button}>
              <input
                onChange={(e) => handleChange(e)}
                type="radio"
                id="a50"
                name="typeDto"
                value="video_url"
              />
              <label className="btn btn-default">video url</label>
            </div>
            <div className={style.button}>
              <input
                onChange={(e) => handleChange(e)}
                type="radio"
                id="a75"
                name="typeDto"
                value="imagenes"
              />
              <label className="btn btn-default">imagenes</label>
            </div>
            <div className={style.button}>
              <input
                onChange={(e) => handleChange(e)}
                type="radio"
                id="a75"
                name="typeDto"
                value="texto"
              />
              <label className="btn btn-default">texto</label>
            </div>
            <div className={style.button}>
              <input
                onChange={(e) => handleChange(e)}
                type="radio"
                id="a75"
                name="typeDto"
                value="documentos"
              />
              <label className="btn btn-default">documentos</label>
            </div>
          </div>
          <button onClick={handleCategoria}>Crear categoria</button>
        </div>
        <div className={style.ctn_item}>
          <h1>
            Aqui puedes eleminar y editar elementos (tematicas, categorias, contenido)
          </h1>
          <CRUDCategory
            category={category}
            handleDeleteCategory={handleDeleteCategory}
          />

          <CRUDTheme theme={theme} handleDeleteTheme={handleDeleteTheme} />

          <div className={style.ctn_item}>
            <h1>Contenidos</h1>
            <div>
              {content.map((item, index) => {
                return (
                  <div key={index} className={style.ctn_items_elem}>
                    <div className={style.ctn_items_elem_text}>
                      <h3>{item.title}</h3>
                      <p className={style.ctn_items_elem_text_p}>
                        {item.content}
                      </p>
                      <div>
                        <p>Tematica: {item.theme}</p>
                        <p>Autor: {item.author}</p>
                      </div>
                    </div>
                    <div className={style.ctn_items_elem_mult}>
                      <button onClick={() => handleDeleteContent(item._id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CRUDPage;
