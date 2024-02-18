import Dropdown from "./Dropdown";

export default function DropdownIslas(props) {
  const options = [{_id:0, name:'Antarita'},{ _id: 1, name: 'Valencia 1' }, { _id: 2, name: 'Santa Fe' }, { _id: 3, name: 'Donatello'}, { _id: 4, name: 'Aula Magna / Comedor Invitados'}, { _id: 5, name: 'Campana'}, { _id: 6, name: 'Periquillo'}, { _id: 7, name: 'Valencia 2'}, { _id: 8, name: 'Hall Jerez'},{_id: 9, name:"Todos"}];
  const label = 'Selecciona una isla';
  const value = props.value||'Todos';

  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown options={options} label={label} child_to_parent = {child_to_parent} value = {value}/>
  );
}