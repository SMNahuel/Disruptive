import "./index.css";

const Modal = ({ show, close, edit, setEdit, theme, updateContent }) => {
  const handleChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {show ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_content_data">
              <h1>Seleccionar tematica</h1>
              {/*               <div>
                {theme.map((item, index) => {
                  return (
                    <div className="button" key={index}>
                      <input
                        type="radio"
                        name="check-substitution-2"
                        value={item.name}
                      />
                      <label className="btn btn-default">{item.name}</label>
                    </div>
                  );
                })}
              </div> */}

              <h1>Titulo</h1>
              <input
                value={edit.title}
                name="title"
                onChange={(e) => handleChange(e)}
              />
              <h1>Contenido</h1>
              <textarea
                width={"150em"}
                height={"10em"}
                name="content"
                value={edit.content}
                className="modal_content_textarea"
                onChange={(e) => handleChange(e)}
              />
              {/* <input type="file" value={edit.image}/> */}
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

export default Modal;
