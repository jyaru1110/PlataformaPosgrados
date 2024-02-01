export default function ButtonAdd({ruta}) {
    if (localStorage.getItem("rol") == "Sólo lectura") return;
    return (
        <a href={ruta} className="font-poppins text-white items-center py-1 px-3 cursor-pointer bottom-50 md:bottom-0 md:relative shadow-[0px_1px_4px_rgba(0,0,0,0.25)] absolute bg-primary rounded-full justify-center flex content-center flex-wrap transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-300 md:mt-2 z-50">
            <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.7143 23.7857H23.7857V32.7143C23.7857 33.6964 22.9821 34.5 22 34.5C21.0179 34.5 20.2143 33.6964 20.2143 32.7143V23.7857H11.2857C10.3036 23.7857 9.5 22.9821 9.5 22C9.5 21.0179 10.3036 20.2143 11.2857 20.2143H20.2143V11.2857C20.2143 10.3036 21.0179 9.5 22 9.5C22.9821 9.5 23.7857 10.3036 23.7857 11.2857V20.2143H32.7143C33.6964 20.2143 34.5 21.0179 34.5 22C34.5 22.9821 33.6964 23.7857 32.7143 23.7857Z" fill="white"/>
            </svg>
            Crear servicios
        </a>
    );
    }