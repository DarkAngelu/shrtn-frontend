

import { useRecoilState } from "recoil";
import { longUrlAtom, shortUrlAtom } from "./atom";

import config from "../../config.json"
import axios from "axios";
import { useEffect } from "react";


export default function Input() {
    // async function func() {
    //     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //     chrome.scripting.executeScript({
    //         target: { tabId: tab.id },
    //         func: () => {
    //             alert("Hello from the injected script!");
    //         },
    //     })
    // }
    useEffect(() => {
        async function assign() {
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
                console.log(tabs[0].url);
                $longUrl(tabs[0].url);
            });
        }
        assign();
    }, [])

    async function isValid(url) {


        // check if its a valid format
        try {
            new URL(url)
            console.log("Success " + url)
            return true
        } catch (e) {
            console.log("Failure " + e)
            return false
        }

        // check if it actually exists
        // ...to be implemented


    }


    const defaultUrl = config.BASIC_DEFAULT_URL
    console.log(defaultUrl);

    const [longUrl, $longUrl] = useRecoilState(longUrlAtom)
    const [shortUrl, $shortUrl] = useRecoilState(shortUrlAtom)

    

    return (
        <>
            <input
                value={longUrl}
                type="text"
                placeholder="Enter URL"
                onChange={(e) => $longUrl(e.target.value)}
                autoFocus
                onSelect={(e) => e.target.select()}
            />
            <button
                onClick={async () => {
                    // await func()
                    
                    if (!(await isValid(longUrl))) {
                        console.log("Invalid URL")
                        alert("Invalid URL ; Please enter correct url");
                        return
                    }

                    const res = await axios.post(`${defaultUrl}`, {
                        longUrl: longUrl
                    })

                    const url = res.data.shortUrl


                    console.log("Response - " + url)
                    $shortUrl(url)
                    console.log("shortUrl - " + shortUrl)

                    const fullUrl = defaultUrl + url;
                    console.log("Link - " + fullUrl);

                    await navigator.clipboard.writeText(fullUrl);
                }}
            >
                Create
            </button>
        </>
    );
}
