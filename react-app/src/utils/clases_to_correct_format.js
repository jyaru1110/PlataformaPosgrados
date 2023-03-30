export function clases_to_correct_format (clases)
{
    if(clases !== undefined)
    {
        for (var j = 0; j < clases.length; j++)
        {
            clases[j]._id = j;
            clases[j].name = clases[j].no_clase;
        }
        return clases;
    }

}