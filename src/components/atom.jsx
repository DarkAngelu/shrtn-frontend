import { atom } from "recoil";

export const longUrlAtom = atom({
	key: "longUrlAtom",
	default: "",
});

export const shortUrlAtom = atom({
	key: "shortUrlAtom",
	default: "",
});

export const notificationAtom = atom({
	key: "notificationAtom",
	default: null,
});
