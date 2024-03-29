import Dropdown from "./Dropdown";

export default function DropdownEscuelas(props) {
  const rol = localStorage.getItem('rol');
  const escuela = localStorage.getItem('escuela');
  const options = rol=='Gestor'?[{_id:0, name:'Todos'},{ _id: 1, name: 'Ciencias de la Salud' }, { _id: 2, name: 'Gobierno y Economía' }, { _id: 3, name: 'Bellas Artes'}, { _id: 4, name: 'Humanidades'}, { _id: 5, name: 'Derecho'}, { _id: 6, name: 'Empresariales'}, { _id: 7, name: 'ESDAI'}, { _id: 8, name: 'Filosofía'}, { _id: 9, name: 'Ingeniería'}, {_id:10, name: 'Comunicación'},{_id:11, name:"Pedagogía"}]:[{_id:0, name:escuela}];
  const label = 'Selecciona una escuela';
  const value = props.value||'Todos';

  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown options={options} label={label} child_to_parent = {child_to_parent} value = {value}/>
  );
}