export function clases_to_correct_format(clases) {
  for (var j = 0; j < clases.length; j++) {
    clases[j].value = j;
    clases[j].label = clases[j].no_clase;
  }
  return clases;
}
