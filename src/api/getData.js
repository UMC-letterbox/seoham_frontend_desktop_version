import { customAxios } from "./customAxios";

export const getLetter = () => { //{postIdx}
    const postIdx = 1
    return customAxios.get(`posts/${postIdx}`)
}

export const deleteLetter = () => { //{postIdx}
    const postIdx = 1
    return customAxios.delete(`posts/delete/${postIdx}`)
}