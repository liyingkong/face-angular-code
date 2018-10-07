import { iId } from "./base/iid.interface"

export class t_peoplefeature  implements iId {
    id: number;

	name: string;
	sex: number;
	cardnumber: string;
	businessid: string;
	status: number;
	contorltype_name: string;
	contorltype: number;
	picpath: string;
    remark: string;
	Feature: string;
    createtime: Date | number;
    file: string;
    filename: string;
	picurl: string;
	images: any[];
	score: number;
}