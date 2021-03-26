export function titlecase(str:string): string | undefined
{
    if(str)
    {
        return str.toLocaleLowerCase()
        .trim()
        .split(" ")
        .map(item => {
            return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(" ");
    } 
}