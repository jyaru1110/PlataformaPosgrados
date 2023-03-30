export function clases_to_correct_format (clases)
{
    if(clases !== undefined)
    {
        var i = 1;
        for (var j = 0; j < clases.length; j++)
        {
            clases[j]._id = i;
            clases[j].name = clases[j].no_clase;
            i++;
        }
        return clases;
    }

}