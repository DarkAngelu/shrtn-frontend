import { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { longUrlAtom, shortUrlAtom, notificationAtom } from "./atom";
import config from "../../config.json";
import axios from "axios";

export default function Input() {
	const [longUrl, $longUrl] = useRecoilState(longUrlAtom);
	const $shortUrl = useSetRecoilState(shortUrlAtom);
	const $notification = useSetRecoilState(notificationAtom);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		async function assign() {
			if (chrome && chrome.tabs) {
				chrome.tabs.query(
					{ currentWindow: true, active: true },
					function (tabs) {
						console.log(tabs[0].url);
						$longUrl(tabs[0].url);
					}
				);
			}
		}
		assign();

		const handleGlobalKeyPress = async (e) => {
			if (e.key === "Enter" && !isLoading && !e.ctrlKey) {
				e.preventDefault();
				await handleShorten();
			}
			if (e.key === "/") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleGlobalKeyPress);

		return () => {
			window.removeEventListener("keydown", handleGlobalKeyPress);
		};
	}, [isLoading, longUrl]);

	async function isValid(url) {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	}

	const defaultUrl = config.BASIC_DEFAULT_URL;

	async function handleShorten() {
		if (isLoading) return;
		setIsLoading(true);

		if (!(await isValid(longUrl))) {
			$notification({
				message: "Invalid URL. Please enter a correct URL.",
				type: "error",
			});
			setIsLoading(false);
			return;
		}

		try {
			const res = await axios.post(`${defaultUrl}`, {
				longUrl: longUrl,
			});

			const url = res.data.shortUrl;
			$shortUrl(url);

			const fullUrl = defaultUrl + url;
			await navigator.clipboard.writeText(fullUrl);
			$notification({
				message: "Short Url Copied to Clipboard.",
				type: "success",
			});

			// Remove focus from input after submitting
			inputRef.current?.blur();
		} catch (error) {
			$notification({
				message: "An error occurred while shortening the URL.",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex space-x-2">
			<input
				ref={inputRef}
				value={longUrl}
				type="text"
				placeholder="Enter URL"
				onChange={(e) => $longUrl(e.target.value)}
				autoFocus
				onSelect={(e) => e.target.select()}
				className="flex-grow px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				onClick={handleShorten}
				disabled={isLoading}
				className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
			>
				{isLoading ? "Shortening..." : "Submit"}
			</button>
		</div>
	);
}
