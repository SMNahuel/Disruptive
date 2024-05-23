import style from "../style.module.css";
const CRUDTheme = ({ theme, handleDeleteTheme }) => {
  return (
    <div className={style.ctn_item}>
      <h1>Tematicas</h1>
      <div>
        {theme.map((item, index) => {
          return (
            <div className={style.delete_category} key={index}>
              <p>{item.name}</p>
              <button onClick={() => handleDeleteTheme(item._id)}>
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Tematicas</h1>
      </div>
    </div>
  );
};

export default CRUDTheme;
