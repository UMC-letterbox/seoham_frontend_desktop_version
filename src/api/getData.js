import { customAxios } from "./customAxios";

export const getLetter = () => { //{postIdx}
    const postIdx = 1
    return customAxios.get(`posts/${postIdx}`)
}