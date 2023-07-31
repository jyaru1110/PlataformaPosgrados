import Dropdown from "./Dropdown";

export default function DropdownDia(props) {
    const options = [{_id:0,name:'Todos'},{ _id: 1, name: 'Lunes' }, { _id: 2, name: 'Martes' }, { _id: 3, name: 'Miércoles'}, { _id: 4, name: 'Jueves'}, { _id: 5, name: 'Viernes'}, { _id: 6, name: 'Sábado'}];
    const label = 'Selecciona el día';
    const value = props.value||'Todos';
    const disabled = props.disabled||false;

    const child_to_parent = (child_data) => {
        props.func(child_data);
    };


  return (
    <Dropdown options={options} label={label} child_to_parent = {child_to_parent} value = {value} disabled={disabled}/>
  );
}