import DropdownEscuelas from '../../components/form/DropdownEscuelas';
export default function FiltrarHorario() {
    const escuelas = ['Ingenieria','Ciencias','Artes'];
    return (
      <div className="w-11/12 p-0">
        <DropdownEscuelas/>
      </div>
    );
  }