import { catalogItemOption } from "./catalog-item-option.entity";
export declare class catalogItem {
    id: number;
    caption: string;
    desc: string;
    img: string;
    price?: number;
    options: catalogItemOption[];
}
