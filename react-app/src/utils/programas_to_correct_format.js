export function programas_to_correct_format (programas)
{
    if(programas !== undefined)
    {
        for (var j = 0; j < programas.length; j++)
        {
            programas[j]._id = j;
            programas[j].name = programas[j].programa;
        }
        return programas;
    }

}