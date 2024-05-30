import * as React from "react";
const HistorySvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={18}
		height={18}
		className="fill-none"
		{...props}
	>
		<path
			className="fill-primary"
			d="M3.615 3.882A7.25 7.25 0 1 1 1.5 9 .75.75 0 0 0 0 9a8.75 8.75 0 1 0 2.552-6.176.756.756 0 0 0-.07.08L1.225 1.646a.5.5 0 0 0-.852.309L.02 5.844a.5.5 0 0 0 .543.543l3.89-.354a.5.5 0 0 0 .307-.851L3.532 3.954a.757.757 0 0 0 .083-.072Z"
		/>
		<path
			className="fill-primary"
			d="M9.5 4A.75.75 0 0 0 8 4v5a.75.75 0 0 0 .352.636l3 1.875a.75.75 0 1 0 .796-1.272L9.5 8.584V4Z"
		/>
	</svg>
);
export default HistorySvg;
