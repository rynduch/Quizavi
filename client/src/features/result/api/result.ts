import ky from "ky";
import {API_URL} from "../../../config";
import {ResultType} from "../../../types/ResultType";

export const listResult = async () => {
    return ky.get(`${API_URL}/result`, {credentials: "include"}).json<ResultType[]>();
}