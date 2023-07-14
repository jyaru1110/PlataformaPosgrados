export default function SelectDia({onchange,options,default_value}) {
  const value_default = default_value;
    const child_to_parent = (e) => {
      onchange(e.target.value);
    };
  
    return (
      <div className="">
      <select  placeholder="Select salón" onChange={child_to_parent} className=" w-[150px]" defaultValue={value_default}>
          {
              options?.map((programa)=>{
                  return <option key={programa.value} value={programa.value} className="">{programa.value}</option>
              }
              ) 
          }
      </select>
      </div>
    );
  }