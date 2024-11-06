import { Link,NavLink } from "react-router-dom";
import LogoPosgrados from "../../../assets/logoposgrados_bitly_blanco.png";

export default function Nav() {
  return (
    <div className="h-screen w-1/6 p-4 flex text-white flex-col items-center bg-primary font-timesnr font-light space-y-2.5">
      <img className="w-20 mb-20" src={LogoPosgrados}></img>
      <NavLink className={({ isActive, isPending }) =>{
        return `w-full flex text-xl items-center space-x-4 rounded-3xl pl-5 py-2 ${isActive && 'bg-secondary'}`
      }} to="/micrositio/programas">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16665 18.3333C3.70641 18.3333 3.33331 17.9603 3.33331 17.5V2.50001C3.33331 2.03977 3.70641 1.66667 4.16665 1.66667H15.8333C16.2936 1.66667 16.6666 2.03977 16.6666 2.50001V17.5C16.6666 17.9603 16.2936 18.3333 15.8333 18.3333H4.16665Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.75 9.16667V1.66667H13.75V9.16667L11.25 6.55305L8.75 9.16667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16669 1.66667H15.8334" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Programas</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>{
        return `w-full flex text-xl items-center space-x-4 rounded-3xl pl-5 py-2 ${isActive && 'bg-secondary'}`
      }} to="/micrositio/admin/directorio">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.33334C11.841 8.33334 13.3334 6.84095 13.3334 5.00001C13.3334 3.15906 11.841 1.66667 10 1.66667C8.15907 1.66667 6.66669 3.15906 6.66669 5.00001C6.66669 6.84095 8.15907 8.33334 10 8.33334Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 18.3333C17.5 14.1912 14.1421 10.8333 10 10.8333C5.85787 10.8333 2.5 14.1912 2.5 18.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Directorio</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>{
        return `w-full flex text-xl items-center space-x-4 rounded-3xl pl-5 py-2 ${isActive && 'bg-secondary'}`
      }} to="/micrositio/admin/dashboard">
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 12C2.5 17.2467 6.7533 21.5 12 21.5V13C12 12.4477 12.4477 12 13 12H21.5C21.5 6.7533 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.7533 2.5 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 15H15V21H21V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>Dashboard</p>
      </NavLink>
      <NavLink className={({ isActive, isPending }) =>{
        return `w-full flex text-xl items-center space-x-4 rounded-3xl pl-5 py-2 ${isActive && 'bg-secondary'}`
      }} to="/micrositio/admin/metas">
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4C9.61554 4 8.26216 4.41054 7.11101 5.17971C5.95987 5.94888 5.06266 7.04213 4.53285 8.32122C4.00303 9.6003 3.86441 11.0078 4.13451 12.3656C4.4046 13.7235 5.07129 14.9708 6.05026 15.9497C7.02922 16.9287 8.27651 17.5954 9.63437 17.8655C10.9922 18.1356 12.3997 17.997 13.6788 17.4672C14.9579 16.9373 16.0511 16.0401 16.8203 14.889C17.5895 13.7378 18 12.3845 18 11C18 9.14348 17.2625 7.36301 15.9498 6.05025C14.637 4.7375 12.8565 4 11 4ZM11 16C10.0111 16 9.0444 15.7068 8.22215 15.1573C7.39991 14.6079 6.75905 13.827 6.38061 12.9134C6.00217 11.9998 5.90315 10.9945 6.09608 10.0245C6.289 9.05464 6.76521 8.16373 7.46447 7.46447C8.16373 6.7652 9.05465 6.289 10.0246 6.09607C10.9945 5.90315 11.9998 6.00216 12.9134 6.3806C13.8271 6.75904 14.6079 7.3999 15.1574 8.22215C15.7068 9.04439 16 10.0111 16 11C16 12.3261 15.4732 13.5979 14.5355 14.5355C13.5979 15.4732 12.3261 16 11 16ZM11 8C10.4067 8 9.82664 8.17595 9.33329 8.50559C8.83995 8.83524 8.45543 9.30377 8.22837 9.85195C8.0013 10.4001 7.94189 11.0033 8.05765 11.5853C8.1734 12.1672 8.45913 12.7018 8.87868 13.1213C9.29824 13.5409 9.83279 13.8266 10.4147 13.9424C10.9967 14.0581 11.5999 13.9987 12.1481 13.7716C12.6962 13.5446 13.1648 13.1601 13.4944 12.6667C13.8241 12.1734 14 11.5933 14 11C14 10.2044 13.6839 9.44129 13.1213 8.87868C12.5587 8.31607 11.7957 8 11 8ZM11 12C10.8022 12 10.6089 11.9414 10.4444 11.8315C10.28 11.7216 10.1518 11.5654 10.0761 11.3827C10.0004 11.2 9.98063 10.9989 10.0192 10.8049C10.0578 10.6109 10.153 10.4327 10.2929 10.2929C10.4328 10.153 10.6109 10.0578 10.8049 10.0192C10.9989 9.98063 11.2 10.0004 11.3827 10.0761C11.5654 10.1518 11.7216 10.28 11.8315 10.4444C11.9414 10.6089 12 10.8022 12 11C12 11.2652 11.8946 11.5196 11.7071 11.7071C11.5196 11.8946 11.2652 12 11 12ZM11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476617 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3166 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C22 8.08262 20.8411 5.28473 18.7782 3.22183C16.7153 1.15893 13.9174 0 11 0ZM11 20C9.21997 20 7.47992 19.4722 5.99987 18.4832C4.51983 17.4943 3.36628 16.0887 2.68509 14.4442C2.0039 12.7996 1.82567 10.99 2.17294 9.24419C2.5202 7.49836 3.37737 5.89471 4.63604 4.63604C5.89472 3.37737 7.49836 2.5202 9.24419 2.17293C10.99 1.82567 12.7996 2.0039 14.4442 2.68508C16.0887 3.36627 17.4943 4.51983 18.4832 5.99987C19.4722 7.47991 20 9.21997 20 11C20 13.3869 19.0518 15.6761 17.364 17.364C15.6761 19.0518 13.387 20 11 20Z" fill="white"/>
        </svg>
        <p>Metas</p>
      </NavLink>
    </div>
  );
}
