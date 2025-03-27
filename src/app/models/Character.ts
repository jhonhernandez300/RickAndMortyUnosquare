import { info } from "../models/info";
import { Res } from "../models/Res";

export interface Character{
    info: info;
    results: Res[];
}

export { Res };
