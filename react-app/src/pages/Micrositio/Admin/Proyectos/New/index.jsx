import Header from "../../components/Header";
import Main from "../../../components/Main";
import { Link } from "react-router-dom";
import '@mdxeditor/editor/style.css'
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, linkPlugin, linkDialogPlugin, CreateLink, BlockTypeSelect, InsertTable, tablePlugin,listsPlugin,markdownShortcutPlugin,headingsPlugin, ListsToggle,quotePlugin, frontmatterPlugin} from '@mdxeditor/editor'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function NewProyecto() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const mdRef = useRef(null)
    const onSubmit = async (data) => {
        data.caracteristicas = mdRef.current.getMarkdown()
        axios.post(`${import.meta.env.VITE_URL_API}/proyecto`,data,{
            withCredentials: true
        }).then((res)=>{
            navigate("/micrositio/admin/proyectos/"+res.data.id)
        }).catch((e)=>{
            console.log(e)
            toast.error(e.response.data.message)
        })

    };
  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header title="Nuevo proyecto">
        <button
            type="submit"
            form="formNewProyecto"
            className="py-3 px-3 hover:bg-gray-100 rounded-lg"
        >
          <svg
            width="24"
            height="19"
            viewBox="0 0 24 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7328 4.99962C18.9989 3.33099 17.7323 1.94649 16.1271 1.05827C14.5219 0.170059 12.6666 -0.172873 10.8456 0.0820302C9.02452 0.336933 7.33819 1.17561 6.04496 2.46954C4.75173 3.76347 3.92295 5.44128 3.68561 7.24586C2.54043 7.51722 1.53584 8.19527 0.862625 9.15123C0.189406 10.1072 -0.105557 11.2745 0.0337506 12.4315C0.173058 13.5885 0.736934 14.6545 1.6183 15.4272C2.49966 16.1999 3.63712 16.6255 4.81468 16.623C5.13325 16.623 5.43876 16.4978 5.66402 16.2749C5.88927 16.052 6.01582 15.7497 6.01582 15.4345C6.01582 15.1193 5.88927 14.817 5.66402 14.5942C5.43876 14.3713 5.13325 14.2461 4.81468 14.2461C4.17756 14.2461 3.56653 13.9956 3.11602 13.5499C2.6655 13.1041 2.41241 12.4995 2.41241 11.8691C2.41241 11.2387 2.6655 10.6341 3.11602 10.1883C3.56653 9.74253 4.17756 9.4921 4.81468 9.4921C5.13325 9.4921 5.43876 9.36689 5.66402 9.144C5.88927 8.92112 6.01582 8.61882 6.01582 8.30362C6.01889 6.89797 6.52545 5.5389 7.4455 4.46787C8.36555 3.39684 9.63952 2.6832 11.0411 2.45373C12.4426 2.22426 13.881 2.49382 15.1007 3.21452C16.3204 3.93523 17.2424 5.0604 17.7029 6.39015C17.7716 6.59438 17.895 6.77633 18.06 6.91657C18.225 7.05682 18.4254 7.15009 18.6398 7.18644C19.4398 7.33603 20.1651 7.74931 20.6974 8.35892C21.2297 8.96853 21.5376 9.73855 21.571 10.5435C21.6045 11.3484 21.3614 12.1408 20.8815 12.7916C20.4015 13.4424 19.713 13.9132 18.9281 14.1272C18.6191 14.206 18.3543 14.403 18.1922 14.675C18.03 14.9469 17.9836 15.2714 18.0632 15.5772C18.1429 15.8829 18.342 16.1448 18.6168 16.3053C18.8916 16.4658 19.2196 16.5117 19.5286 16.4329C20.7927 16.1024 21.9132 15.3727 22.7201 14.3548C23.5269 13.3368 23.976 12.0861 23.9991 10.7926C24.0222 9.49915 23.618 8.23355 22.8481 7.18801C22.0781 6.14247 20.9843 5.37411 19.7328 4.99962ZM12.8743 7.45979C12.7601 7.35159 12.6254 7.26677 12.4779 7.21021C12.1855 7.09134 11.8575 7.09134 11.5651 7.21021C11.4176 7.26677 11.2829 7.35159 11.1687 7.45979L7.56529 11.0253C7.33911 11.249 7.21205 11.5526 7.21205 11.8691C7.21205 12.1856 7.33911 12.4891 7.56529 12.7129C7.79147 12.9367 8.09823 13.0624 8.4181 13.0624C8.73796 13.0624 9.04473 12.9367 9.27091 12.7129L10.8204 11.1679V17.8115C10.8204 18.1267 10.9469 18.429 11.1722 18.6519C11.3974 18.8748 11.703 19 12.0215 19C12.3401 19 12.6456 18.8748 12.8708 18.6519C13.0961 18.429 13.2227 18.1267 13.2227 17.8115V11.1679L14.7721 12.7129C14.8838 12.8243 15.0166 12.9127 15.163 12.9731C15.3094 13.0334 15.4664 13.0645 15.6249 13.0645C15.7835 13.0645 15.9405 13.0334 16.0869 12.9731C16.2332 12.9127 16.3661 12.8243 16.4777 12.7129C16.5903 12.6024 16.6797 12.471 16.7407 12.3261C16.8016 12.1813 16.833 12.026 16.833 11.8691C16.833 11.7122 16.8016 11.5568 16.7407 11.412C16.6797 11.2672 16.5903 11.1357 16.4777 11.0253L12.8743 7.45979Z"
              fill="black"
            />
          </svg>
        </button>
      </Header>
      <Main>
      <form id="formNewProyecto" onSubmit={handleSubmit(onSubmit)} className="w-full flex">
          <div className="w-[70%] bg-white shadow-header rounded-xl mt-6">
            <div className="h-36 rounded-t-xl bg-no-repeat bg-center bg-cover" style={{backgroundImage:"url(https://st4.depositphotos.com/13193658/29566/i/450/depositphotos_295663768-stock-photo-four-multiethnic-colleagues-formal-wear.jpg)"}}></div>
            <div className="p-10">
              <input {...register("nombre",{required:true})} type="text" className="font-timesnr text-5xl w-full" placeholder="Titulo del proyecto"/>
              <div className="bg-secondary h-[1px] my-8"></div>
              <textarea {...register("descripcion")} className="font-light border border-grayborder w-full p-3 rounded-xl" placeholder="Descripción del proyecto"></textarea>
              <MDXEditor
                    markdown="# Escribe texto markdown" 
                    contentEditableClassName="prose"
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
                        )
                        })
                    ]}
                    ref={mdRef}
                />
            </div>
          </div>
          <div className="pl-5 mt-6 w-[30%]">
            <div className="border border-secondary w-full py-5 flex flex-col justify-between items-center bg-[#FBF9F6] rounded-md shadow-header">
                <h4 className="font-timesnr text-secondary text-2xl flex items-center">
                    <svg id="Grupo_69" data-name="Grupo 69" className="mr-2.5 -mt-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="21.217" height="21.524" viewBox="0 0 21.217 21.524"> <defs> <clipPath id="clip-path"> <rect id="Rectángulo_22" data-name="Rectángulo 22" width="21.217" height="21.524" fill="#b9975b"/> </clipPath> </defs> <g id="Grupo_66" data-name="Grupo 66" transform="translate(0 0)" clipPath="url(#clip-path)"> <path id="Trazado_44" data-name="Trazado 44" d="M20.971,4.543a1.489,1.489,0,0,0,1.493-1.49V1.493a1.493,1.493,0,1,0-2.985,0v1.56a1.489,1.489,0,0,0,1.492,1.489" transform="translate(-5.082 0)" fill="#b9975b"/> <path id="Trazado_45" data-name="Trazado 45" d="M21.194,3.481H18.188V4.24a2.272,2.272,0,1,1-4.545,0V3.481H7.579V4.24a2.273,2.273,0,1,1-4.546,0V3.481L0,3.443V22.422H19.7l1.514,0ZM19.7,20.911H1.517V8.786H19.7V20.911Z" transform="translate(0 -0.898)" fill="#b9975b"/> <path id="Trazado_46" data-name="Trazado 46" d="M6.62,4.543a1.49,1.49,0,0,0,1.494-1.49V1.493a1.493,1.493,0,1,0-2.985,0v1.56A1.487,1.487,0,0,0,6.62,4.543" transform="translate(-1.338 0)" fill="#b9975b"/> <rect id="Rectángulo_11" data-name="Rectángulo 11" width="2.388" height="2.108" transform="translate(7.583 9.515)" fill="#b9975b"/> <rect id="Rectángulo_12" data-name="Rectángulo 12" width="2.39" height="2.108" transform="translate(11.445 9.515)" fill="#b9975b"/> <rect id="Rectángulo_13" data-name="Rectángulo 13" width="2.388" height="2.108" transform="translate(15.026 9.515)" fill="#b9975b"/> <rect id="Rectángulo_14" data-name="Rectángulo 14" width="2.388" height="2.107" transform="translate(7.583 13.015)" fill="#b9975b"/> <rect id="Rectángulo_15" data-name="Rectángulo 15" width="2.39" height="2.107" transform="translate(11.445 13.015)" fill="#b9975b"/> <rect id="Rectángulo_16" data-name="Rectángulo 16" width="2.388" height="2.107" transform="translate(15.026 13.015)" fill="#b9975b"/> <rect id="Rectángulo_17" data-name="Rectángulo 17" width="2.388" height="2.107" transform="translate(7.583 16.585)" fill="#b9975b"/> <rect id="Rectángulo_18" data-name="Rectángulo 18" width="2.387" height="2.107" transform="translate(3.79 13.015)" fill="#b9975b"/> <rect id="Rectángulo_19" data-name="Rectángulo 19" width="2.387" height="2.107" transform="translate(3.79 16.585)" fill="#b9975b"/> <rect id="Rectángulo_20" data-name="Rectángulo 20" width="2.39" height="2.107" transform="translate(11.445 16.585)" fill="#b9975b"/> <rect id="Rectángulo_21" data-name="Rectángulo 21" width="2.388" height="2.107" transform="translate(15.026 16.585)" fill="#b9975b"/> </g> </svg>
                    Calendario
                </h4>
                <span className="text-center my-4 text-base">
                    <h5 className=" text-secondary">Próximo inicio de curso:</h5>
                    <p className="font-light">31 agosto 2024</p>
                </span>
            </div>
            <div className="mt-6 bg-white py-6 px-10 rounded-lg shadow-header">
                <h4 className="border-b border-secondary font-timesnr text-secondary text-xl mb-5">Material promocional</h4>
               <Link className="flex font-light items-center" to="">
                    <svg className="mr-3.5" fill="#00685E" enableBackground="new 0 0 515.283 515.283" height="15" viewBox="0 0 515.283 515.283" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><path d="m372.149 515.283h-286.268c-22.941 0-44.507-8.934-60.727-25.155s-25.153-37.788-25.153-60.726v-286.268c0-22.94 8.934-44.506 25.154-60.726s37.786-25.154 60.727-25.154h114.507c15.811 0 28.627 12.816 28.627 28.627s-12.816 28.627-28.627 28.627h-114.508c-7.647 0-14.835 2.978-20.241 8.384s-8.385 12.595-8.385 20.242v286.268c0 7.647 2.978 14.835 8.385 20.243 5.406 5.405 12.594 8.384 20.241 8.384h286.267c7.647 0 14.835-2.978 20.242-8.386 5.406-5.406 8.384-12.595 8.384-20.242v-114.506c0-15.811 12.817-28.626 28.628-28.626s28.628 12.816 28.628 28.626v114.507c0 22.94-8.934 44.505-25.155 60.727-16.221 16.22-37.788 25.154-60.726 25.154zm-171.76-171.762c-7.327 0-14.653-2.794-20.242-8.384-11.179-11.179-11.179-29.306 0-40.485l237.397-237.398h-102.648c-15.811 0-28.626-12.816-28.626-28.627s12.815-28.627 28.626-28.627h171.761c3.959 0 7.73.804 11.16 2.257 3.201 1.354 6.207 3.316 8.837 5.887.001.001.001.001.002.002.019.019.038.037.056.056.005.005.012.011.017.016.014.014.03.029.044.044.01.01.019.019.029.029.011.011.023.023.032.032.02.02.042.041.062.062.02.02.042.042.062.062.011.01.023.023.031.032.011.01.019.019.029.029.016.015.03.029.044.045.005.004.012.011.016.016.019.019.038.038.056.057 0 .001.001.001.002.002 2.57 2.632 4.533 5.638 5.886 8.838 1.453 3.43 2.258 7.2 2.258 11.16v171.761c0 15.811-12.817 28.627-28.628 28.627s-28.626-12.816-28.626-28.627v-102.648l-237.4 237.399c-5.585 5.59-12.911 8.383-20.237 8.383z" fill="#00685E"/></g></g></g></g></svg>
                    Postal del programa
               </Link> 
            </div>
          </div>
        </form> 
      </Main>
      <ToastContainer></ToastContainer>
    </div>
  );
}
