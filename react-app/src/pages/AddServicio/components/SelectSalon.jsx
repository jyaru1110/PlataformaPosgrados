export default function SelectSalon({onchange,options}) {
    const child_to_parent = (e) => {
      onchange(e.target.value);
    };
  
    return (
      <div className="">
      <select  placeholder="Select salón" onChange={child_to_parent} className=" w-[150px]">
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