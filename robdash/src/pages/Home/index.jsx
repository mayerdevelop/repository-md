import { LayoutComponents } from "../../components/LayoutComponents";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Home = () => {

  const { singOut } = useContext(AuthContext);

  const handleSubmit = async () => {
    await singOut();
  };

  return (
    <LayoutComponents>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            <span style={{ color: "#fff" }}>Jovem Programador</span>
          </h1>
          <br />
          <br />
          <p style={{ color: "#f4f4f4" }} className="home-description">
            Aplicativo para auxiliar na organização de tarefas.
          </p>

          <form onSubmit={handleSubmit}>
          <button type="submit">sair</button>
          </form>
        </div>
      </div>
    </LayoutComponents>
  );
};
