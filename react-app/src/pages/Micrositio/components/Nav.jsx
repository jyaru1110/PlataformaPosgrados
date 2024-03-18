import { Link } from "react-router-dom";
import LogoPosgrados from "../../../assets/LogoPosgrados.png";

export default function Nav() {
  return (
    <nav className="h-screen w-1/6 border-grayborder border p-4 flex flex-col items-center">
      <img className="w-20 mb-10" src={LogoPosgrados}></img>
      <Link className="w-full flex text-xl items-center space-x-5" to="/micrositio">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 10.85H1.5C1.31591 10.85 1.15085 10.912 1.03143 11.0314C0.912017 11.1509 0.85 11.3159 0.85 11.5V18.5C0.85 18.6841 0.912017 18.8491 1.03143 18.9686C1.15085 19.088 1.31591 19.15 1.5 19.15H8.5C8.68409 19.15 8.84915 19.088 8.96857 18.9686C9.08798 18.8491 9.15 18.6841 9.15 18.5V11.5C9.15 11.3159 9.08798 11.1509 8.96857 11.0314C8.84915 10.912 8.68409 10.85 8.5 10.85ZM7.85 17.85H2.15V12.15H7.85V17.85ZM8.5 0.85H1.5C1.31591 0.85 1.15085 0.912017 1.03143 1.03143C0.912017 1.15085 0.85 1.31591 0.85 1.5V8.5C0.85 8.68409 0.912017 8.84915 1.03143 8.96857C1.15085 9.08798 1.31591 9.15 1.5 9.15H8.5C8.68409 9.15 8.84915 9.08798 8.96857 8.96857C9.08798 8.84915 9.15 8.68409 9.15 8.5V1.5C9.15 1.31591 9.08798 1.15085 8.96857 1.03143C8.84915 0.912017 8.68409 0.85 8.5 0.85ZM7.85 7.85H2.15V2.15H7.85V7.85ZM18.5 0.85H11.5C11.3159 0.85 11.1509 0.912017 11.0314 1.03143C10.912 1.15085 10.85 1.31591 10.85 1.5V8.5C10.85 8.68409 10.912 8.84915 11.0314 8.96857C11.1509 9.08798 11.3159 9.15 11.5 9.15H15H18.5C18.6841 9.15 18.8491 9.08798 18.9686 8.96857C19.088 8.84915 19.15 8.68409 19.15 8.5V1.5C19.15 1.31591 19.088 1.15085 18.9686 1.03143C18.8491 0.912017 18.6841 0.85 18.5 0.85ZM17.85 7.85H12.15V2.15H17.85V7.85ZM18.5 14.35H15.65V11.5C15.65 11.3159 15.588 11.1509 15.4686 11.0314C15.3491 10.912 15.1841 10.85 15 10.85C14.8159 10.85 14.6509 10.912 14.5314 11.0314C14.412 11.1509 14.35 11.3159 14.35 11.5V14.35H11.5C11.3159 14.35 11.1509 14.412 11.0314 14.5314C10.912 14.6509 10.85 14.8159 10.85 15C10.85 15.1841 10.912 15.3491 11.0314 15.4686C11.1509 15.588 11.3159 15.65 11.5 15.65H14.35V18.5C14.35 18.6841 14.412 18.8491 14.5314 18.9686C14.6509 19.088 14.8159 19.15 15 19.15C15.1841 19.15 15.3491 19.088 15.4686 18.9686C15.588 18.8491 15.65 18.6841 15.65 18.5V15.65H18.5C18.6841 15.65 18.8491 15.588 18.9686 15.4686C19.088 15.3491 19.15 15.1841 19.15 15C19.15 14.8159 19.088 14.6509 18.9686 14.5314C18.8491 14.412 18.6841 14.35 18.5 14.35Z" fill="black" stroke="black" strokeWidth="0.3"/>
        </svg>
        <p>Micrositio</p>
      </Link>
      <h6 className="w-full mt-3 opacity-50 font-extralight">Admin</h6>
      <Link className="w-full flex text-xl items-center space-x-5 mt-1" to="/micrositio/admin/programas">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16665 18.3333C3.70641 18.3333 3.33331 17.9603 3.33331 17.5V2.50001C3.33331 2.03977 3.70641 1.66667 4.16665 1.66667H15.8333C16.2936 1.66667 16.6666 2.03977 16.6666 2.50001V17.5C16.6666 17.9603 16.2936 18.3333 15.8333 18.3333H4.16665Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.75 9.16667V1.66667H13.75V9.16667L11.25 6.55305L8.75 9.16667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16669 1.66667H15.8334" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Programas</p>
      </Link>
      <Link className="w-full flex text-xl items-center space-x-5 mt-3" to="/micrositio/admin/personas">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.33334C11.841 8.33334 13.3334 6.84095 13.3334 5.00001C13.3334 3.15906 11.841 1.66667 10 1.66667C8.15907 1.66667 6.66669 3.15906 6.66669 5.00001C6.66669 6.84095 8.15907 8.33334 10 8.33334Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 18.3333C17.5 14.1912 14.1421 10.8333 10 10.8333C5.85787 10.8333 2.5 14.1912 2.5 18.3333" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Personas</p>
      </Link>
    </nav>
  );
}
