import style from "../../../pages/CRUD/style.module.css";
const ModalCategory = ({ show, close, edit, updateContent }) => {
  const handleChange = () => {};

  return (
    <>
      {show ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_content_data">
              <h1>Modificar Categoria</h1>

              <h1>Titulo</h1>
              <input value={edit.name} />
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
              <div>
                <button onClick={close}>Cancelar</button>
                <button onClick={updateContent}>Actualizar</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalCategory;
