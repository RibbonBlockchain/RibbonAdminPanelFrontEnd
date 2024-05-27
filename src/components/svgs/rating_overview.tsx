import * as React from "react";
const RatingOverviewSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill="#fff"
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M9.48 1.999a.563.563 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.562.562 0 0 0-.181.557l1.284 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L4.983 19.04a.562.562 0 0 1-.84-.61l1.284-5.386a.562.562 0 0 0-.182-.557L1.041 8.885a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L9.48 2Z"
		/>
	</svg>
);
export default RatingOverviewSvg;
