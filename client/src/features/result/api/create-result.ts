import ky from "ky";
import {API_URL} from "../../../config";
import {ResultType} from "../../../types/ResultType";
import {ResultCreateType} from "../../../types/ResultCreateType";

export const createResult = async (data: ResultCreateType) => {
    return ky.post(`${API_URL}/result`, {json: data, credentials: "include"}).json<ResultType>();
}