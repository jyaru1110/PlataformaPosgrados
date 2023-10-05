export default function NuevoForm(props) {
  return (
    <div
      className={`h-screen w-screen bg-black/[0.14] fixed p-5 z-10 flex items-center justify-center ${
        props.show ? "" : " hidden"
      }`}
    >
        <div className="w-full h-full bg-white max-w-2xl max-h-[700px] rounded-xl">
            <form>
            </form>
        </div>
    </div>
  );
}
