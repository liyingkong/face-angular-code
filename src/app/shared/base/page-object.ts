export class PageObject<T>{
    content:T[];
    last:boolean;
    totalElements:number;
    totalPages:number;
    size:number;
    number:number;
    sort:string|any;
    first:boolean;
    numberOfElements:number;
}

export class RestPageObject{
    _embedded:object;
    _links:object;
    page:Page;
}

export class Page{
    siz:number;
    totleElements:number;
    totalPages:number;
    number:number;
}