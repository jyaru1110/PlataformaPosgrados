export default function Header(){
   return (
    <header className="w-full py-5 px-8 border shadow-header flex items-center justify-end space-x-5 sticky z-50">
      <span className="flex flex-col text-right">
        <span className="font-timesnr text-2xl text-primary">{localStorage.getItem("nombre")}</span>
        <span className="font-timesnr text-xl text-secondary">{localStorage.getItem("escuela")||localStorage.getItem("area")}</span>
      </span>
    <img
      className="rounded-full"
      height={55}
      width={55}
      src={localStorage.getItem("foto")}
    />
  </header>
   ); 
}