import React, { useEffect, useState } from "react";
import NavComponent from "../../component/Nav";
import style from "./style.module.css";
import axios from "axios";
import YoutubeEmbed from "../../component/YoutubePlayer";
import api from "../../utils/api";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  useEffect(() => {
    try {
      setLoading(true);
      api.get('/content').then(({ data }) => {
        setContent(data);
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <NavComponent title={"Seccion contenido"} />
      <div className={style.ctn}>
        {content.length === 0 ? (
          <div className={style.ctn_content}>
            <h2>No hay contenido que mostrar</h2>
          </div>
        ) : (
          <div className={style.ctn_items}>
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
                    {item.video_url && (
                      <YoutubeEmbed embedId={item.video_url.split("v=")[1]} />
                    )}
                    {item.image && (
                      <img src={`${item.image}`} width={450} height={300} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
