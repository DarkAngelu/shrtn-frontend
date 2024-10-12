import { useRecoilValue, useSetRecoilState } from "recoil";
import { shortUrlAtom, notificationAtom } from "./atom";
import config from "../../config.json";
import { Copy } from "lucide-react";
import { useEffect } from "react";

export default function Output() {
	const shortUrl = useRecoilValue(shortUrlAtom);
	const $notification = useSetRecoilState(notificationAtom);
	const defaultUrl = config.BASIC_DEFAULT_URL;
	const fullShortUrl = defaultUrl + shortUrl;

	const handleCopy = async () => {
		await navigator.clipboard.writeText(fullShortUrl);
		$notification({
			message: "Short URL Copied to Clipboard.",
			type: "success",
		});
	};

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.ctrlKey && e.key === "Enter" && shortUrl) {
				handleCopy();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [shortUrl]);

	if (!shortUrl) return null;

	return (
		<div className="mt-4 bg-gray-800 rounded-md flex items-stretch overflow-hidden">
			<span className="flex-grow p-3 text-sm text-gray-300 truncate">
				{fullShortUrl}
			</span>
			<button
				onClick={handleCopy}
				className="px-4 bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors duration-200 flex items-center justify-center"
				aria-label="Copy URL"
			>
				<Copy size={18} />
				<span className="ml-2 hidden sm:inline">Copy</span>
			</button>
		</div>
	);
}
