import * as React from "react";
const SingleUserReportIconSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={38}
		height={38}
		fill="none"
		{...props}
	>
		<rect width={37} height={37} x={0.684} y={0.848} fill="#fff" rx={18.5} />
		<path
			stroke="#7C56FE"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M25.165 26.073a7.488 7.488 0 0 0-5.981-2.975 7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0a8.966 8.966 0 0 1-5.981 2.275 8.966 8.966 0 0 1-5.982-2.275m8.982-8.975a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
		/>
	</svg>
);
export default SingleUserReportIconSvg;
