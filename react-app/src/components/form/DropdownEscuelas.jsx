import Dropdown from "./Dropdown";
export default function DropdownEscuelas() {
  const options = [{ _id: 1, name: 'Ciencias de la Salud' }, { _id: 2, name: 'Gobierno y Economía' }, { _id: 3, name: 'Bellas Artes'}, { _id: 4, name: 'Humanidades'}, { _id: 5, name: 'Derecho'}, { _id: 6, name: 'Empresariales'}, { _id: 7, name: 'ESDAI'}, { _id: 8, name: 'Filosofía'}, { _id: 9, name: 'Ingeniería'}];
  const label = 'Selecciona una escuela';
  return (
    <Dropdown options={options} label={label} />
  );
}