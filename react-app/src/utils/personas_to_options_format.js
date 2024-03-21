export default function personas_to_options_format(personas) {
  const options = personas.map((persona) => {
    return {
      value: persona.id,
      label: persona.nombre,
    };
  });
  return options;
}
