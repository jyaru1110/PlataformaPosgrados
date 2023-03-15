import ProximoServicio from "./components/ProximoServicio";
import BarDiasSemana from "./components/BarDiasSemana";
import Footer from "./components/Footer";
export default function HomeGestor() {
    return (
      <>
        <div className="w-11/12 m-auto">
          <p className = "ml-1 font-poppins text-[12px]" >Próximo coffe break</p>
          <ProximoServicio />
          <BarDiasSemana />
        </div>
        <Footer />
      </>
    );
  }