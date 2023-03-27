export function clases_to_correct_format (clases)
{
    if(clases !== undefined)
    {
        var i = 1;
        clases.forEach(clase => {
                clase._id = i;
                clase.name = clase.no_clase;
                i++;
            }
        );
        return clases;
    }

}