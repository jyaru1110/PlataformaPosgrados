import ProximoServicio from "./components/ProximoServicio";
import BarDiasSemana from "./components/BarDiasSemana";
import Footer from "./components/Footer";
export default function HomeGestor() {
    return (
      <>
        <div className="w-11/12 m-auto sm:flex sm:w-full sm:items-start">
          <ProximoServicio />  
          <BarDiasSemana />
        </div>
        <Footer />
      </>
    );
  }