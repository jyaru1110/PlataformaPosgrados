import { NavLink } from "react-router-dom";
export default function AdminNavLink({ section }) {
  return (
      <NavLink
        className={({ isActive }) => {
          return `${isActive && "bg-secondary"} rounded-xl flex items-center px-3 h-full`;
        }}
        to={`/micrositio/admin/${section}`}
      >
        <svg
          viewBox="0 0 682.66669 682.66669"
          xmlns="http://www.w3.org/2000/svg"
          height="23"
        >
          <defs>
            <clipPath clipPathUnits="userSpaceOnUse">
              <path d="M 0,512 H 512 V 0 H 0 Z" id="path171" />
            </clipPath>
          </defs>
          <g id="g165" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
            <g id="g167">
              <g id="g169" clipPath="url(#clipPath173)">
                <g id="g175" transform="translate(497,214.9204)">
                  <path
                    d="m 0,0 v 82.159 h -45.313 c -5.165,24.73 -14.903,47.777 -28.284,68.228 l 32.057,32.058 -58.095,58.095 -32.057,-32.058 c -20.451,13.381 -43.498,23.119 -68.228,28.285 v 45.313 h -82.16 v -45.313 c -24.73,-5.166 -47.777,-14.904 -68.228,-28.285 l -32.057,32.058 -58.095,-58.095 32.057,-32.058 c -13.381,-20.451 -23.119,-43.498 -28.284,-68.228 H -482 V 0 h 45.313 c 5.165,-24.73 14.903,-47.777 28.284,-68.228 l -32.057,-32.058 58.095,-58.095 32.057,32.058 c 20.451,-13.381 43.498,-23.119 68.228,-28.285 v -45.312 h 82.16 v 45.312 c 24.73,5.166 47.777,14.904 68.228,28.285 l 32.057,-32.058 58.095,58.095 -32.057,32.058 C -60.216,-47.777 -50.478,-24.73 -45.313,0 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="30"
                  />
                </g>
                <g id="g179" transform="translate(387,256)">
                  <path
                    d="m 0,0 c 0,-72.349 -58.651,-131 -131,-131 -72.349,0 -131,58.651 -131,131 0,72.349 58.651,131 131,131 C -58.651,131 0,72.349 0,0 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="30"
                  />
                </g>
                <g id="g183" transform="translate(301.1875,271.0625)">
                  <path
                    d="m 0,0 c 0,-24.956 -20.231,-45.188 -45.188,-45.188 -24.956,0 -45.187,20.232 -45.187,45.188 0,24.956 20.231,45.188 45.187,45.188 C -20.231,45.188 0,24.956 0,0 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="30"
                  />
                </g>
                <g id="g187" transform="translate(180.7077,148.8004)">
                  <path
                    d="m 0,0 c -0.013,0.586 -0.02,1.173 -0.02,1.762 0,41.594 33.718,75.313 75.312,75.313 41.594,0 75.313,-33.719 75.313,-75.313 0,-0.589 -0.007,-1.176 -0.02,-1.762"
                    fill="none"
                    stroke="white"
                    strokeWidth="30"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </NavLink>
  );
}
