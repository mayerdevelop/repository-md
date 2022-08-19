import { LayoutComponents } from "../../components/LayoutComponents";
import Header from '../../components/Header'
import Aside from '../../components/Aside'


export const Home = () => {

  return (
    <LayoutComponents>
      <Aside />
      <Header />
      <div className="home-container">

      </div>
    </LayoutComponents>
  );
};
