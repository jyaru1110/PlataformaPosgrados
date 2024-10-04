import { useEffect } from "react";

export default function useSearchKey(ref) {
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
        if(e.key === "/"){
            ref.current.focus();
            e.preventDefault();
        }
    });
  }, []);
}
