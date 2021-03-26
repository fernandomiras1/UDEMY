
export function intersection(arr1: any, arr2: any): any[] 
{
    return arr1.filter((item:any) => arr2.includes(item));
}

export function hasIntersection(arr1: any, arr2: any): boolean
{
    return intersection(arr1, arr2).length > 0;
}