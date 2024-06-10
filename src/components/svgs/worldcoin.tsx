import * as React from "react";
const WorldCoinSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={23}
		height={24}
		fill="none"
		{...props}
	>
		<path
			stroke="#080808"
			strokeWidth={1.5}
			d="M1.152 12.495h20.856M22.008 12.047c0-5.759-4.669-10.427-10.428-10.427-5.759 0-10.428 4.668-10.428 10.427 0 5.76 4.669 10.428 10.428 10.428 5.76 0 10.428-4.669 10.428-10.428Z"
		/>
		<path
			stroke="#080808"
			strokeWidth={1.5}
			d="M20.395 6.301h-7.738a5.99 5.99 0 0 0 0 11.978h7.738"
		/>
	</svg>
);
export default WorldCoinSvg;
