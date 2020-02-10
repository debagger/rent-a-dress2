import { catalogItemOption } from "./catalgItemOption";
export declare class catalogItem {
    id: number;
    caption: string;
    desc: string;
    img: string;
    price?: number;
    options: catalogItemOption[];
}
