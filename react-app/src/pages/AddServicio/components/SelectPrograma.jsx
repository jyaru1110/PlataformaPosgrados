export default function SelectPrograma({onchange,options}) {
  const child_to_parent = (e) => {
    onchange(e.target.value);
  };

  return (
    <div className="">
    <select  placeholder="Escoge programa" onChange={child_to_parent} className=" w-[650px]">
        {
            options?.map((programa)=>{
                return <option key={programa._id} value={programa.name} className="">{programa.name}</option>
            }
            ) 
        }
    </select>
    </div>
  );
}