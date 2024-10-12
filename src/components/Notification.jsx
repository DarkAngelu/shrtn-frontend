import { useRecoilState } from "recoil";
import { notificationAtom } from "./atom";
import { useEffect } from "react";

export default function Notification() {
	const [notification, $notification] = useRecoilState(notificationAtom);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				$notification(null);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	if (!notification) return null;

	const bgColor =
		notification.type === "success" ? "bg-green-500" : "bg-red-500";

	return (
		<div
			className={`fixed top-0 left-0 right-0 ${bgColor} text-white p-2 text-center`}
		>
			{notification.message}
		</div>
	);
}
