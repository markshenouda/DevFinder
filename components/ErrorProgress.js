import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";

const ErrorProgress = ({ message }) => {
	const router = useRouter();
	const [timeleft, setTimeleft] = useState(60);

	useEffect(() => {
		let timer;

		if (timeleft > 0) {
			timer = setTimeout(() => {
				setTimeleft(timeleft - 1);
			}, 1000);
		} else {
			router.reload();
		}

		return () => clearTimeout(timer);
	});

	return (
		<div className="errorProgress">
			<h3>
				{message}! Page will refresh automatically after {timeleft}{" "}
				seconds.
			</h3>
			<LinearProgress
				variant="determinate"
				value={(60 - timeleft) * (100 / 60)}
			/>
		</div>
	);
};

export default ErrorProgress;
