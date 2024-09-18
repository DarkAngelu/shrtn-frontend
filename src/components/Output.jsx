
import { useRecoilValue } from "recoil";
import { shortUrlAtom } from "./atom";

import config from "../../config.json"

export default function Output() {
    const shortUrl = useRecoilValue(shortUrlAtom)
    const defaultUrl = config.BASIC_DEFAULT_URL

    return (
        <>
            <div>Short URL: {defaultUrl + shortUrl || ""} </div>
        </>
    );
}
