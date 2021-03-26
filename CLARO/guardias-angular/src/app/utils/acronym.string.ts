export function acronym(str:string):string | undefined
{   
    if(str)
    {
        return str.split(' ').map(s => s.charAt(0).toUpperCase()).join('');
    }
}