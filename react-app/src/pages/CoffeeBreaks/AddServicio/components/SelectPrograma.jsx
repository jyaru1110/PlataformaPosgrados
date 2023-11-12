export default function SelectPrograma({onchange,options,default_value}) {
  const value_default = default_value;
  const child_to_parent = (e) => {
    onchange(e.target.value);
  };

  return (
    <div className="">
    <select  placeholder="Escoge programa" onChange={child_to_parent} className=" w-[650px]" value={value_default}>
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