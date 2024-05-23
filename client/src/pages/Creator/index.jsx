import React, { useEffect, useState } from "react";
import axios from "axios";

import NavComponent from "../../component/Nav";
import { useUser } from "../../context";
import style from "./style.module.css";
import api from "../../utils/api";
import Modal from "../../component/Modal";

const CreatorPage = () => {
  const [theme, setTheme] = useState([]);
  const [content, setContent] = useState([]);
  const [selectTheme, setSelectTheme] = useState();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState();
  const [form, setForm] = useState({
    title: "",
    theme: "",
    content: "",
    video_url: null,
    image: null,
    document: null,
  });

  const Toggle = () => setModal(!modal);
  const { state } = useUser();

  useEffect(() => {
    api.get("/theme").then(({ data }) => {
      setTheme(data);
    });
    api.get(`/content/${state.user.nickname}`).then(({ data }) => {
      setContent(data);
    });
  }, []);

  const handleInputYoutube = (e) => {
    if (
      e.target.value.match("^(https?://)?((www.)?youtube.com|youtu.be)/.+$") !=
      null
    ) {
      setForm({ ...form, video_url: e.target.value });
    }
  };

  function uploadImage(img) {
    let body = new FormData();
    body.set("key", "3b8489ea2bc0ad9ee80ec4ca5a1dfb27");
    body.append("image", img);

    return axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });
  }

  const handleUploadImg = (img) => {
    uploadImage(img).then((resp) => {
      setForm({
        ...form,
        image: resp.data.data.url,
      });
    });
  };

  const handleUploadContent = (e) => {
    e.preventDefault();
    if (!selectTheme) {
      alert("Seleccione tematica");
      return;
    }

    if (!form.title) {
      alert("Ingrese un titulo");
      return;
    }

    if (!form.content) {
      alert("Ingrese contenido del post");
      return;
    }

    if (selectTheme.video_url && !form.video_url) {
      alert("Ingrese un link de video youtube");
      return;
    }

    if (selectTheme.image && !form.image) {
      alert("Ingrese una imagen");
      return;
    }

    if (selectTheme.text && !form.text) {
      alert("Ingrese una imagen");
      return;
    }
    setModal(true);

    setForm({
      ...form,
      theme: selectTheme.name,
    });

    var body = { form, theme: selectTheme };
    api
      .post("/content", body, {
        headers: {
          Authorization: `${state.token}`,
        },
      })
      .then(() => {
        alert("El contenido se subio");
      })
      .catch((err) => alert("Tuvimos un error"));
    setForm({
      title: "",
      theme: "",
      content: "",
      video_url: null,
      image: null,
      document: null,
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateContent = (item) => {
    setModal(true);
    setUpdate(item);
  };

  const updateContent = () => {
    api
      .put(`/content/${update._id}`, update, {
        headers: {
          Authorization: `${state.token}`,
        },
      })
      .then(({ data }) => {
        setContent(data.data);
      });
    setModal(false);
    setUpdate();
  };

  return (
    <>
      <NavComponent title={"Crear contenido"} />
      <div className={style.ctn}>
        <form className={style.ctn_form} onSubmit={handleUploadContent}>
          <p>Seleccionar tematica</p>
          {!modal && (
            <div>
              {theme.map((item, index) => {
                return (
                  <div className={style.button} key={index}>
                    <input
                      type="radio"
                      name="check-substitution-2"
                      onChange={() => setSelectTheme(item)}
                    />
                    <label className="btn btn-default">{item.name}</label>
                  </div>
                );
              })}
            </div>
          )}

          <label>Ingrese titulo</label>
          <input
            name="title"
            onChange={(e) => handleChange(e)}
            value={form.title}
          />
          <label>Ingrese texto que estara relacionado a sus contenido</label>
          <textarea
            width={"150em"}
            height={"15em"}
            onChange={(e) => handleChange(e)}
            name="content"
            value={form.content}
          />
          {selectTheme?.video_url && (
            <input
              placeholder="Ingrese video url"
              onChange={handleInputYoutube}
            />
          )}
          {selectTheme?.image && (
            <input
              placeholder="Inserte imagen"
              type="file"
              onChange={(e) => handleUploadImg(e.target.files[0])}
            />
          )}
          {selectTheme?.documento && <input placeholder="Inserte documentos" />}
          <button type="sumbit">Publicar</button>
        </form>
      </div>

      <div className={style.ctn}>
        <h1>Tus post</h1>
        <div className={style.ctn_item}>
          {content.map((item, index) => {
            return (
              <div key={index} className={style.ctn_items_elem}>
                <div className={style.ctn_items_elem_text}>
                  <h3>{item.title}</h3>
                  <p className={style.ctn_items_elem_text_p}>{item.content}</p>
                  <div>
                    <p>Tematica: {item.theme}</p>
                    <p>Autor: {item.author}</p>
                  </div>
                </div>
                <div className={style.ctn_items_elem_mult}>
                  <button onClick={() => handleUpdateContent(item)}>
                    Editar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        show={modal}
        close={Toggle}
        edit={update}
        setEdit={setUpdate}
        updateContent={updateContent}
        theme={theme}
      />
    </>
  );
};

export default CreatorPage;
