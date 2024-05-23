import { useState } from "react";
import ModalCategory from "../../../component/Modal/ModalCategory";
import style from "../style.module.css";

const CRUDCategory = ({ category, handleDeleteCategory }) => {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState();

  const Toggle = () => setModal(!modal);

  const handleUpdate = (item) => {
    setEdit(item);
    setModal(true);
  };
  return (
    <div className={style.ctn_item}>
      <h1>Categorias</h1>
      <div>
        {category.map((item, index) => {
          return (
            <div className={style.delete_category} key={index}>
              <p>{item.name}</p>
              <div>
                <button onClick={() => handleDeleteCategory(item._id)}>
                  Eliminar
                </button>
                <button onClick={() => handleUpdate(item)}>Editar</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Tematicas</h1>
      </div>
      <ModalCategory show={modal} close={Toggle} edit={edit} />
    </div>
  );
};

export default CRUDCategory;
