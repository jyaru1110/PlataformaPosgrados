import LogoUP from "../../assets/logoposgrados_bitly_blanco.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-primary justify-center">
      <img src={LogoUP} className="h-24 w-24"></img>
      <h1 className="text-white text-lg font-serif text-center">Bienvenido a posgrados de la Universidad Panamericana</h1>
      <a href="https://posgrados-panamericana.up.edu.mx/" className="flex justify-center items-center w-[245px] h-[36px] bg-secondary text-white text-sm rounded-[18px] mt-4">Conoce la oferta de Posgrados</a>
      <a href="/home" className="flex justify-center items-center w-[245px] h-[36px] bg-secondary text-white text-sm rounded-[18px] mt-4">Ingresa al micrositio de Posgrados</a>
    </div>
  );
}
