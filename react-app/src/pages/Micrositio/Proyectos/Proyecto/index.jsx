import Header from "../../components/Header";
import Main from "../../components/Main";
import { Link, useParams } from "react-router-dom";
import { useProyecto } from "../../../../hooks/useProyectos"; 
import Error from "../../components/Error";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Proyecto() {
  const {id} = useParams();
  const {loading,proyecto,error} = useProyecto(id);


  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
            <Error err={error}></Error>
      </div>
    )}

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <Link
          className="bg-primary text-white px-4 py-2 rounded-3xl text-sm flex items-center w-fit"
          to={"/micrositio/proyectos"}
        >
            <svg className="mr-1.5" xmlns="http://www.w3.org/2000/svg" width="15" height="12.931" viewBox="0 0 15 12.931"><defs><clipPath id="a"><path data-name="Trazado 103" d="M6.422 0a1.3 1.3 0 0 0-.872.379L.379 5.552a1.294 1.294 0 0 0 0 1.829l5.171 5.171a1.294 1.294 0 0 0 1.829-1.829L4.415 7.759h9.292a1.293 1.293 0 1 0 0-2.586H4.415l2.964-2.966A1.294 1.294 0 0 0 6.507 0Z" fill="#fff"/></clipPath></defs><g data-name="Grupo 221"><g data-name="Grupo 220" clipPath="url(#a)"><path data-name="Rectángulo 102" fill="#fff" d="M-.126 0H15v13.057H-.126z"/></g></g></svg>
            Regresar a proyectos
        </Link>
        <div className="w-full flex">
          <div className="w-[70%] bg-white shadow-header rounded-xl mt-6">
            <div className="h-36 rounded-t-xl bg-no-repeat bg-center bg-cover" style={{backgroundImage:"url("+proyecto?.foto+")"}}></div>
            <div className="p-10">
              <h1 className="font-timesnr text-5xl">{proyecto?.nombre}</h1>
              <div className="bg-secondary h-[1px] my-8"></div>
              <p className="font-light">
                {proyecto?.descripcion} 
              </p>
              <h2 className="font-timesnr text-4xl my-8">Características</h2>
              <Markdown remarkPlugins={[remarkGfm]} className="prose">{proyecto?.caracteristicas}</Markdown>
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
        </div>
      </Main>
    </div>
  );
}
