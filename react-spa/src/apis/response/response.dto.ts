import { ResponseCode } from "../../types";

export default interface ResponseDTO {
    code: ResponseCode;
    message: string;
}