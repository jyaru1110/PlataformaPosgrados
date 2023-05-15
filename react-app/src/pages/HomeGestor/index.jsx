import ProximoServicio from "./components/ProximoServicio";
import BarDiasSemana from "./components/BarDiasSemana";
import Footer from "./components/Footer";
export default function HomeGestor() {
    return (
      <>
        <div className="w-11/12 m-auto md:flex md:w-full md:items-start h-screen">
          <ProximoServicio />  
          <BarDiasSemana />
        </div>
        <Footer />
      </>
    );
  }