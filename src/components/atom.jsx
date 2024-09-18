import { atom } from "recoil"

export const longUrlAtom = atom({
    key: "longUrl",
    default: ``
})

export const shortUrlAtom = atom({
    key: "shortUrl",
    default: ``
})