import Header from "../../components/Header";
import Main from "../../../components/Main";
import { Link, useParams } from "react-router-dom";
import { useProyecto } from "../../../../../hooks/useProyectos";
import Error from "../../../components/Error";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, linkPlugin, linkDialogPlugin, CreateLink, BlockTypeSelect, InsertTable, tablePlugin,listsPlugin,markdownShortcutPlugin,headingsPlugin, ListsToggle,quotePlugin, frontmatterPlugin} from '@mdxeditor/editor'
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const domainImage = import.meta.env.VITE_IMAGE_DOMAIN;

export default function ProyectoAdmin() {
  const {id} = useParams();
  const {loading,proyecto,error} = useProyecto(id);
  const {register, handleSubmit} = useForm();
  const mdRef = useRef(null);

  const [pinned, setPinned] = useState();

  const [newFechas, setNewFechas] = useState([]);
  const [changesFechas, setChangesFechas] = useState({})

  const [newSecciones, setNewSecciones] = useState([]);
  const [changesSecciones, setChangesSecciones] = useState({})
  const [changesEnlaces, setChangesEnlaces] = useState({})

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [stringFile, setStringFile] = useState(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const genStringFile = URL.createObjectURL(e.target.files[0]);
      console.log(genStringFile);
      setStringFile(genStringFile);
    }
  };

  const onSubmit = (data) => {
    data.caracteristicas = mdRef.current.getMarkdown();
    data.newFechas = newFechas;
    data.changesFechas = changesFechas; 
    data.newSecciones = newSecciones;
    data.changesSecciones = changesSecciones;
    data.changesEnlaces = changesEnlaces;


    if (file){
      const formData = new FormData();
      formData.append("file", file);
      axios.post(import.meta.env.VITE_URL_API+"/proyecto/foto/"+id,formData,{withCredentials:true, headers: { 'Content-Type': 'multipart/form-data' }})
      .then((res)=>{
        toast.success("Foto actualizada correctamente");
      })
      .catch((e)=>{
        console.log(e);
        toast.error("Error al actualizar la foto del proyecto")
      })
    }

    axios.put(import.meta.env.VITE_URL_API+"/proyecto/"+id,data,{withCredentials:true})
    .then((res)=>{
        toast.success("Proyecto actualizado correctamente");
    })
    .catch((e)=>{
        console.log(e);
        toast.error("Error al actualizar proyecto")
    })
  } 
                
  const updateFechas = (index,field,value) => {
    const newFechasCopy = [...newFechas];
    newFechasCopy[index][field] = value;
    setNewFechas(newFechasCopy);
  }

  const addChangesFechas = (id,field,value) =>{
    const currentFechas = changesFechas;
    if (currentFechas[id]){
        currentFechas[id][field] = value;
        setChangesFechas(currentFechas);
        return
    }
    currentFechas[id] ={};
    currentFechas[id][field] = value;
    setChangesFechas(currentFechas)
    return;
  }

  const onDelete = () => {
    axios.delete(import.meta.env.VITE_URL_API+"/proyecto/"+id,{withCredentials:true})
    .then((res)=>{
        toast.success("Proyecto eliminado correctamente");
    })
    .catch((e)=>{
        console.log(e);
        toast.error("Error al eliminar proyecto")
    })
  }

  const updateNewSecciones = (index,field,value) => {
    const newSeccionesCopy = [...newSecciones];
    newSeccionesCopy[index][field] = value;
    setNewSecciones(newSeccionesCopy);
  }
  
  const updateNewEnlaces = (index_seccion, index_index,field,value) => {
    const newSeccionesCopy = [...newSecciones];
    newSeccionesCopy[index_seccion].links[index_index][field] = value;
    setNewSecciones(newSeccionesCopy);
  }

  const addChangesSecciones = (id,field,value) =>{
    const currentSecciones = changesSecciones;
    if (currentSecciones[id]){
        currentSecciones[id][field] = value;
        setChangesSecciones(currentSecciones);
        return
    }
    currentSecciones[id] ={};
    currentSecciones[id][field] = value;
    setChangesSecciones(currentSecciones)
  }

  const addChangesEnlaces = (id_link,field,value) => {
    const currentEnlaces = changesEnlaces;
    if (currentEnlaces[id_link]){
      currentEnlaces[id_link][field] = value;
      setChangesEnlaces(currentEnlaces);
      return
    }
    currentEnlaces[id_link] ={};
    currentEnlaces[id_link][field] = value;
    setChangesEnlaces(currentEnlaces)
  }

  const deleteSeccion = async (id) => {
    await axios.delete(import.meta.env.VITE_URL_API+"/proyecto/seccion/"+id,{withCredentials:true})
    .then((res)=>{
        toast.success("Sección eliminada correctamente");
    })
    .catch((e)=>{
        console.log(e);
        toast.error("Error al eliminar sección")
    })
  }

  useEffect(()=>{
    if (proyecto){
      setPinned(proyecto.pinned);
    }
  },[proyecto])

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
            <Error err={error}></Error>
      </div>
    )}

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header title="Editar proyecto">
        <button
            type="submit"
            form="formUpdateProyecto"
            className="py-3 px-3 hover:bg-gray-100 rounded-lg"
        >
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M19.7328 4.99962C18.9989 3.33099 17.7323 1.94649 16.1271 1.05827C14.5219 0.170059 12.6666 -0.172873 10.8456 0.0820302C9.02452 0.336933 7.33819 1.17561 6.04496 2.46954C4.75173 3.76347 3.92295 5.44128 3.68561 7.24586C2.54043 7.51722 1.53584 8.19527 0.862625 9.15123C0.189406 10.1072 -0.105557 11.2745 0.0337506 12.4315C0.173058 13.5885 0.736934 14.6545 1.6183 15.4272C2.49966 16.1999 3.63712 16.6255 4.81468 16.623C5.13325 16.623 5.43876 16.4978 5.66402 16.2749C5.88927 16.052 6.01582 15.7497 6.01582 15.4345C6.01582 15.1193 5.88927 14.817 5.66402 14.5942C5.43876 14.3713 5.13325 14.2461 4.81468 14.2461C4.17756 14.2461 3.56653 13.9956 3.11602 13.5499C2.6655 13.1041 2.41241 12.4995 2.41241 11.8691C2.41241 11.2387 2.6655 10.6341 3.11602 10.1883C3.56653 9.74253 4.17756 9.4921 4.81468 9.4921C5.13325 9.4921 5.43876 9.36689 5.66402 9.144C5.88927 8.92112 6.01582 8.61882 6.01582 8.30362C6.01889 6.89797 6.52545 5.5389 7.4455 4.46787C8.36555 3.39684 9.63952 2.6832 11.0411 2.45373C12.4426 2.22426 13.881 2.49382 15.1007 3.21452C16.3204 3.93523 17.2424 5.0604 17.7029 6.39015C17.7716 6.59438 17.895 6.77633 18.06 6.91657C18.225 7.05682 18.4254 7.15009 18.6398 7.18644C19.4398 7.33603 20.1651 7.74931 20.6974 8.35892C21.2297 8.96853 21.5376 9.73855 21.571 10.5435C21.6045 11.3484 21.3614 12.1408 20.8815 12.7916C20.4015 13.4424 19.713 13.9132 18.9281 14.1272C18.6191 14.206 18.3543 14.403 18.1922 14.675C18.03 14.9469 17.9836 15.2714 18.0632 15.5772C18.1429 15.8829 18.342 16.1448 18.6168 16.3053C18.8916 16.4658 19.2196 16.5117 19.5286 16.4329C20.7927 16.1024 21.9132 15.3727 22.7201 14.3548C23.5269 13.3368 23.976 12.0861 23.9991 10.7926C24.0222 9.49915 23.618 8.23355 22.8481 7.18801C22.0781 6.14247 20.9843 5.37411 19.7328 4.99962ZM12.8743 7.45979C12.7601 7.35159 12.6254 7.26677 12.4779 7.21021C12.1855 7.09134 11.8575 7.09134 11.5651 7.21021C11.4176 7.26677 11.2829 7.35159 11.1687 7.45979L7.56529 11.0253C7.33911 11.249 7.21205 11.5526 7.21205 11.8691C7.21205 12.1856 7.33911 12.4891 7.56529 12.7129C7.79147 12.9367 8.09823 13.0624 8.4181 13.0624C8.73796 13.0624 9.04473 12.9367 9.27091 12.7129L10.8204 11.1679V17.8115C10.8204 18.1267 10.9469 18.429 11.1722 18.6519C11.3974 18.8748 11.703 19 12.0215 19C12.3401 19 12.6456 18.8748 12.8708 18.6519C13.0961 18.429 13.2227 18.1267 13.2227 17.8115V11.1679L14.7721 12.7129C14.8838 12.8243 15.0166 12.9127 15.163 12.9731C15.3094 13.0334 15.4664 13.0645 15.6249 13.0645C15.7835 13.0645 15.9405 13.0334 16.0869 12.9731C16.2332 12.9127 16.3661 12.8243 16.4777 12.7129C16.5903 12.6024 16.6797 12.471 16.7407 12.3261C16.8016 12.1813 16.833 12.026 16.833 11.8691C16.833 11.7122 16.8016 11.5568 16.7407 11.412C16.6797 11.2672 16.5903 11.1357 16.4777 11.0253L12.8743 7.45979Z" fill="black" /> </svg>
        </button>
        <button
            className="py-2 px-3 hover:bg-gray-100 rounded-lg"
              onClick={() => {
                onDelete();
              }}
            >
              <svg width="28" height="28" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M18.9063 9.52575L18.5938 18.9843C18.5671 19.7944 18.2259 20.5622 17.6424 21.1248C17.059 21.6874 16.2793 22.0005 15.4688 21.9976H9.53126C8.72127 22.0005 7.942 21.6879 7.35863 21.1259C6.77527 20.564 6.43367 19.797 6.40626 18.9875L6.09376 9.52575C6.08692 9.31855 6.16267 9.11712 6.30435 8.96577C6.44603 8.81443 6.64202 8.72556 6.84922 8.71872C7.05643 8.71188 7.25786 8.78764 7.4092 8.92931C7.56055 9.07099 7.64942 9.26699 7.65626 9.47419L7.96876 18.9351C7.98432 19.339 8.15578 19.7212 8.44714 20.0013C8.73849 20.2814 9.12707 20.4378 9.53126 20.4375H15.4688C15.8735 20.4377 16.2625 20.281 16.5539 20.0002C16.8454 19.7194 17.0165 19.3364 17.0313 18.932L17.3438 9.47419C17.3506 9.26699 17.4395 9.07099 17.5908 8.92931C17.7422 8.78764 17.9436 8.71188 18.1508 8.71872C18.358 8.72556 18.554 8.81443 18.6957 8.96577C18.8373 9.11712 18.9131 9.31855 18.9063 9.52575ZM19.9398 6.3781C19.9398 6.5853 19.8575 6.78401 19.711 6.93052C19.5645 7.07704 19.3658 7.15935 19.1586 7.15935H5.84219C5.63499 7.15935 5.43628 7.07704 5.28977 6.93052C5.14325 6.78401 5.06094 6.5853 5.06094 6.3781C5.06094 6.17089 5.14325 5.97218 5.28977 5.82567C5.43628 5.67916 5.63499 5.59685 5.84219 5.59685H8.26407C8.51161 5.59751 8.75054 5.50606 8.93437 5.34028C9.11819 5.1745 9.23377 4.94626 9.2586 4.69997C9.31625 4.12223 9.58693 3.58664 10.0179 3.19756C10.4489 2.80847 11.0092 2.59377 11.5898 2.59528H13.4102C13.9908 2.59377 14.5512 2.80847 14.9821 3.19756C15.4131 3.58664 15.6838 4.12223 15.7414 4.69997C15.7662 4.94626 15.8818 5.1745 16.0656 5.34028C16.2495 5.50606 16.4884 5.59751 16.7359 5.59685H19.1578C19.365 5.59685 19.5637 5.67916 19.7102 5.82567C19.8568 5.97218 19.9398 6.17089 19.9398 6.3781ZM10.6148 5.59685H14.3867C14.2841 5.36227 14.2169 5.11371 14.1875 4.85935C14.1682 4.66677 14.078 4.48824 13.9345 4.35834C13.7911 4.22844 13.6045 4.15641 13.4109 4.15622H11.5906C11.3971 4.15641 11.2105 4.22844 11.067 4.35834C10.9236 4.48824 10.8334 4.66677 10.8141 4.85935C10.7844 5.11375 10.7178 5.36231 10.6148 5.59685ZM11.4016 17.4336V10.7812C11.4016 10.574 11.3193 10.3753 11.1727 10.2288C11.0262 10.0823 10.8275 9.99997 10.6203 9.99997C10.4131 9.99997 10.2144 10.0823 10.0679 10.2288C9.92138 10.3753 9.83907 10.574 9.83907 10.7812V17.4367C9.83907 17.6439 9.92138 17.8426 10.0679 17.9891C10.2144 18.1356 10.4131 18.2179 10.6203 18.2179C10.8275 18.2179 11.0262 18.1356 11.1727 17.9891C11.3193 17.8426 11.4016 17.6439 11.4016 17.4367V17.4336ZM15.1625 17.4336V10.7812C15.1625 10.574 15.0802 10.3753 14.9337 10.2288C14.7872 10.0823 14.5885 9.99997 14.3813 9.99997C14.1741 9.99997 13.9753 10.0823 13.8288 10.2288C13.6823 10.3753 13.6 10.574 13.6 10.7812V17.4367C13.6 17.6439 13.6823 17.8426 13.8288 17.9891C13.9753 18.1356 14.1741 18.2179 14.3813 18.2179C14.5885 18.2179 14.7872 18.1356 14.9337 17.9891C15.0802 17.8426 15.1625 17.6439 15.1625 17.4367V17.4336Z" fill="black" /> </svg>
        </button>
      </Header>
      <Main>
        <Link
          className="bg-primary text-white px-4 py-2 rounded-3xl text-sm flex items-center w-fit"
          to={"/micrositio/admin/proyectos"}
        >
            <svg className="mr-1.5" xmlns="http://www.w3.org/2000/svg" width="15" height="12.931" viewBox="0 0 15 12.931"><defs><clipPath id="a"><path data-name="Trazado 103" d="M6.422 0a1.3 1.3 0 0 0-.872.379L.379 5.552a1.294 1.294 0 0 0 0 1.829l5.171 5.171a1.294 1.294 0 0 0 1.829-1.829L4.415 7.759h9.292a1.293 1.293 0 1 0 0-2.586H4.415l2.964-2.966A1.294 1.294 0 0 0 6.507 0Z" fill="#fff"/></clipPath></defs><g data-name="Grupo 221"><g data-name="Grupo 220" clipPath="url(#a)"><path data-name="Rectángulo 102" fill="#fff" d="M-.126 0H15v13.057H-.126z"/></g></g></svg>
            Regresar a proyectos
        </Link>
        {
            loading ? <div className="w-full h-screen flex items-center justify-center"><div className="loader"></div></div>:
        <form id="formUpdateProyecto" onSubmit={handleSubmit(onSubmit)} className="w-full flex">
          <div className="w-[70%] bg-white shadow-header rounded-xl mt-6">
          <input
            type="file"
            id="input-file-upload"
            className="hidden"
            onChange={handleChange}
            accept=".jpeg,.jpg,.png"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onDragOver={handleDrag}
              className={`h-36 rounded-t-xl bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center relative cursor-pointer border-dashed border-2 ${(dragging || file) && "border-primary"}`} style={{backgroundImage:"url("+(stringFile?stringFile:(domainImage+proyecto?.foto))+")"}}
            >
              <p className={`font-medium ${dragging ? " text-primary " : ""}`}>
                {file?.name ? (
                  <span className="font-bold text-primary">{file.name}</span>
                ) : (
                  <>
                    {dragging
                      ? "SUELTALO AQUÍ"
                      : "ARRASTRA UN ARCHIVO O DA CLICK AQUÍ"}
                  </>
                )}
              </p>
              {file?.name ? (
                <button
                  className="text-primary underline"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                    setStringFile(null);
                  }}
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </label>
            <div className="p-10">
              <div className="flex space-x-5 items-center mb-5">
                <label htmlFor="pinned" className="relative mb-2">
                  {
                    pinned ?
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 10.1C22.1 9.6 21.7 9 21.2 9L15.5 8.2L12.9 3C12.8 2.8 12.7 2.7 12.5 2.6C12 2.3 11.4 2.5 11.1 3L8.6 8.2L2.9 9C2.6 9 2.4 9.1 2.3 9.3C1.9 9.7 1.9 10.3 2.3 10.7L6.4 14.7L5.4 20.4C5.4 20.6 5.4 20.8 5.5 21C5.8 21.5 6.4 21.7 6.9 21.4L12 18.7L17.1 21.4C17.2 21.5 17.4 21.5 17.6 21.5C17.7 21.5 17.7 21.5 17.8 21.5C18.3 21.4 18.7 20.9 18.6 20.3L17.6 14.6L21.7 10.6C21.9 10.5 22 10.3 22 10.1Z" fill="#B9975B"/>
                    </svg> :
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.9189 10.1265C21.9992 9.5797 21.621 9.0714 21.0742 8.99114L15.4228 8.16497L12.8975 3.01848C12.8065 2.8615 12.676 2.73113 12.5189 2.64037C12.0229 2.35369 11.3883 2.52336 11.1016 3.01946L8.57715 8.16497L2.92578 8.9912C2.70971 9.02288 2.51001 9.12444 2.35699 9.28026C1.96985 9.67461 1.97577 10.3082 2.37011 10.6953L6.46289 14.708L5.49707 20.3721C5.48791 20.4263 5.48321 20.4811 5.48309 20.5362C5.48157 21.0896 5.92895 21.5395 6.48242 21.541C6.64557 21.5408 6.80621 21.5005 6.95019 21.4238L12 18.7539L17.0488 21.4228C17.244 21.5264 17.4678 21.5625 17.6856 21.5254C18.2298 21.4325 18.5957 20.9162 18.5029 20.3721L17.5371 14.708L21.6309 10.6943C21.7861 10.5414 21.8873 10.3421 21.9189 10.1265ZM16.6504 14.1767C16.5333 14.2916 16.4797 14.4563 16.5068 14.6181L17.5166 20.539L12.2334 17.746C12.0871 17.6698 11.9129 17.6698 11.7666 17.746L6.4834 20.54L7.4931 14.6182C7.52026 14.4564 7.46667 14.2916 7.34955 14.1767L3.07025 9.98143L8.98236 9.11718C9.14563 9.09276 9.2865 8.98986 9.35937 8.84178L12 3.46001L14.6406 8.84172C14.7134 8.9898 14.8544 9.0927 15.0176 9.11711L20.9307 9.9804L16.6504 14.1767Z" fill="#B9975B"/>
                    </svg>
                  }
                  
                </label> 
                <input id="pinned" type="checkbox" {...register("pinned")} className="opacity-0 absolute top-0 left-0" onChange={(e)=>{setPinned(e.target.checked)}} defaultChecked={proyecto.pinned}></input>
                <input {...register("nombre",{required:true})} className="font-timesnr text-5xl border-b border-b-transparent hover:border-b-emerald-700 w-full" type="text" placeholder="Titulo del proyecto" defaultValue={proyecto.nombre}/>
              </div>

              <label htmlFor="categoria" className="ml-1 font-medium">Categoría:</label>
              <select  id="categoria" {...register("categoria")} className="font-light w-full border p-4 rounded-lg" defaultValue={proyecto.categoria||""}>
                <option value="promocion">Promoción</option>
                <option value="">Ninguna</option>
              </select>
              <div className="bg-secondary h-[1px] mb-8 mt-4"></div>
              <textarea defaultValue={proyecto.descripcion} {...register("descripcion")} className="font-light w-full border p-4 rounded-lg" placeholder="Escribe la descripción del proyecto"></textarea>
              <MDXEditor
                markdown={proyecto?.caracteristicas}
                contentEditableClassName="prose"
                ref={mdRef}
                plugins={[
                  frontmatterPlugin(),
                  headingsPlugin(),
                  quotePlugin(),
                  markdownShortcutPlugin(),
                  listsPlugin(),
                  tablePlugin(),
                  linkDialogPlugin(),
                  linkPlugin(),
                  toolbarPlugin({
                  toolbarContents: () => (
                      <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                          <CreateLink/>
                          <BlockTypeSelect/>
                          <InsertTable/>
                          <ListsToggle/>
                      </>
                  )})
                ]}
              />
            </div>
          </div>
          <div className="pl-5 mt-6 w-[30%]">
            <div className="border border-secondary w-full py-5 flex flex-col justify-between items-center bg-[#FBF9F6] rounded-md shadow-header">
                <h4 className="font-timesnr text-secondary text-2xl flex items-center">
                    <svg id="Grupo_69" data-name="Grupo 69" className="mr-2.5 -mt-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="21.217" height="21.524" viewBox="0 0 21.217 21.524"> <defs> <clipPath id="clip-path"> <rect id="Rectángulo_22" data-name="Rectángulo 22" width="21.217" height="21.524" fill="#b9975b"/> </clipPath> </defs> <g id="Grupo_66" data-name="Grupo 66" transform="translate(0 0)" clipPath="url(#clip-path)"> <path id="Trazado_44" data-name="Trazado 44" d="M20.971,4.543a1.489,1.489,0,0,0,1.493-1.49V1.493a1.493,1.493,0,1,0-2.985,0v1.56a1.489,1.489,0,0,0,1.492,1.489" transform="translate(-5.082 0)" fill="#b9975b"/> <path id="Trazado_45" data-name="Trazado 45" d="M21.194,3.481H18.188V4.24a2.272,2.272,0,1,1-4.545,0V3.481H7.579V4.24a2.273,2.273,0,1,1-4.546,0V3.481L0,3.443V22.422H19.7l1.514,0ZM19.7,20.911H1.517V8.786H19.7V20.911Z" transform="translate(0 -0.898)" fill="#b9975b"/> <path id="Trazado_46" data-name="Trazado 46" d="M6.62,4.543a1.49,1.49,0,0,0,1.494-1.49V1.493a1.493,1.493,0,1,0-2.985,0v1.56A1.487,1.487,0,0,0,6.62,4.543" transform="translate(-1.338 0)" fill="#b9975b"/> <rect id="Rectángulo_11" data-name="Rectángulo 11" width="2.388" height="2.108" transform="translate(7.583 9.515)" fill="#b9975b"/> <rect id="Rectángulo_12" data-name="Rectángulo 12" width="2.39" height="2.108" transform="translate(11.445 9.515)" fill="#b9975b"/> <rect id="Rectángulo_13" data-name="Rectángulo 13" width="2.388" height="2.108" transform="translate(15.026 9.515)" fill="#b9975b"/> <rect id="Rectángulo_14" data-name="Rectángulo 14" width="2.388" height="2.107" transform="translate(7.583 13.015)" fill="#b9975b"/> <rect id="Rectángulo_15" data-name="Rectángulo 15" width="2.39" height="2.107" transform="translate(11.445 13.015)" fill="#b9975b"/> <rect id="Rectángulo_16" data-name="Rectángulo 16" width="2.388" height="2.107" transform="translate(15.026 13.015)" fill="#b9975b"/> <rect id="Rectángulo_17" data-name="Rectángulo 17" width="2.388" height="2.107" transform="translate(7.583 16.585)" fill="#b9975b"/> <rect id="Rectángulo_18" data-name="Rectángulo 18" width="2.387" height="2.107" transform="translate(3.79 13.015)" fill="#b9975b"/> <rect id="Rectángulo_19" data-name="Rectángulo 19" width="2.387" height="2.107" transform="translate(3.79 16.585)" fill="#b9975b"/> <rect id="Rectángulo_20" data-name="Rectángulo 20" width="2.39" height="2.107" transform="translate(11.445 16.585)" fill="#b9975b"/> <rect id="Rectángulo_21" data-name="Rectángulo 21" width="2.388" height="2.107" transform="translate(15.026 16.585)" fill="#b9975b"/> </g> </svg>
                    Calendario
                </h4>
                {
                  proyecto?.fecha_proyectos?.map((fecha_proyecto)=>{
                    return(
                  <span key={fecha_proyecto.id} className="text-center my-4 text-base flex flex-col">
                    <input className="border-b border-b-transparent hover:border-b-secondary text-secondary" onChange={(e)=>{addChangesFechas(fecha_proyecto.id,"titulo",e.target.value)}} defaultValue={fecha_proyecto.titulo}/>
                    <input className="font-light border-b border-b-transparent hover:border-b-secondary" onChange={(e)=>{addChangesFechas(fecha_proyecto.id,"fecha",e.target.value)}} defaultValue={fecha_proyecto.fecha}/>
                  </span>)
                  })
                }
                {
                    newFechas.map((fecha,index)=>{
                    return( 
                        <span className="text-center my-4 text-base flex flex-col">
                            <input onChange={(e)=>updateFechas(index,"titulo",e.target.value)} className=" text-secondary border-b border-b-transparent hover:border-b-secondary" placeholder="titulo de la fecha"/>
                            <input onChange={(e)=>updateFechas(index,"fecha",e.target.value)} className="font-light border-b-transparent border-b hover:border-b-secondary" placeholder="fecha"/>
                        </span>
                    )
                    })
                }
                <button
                    onClick={()=>{
                        setNewFechas([...newFechas,{titulo:"",fecha:"",proyectoId:id}])
                    }}
                 type="button" className="text-secondary mt-3 px-3 py-2 hover:bg-secondary/10 rounded-md">
                    + Agrega una fecha
                </button>
            </div>
            {
              (newSecciones.length > 0 || proyecto.seccions?.length > 0) &&
            <div className="mt-6 bg-white py-6 px-5 rounded-lg shadow-header space-y-6">
               {
                proyecto.seccions?.map((seccion,index_seccion)=>{
                    return(
                      <div key={index_seccion} className="hover:bg-secondary/10 p-2 rounded-md">
                        <span className="flex justify-between space-x-2">
                          <input defaultValue={seccion.titulo} onChange={(e)=>{addChangesSecciones(seccion.id,"titulo",e.target.value)}} className="border-b border-secondary font-timesnr text-secondary text-xl w-full" placeholder="Escribe el titulo de la sección"></input>
                          <button type="button" onClick={()=>{deleteSeccion(seccion.id)}}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9063 9.52575L18.5938 18.9843C18.5671 19.7944 18.2259 20.5622 17.6424 21.1248C17.059 21.6874 16.2793 22.0005 15.4688 21.9976H9.53126C8.72127 22.0005 7.942 21.6879 7.35863 21.1259C6.77527 20.564 6.43367 19.797 6.40626 18.9875L6.09376 9.52575C6.08692 9.31855 6.16267 9.11712 6.30435 8.96577C6.44603 8.81443 6.64202 8.72556 6.84922 8.71872C7.05643 8.71188 7.25786 8.78764 7.4092 8.92931C7.56055 9.07099 7.64942 9.26699 7.65626 9.47419L7.96876 18.9351C7.98432 19.339 8.15578 19.7212 8.44714 20.0013C8.73849 20.2814 9.12707 20.4378 9.53126 20.4375H15.4688C15.8735 20.4377 16.2625 20.281 16.5539 20.0002C16.8454 19.7194 17.0165 19.3364 17.0313 18.932L17.3438 9.47419C17.3506 9.26699 17.4395 9.07099 17.5908 8.92931C17.7422 8.78764 17.9436 8.71188 18.1508 8.71872C18.358 8.72556 18.554 8.81443 18.6957 8.96577C18.8373 9.11712 18.9131 9.31855 18.9063 9.52575ZM19.9398 6.3781C19.9398 6.5853 19.8575 6.78401 19.711 6.93052C19.5645 7.07704 19.3658 7.15935 19.1586 7.15935H5.84219C5.63499 7.15935 5.43628 7.07704 5.28977 6.93052C5.14325 6.78401 5.06094 6.5853 5.06094 6.3781C5.06094 6.17089 5.14325 5.97218 5.28977 5.82567C5.43628 5.67916 5.63499 5.59685 5.84219 5.59685H8.26407C8.51161 5.59751 8.75054 5.50606 8.93437 5.34028C9.11819 5.1745 9.23377 4.94626 9.2586 4.69997C9.31625 4.12223 9.58693 3.58664 10.0179 3.19756C10.4489 2.80847 11.0092 2.59377 11.5898 2.59528H13.4102C13.9908 2.59377 14.5512 2.80847 14.9821 3.19756C15.4131 3.58664 15.6838 4.12223 15.7414 4.69997C15.7662 4.94626 15.8818 5.1745 16.0656 5.34028C16.2495 5.50606 16.4884 5.59751 16.7359 5.59685H19.1578C19.365 5.59685 19.5637 5.67916 19.7102 5.82567C19.8568 5.97218 19.9398 6.17089 19.9398 6.3781ZM10.6148 5.59685H14.3867C14.2841 5.36227 14.2169 5.11371 14.1875 4.85935C14.1682 4.66677 14.078 4.48824 13.9345 4.35834C13.7911 4.22844 13.6045 4.15641 13.4109 4.15622H11.5906C11.3971 4.15641 11.2105 4.22844 11.067 4.35834C10.9236 4.48824 10.8334 4.66677 10.8141 4.85935C10.7844 5.11375 10.7178 5.36231 10.6148 5.59685ZM11.4016 17.4336V10.7812C11.4016 10.574 11.3193 10.3753 11.1727 10.2288C11.0262 10.0823 10.8275 9.99997 10.6203 9.99997C10.4131 9.99997 10.2144 10.0823 10.0679 10.2288C9.92138 10.3753 9.83907 10.574 9.83907 10.7812V17.4367C9.83907 17.6439 9.92138 17.8426 10.0679 17.9891C10.2144 18.1356 10.4131 18.2179 10.6203 18.2179C10.8275 18.2179 11.0262 18.1356 11.1727 17.9891C11.3193 17.8426 11.4016 17.6439 11.4016 17.4367V17.4336ZM15.1625 17.4336V10.7812C15.1625 10.574 15.0802 10.3753 14.9337 10.2288C14.7872 10.0823 14.5885 9.99997 14.3813 9.99997C14.1741 9.99997 13.9753 10.0823 13.8288 10.2288C13.6823 10.3753 13.6 10.574 13.6 10.7812V17.4367C13.6 17.6439 13.6823 17.8426 13.8288 17.9891C13.9753 18.1356 14.1741 18.2179 14.3813 18.2179C14.5885 18.2179 14.7872 18.1356 14.9337 17.9891C15.0802 17.8426 15.1625 17.6439 15.1625 17.4367V17.4336Z" fill="black"/></svg>
                          </button>
                        </span>
                        {
                            seccion.links.map((enlace,index_enlace)=>{
                                return(
                                    <div key={index_enlace} className="flex flex-col mt-3">
                                        <input defaultValue={enlace.descripcion} onChange={(e)=>addChangesEnlaces(enlace.id,"descripcion",e.target.value)} className="border-b border-b-transparent hover:border-b-secondary font-bold" placeholder="Descripción del enlace"/>
                                        <input defaultValue={enlace.url} onChange={(e)=>addChangesEnlaces(enlace.id,"url",e.target.value)} className="font-light border-b border-b-transparent hover:border-b-secondary text-primary" placeholder="URL"/>
                                    </div>
                                )
                            })
                        }
                      </div>
                    )
                })
               }
               {
                newSecciones.map((seccion,index_seccion)=>{
                    return(
                      <div key={index_seccion}>
                        <input value={seccion.titulo} onChange={(e)=>{updateNewSecciones(index_seccion, "titulo", e.target.value)}} className="border-b border-secondary font-timesnr text-secondary text-xl w-full mt-5" placeholder="Escribe el titulo de la sección"></input>
                        {
                            seccion.links.map((enlace,index_enlace)=>{
                                return(
                                    <div key={index_enlace} className="flex flex-col mt-4">
                                        <input value={enlace.descripcion} onChange={(e)=>updateNewEnlaces(index_seccion,index_enlace,"descripcion",e.target.value)} className="border-b border-b-transparent hover:border-b-secondary font-bold" placeholder="Descripción del enlace"/>
                                        <input value={enlace.url} onChange={(e)=>updateNewEnlaces(index_seccion,index_enlace,"url",e.target.value)} className="font-light border-b border-b-transparent hover:border-b-secondary text-primary" placeholder="URL"/>
                                    </div>
                                )
                            })
                        }
                        <button
                          onClick={()=>{
                            const newSeccionesCopy = [...newSecciones];
                            newSeccionesCopy[index_seccion].links.push({descripcion:"",url:""});
                            setNewSecciones(newSeccionesCopy);
                          }}
                          type="button" className="w-full text-secondary mt-3 px-3 py-2 hover:bg-secondary/10 rounded-md mb-5">
                          + Agrega un enlace
                        </button>
                      </div>
                    )
                })
               }
               </div>
               }
            <button
              onClick={()=>{
                setNewSecciones([...newSecciones ,{proyectoId:id,titulo:"", links:[]}])
              }}
              type="button" className="w-full text-secondary mt-3 px-3 py-2 hover:bg-secondary/10 rounded-md">
            + Agrega una sección 
            </button>
          </div>
        </form>
        }
      </Main>
      <ToastContainer/>
    </div>
  );
}