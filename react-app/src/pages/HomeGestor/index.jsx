import ProximoServicio from "./components/ProximoServicio";
export default function HomeGestor() {
    return (
      <>
        <div className="w-11/12 m-auto">
          <p className = "ml-1 font-poppins text-[12px]" >Próximo coffe break</p>
          <ProximoServicio />
        </div>
      </>
    );
  }