import * as React from "react";
const UsersReportSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill="#fff"
			d="M12.45 8.799a1.2 1.2 0 0 1-1.2-1.2v-6c0-.663.54-1.21 1.196-1.116a8.405 8.405 0 0 1 7.119 7.12c.093.655-.453 1.196-1.116 1.196h-6Z"
		/>
		<path
			fill="#fff"
			d="M7.653 2.883C8.309 2.79 8.849 3.336 8.849 4v6a1.2 1.2 0 0 0 1.2 1.2h6c.663 0 1.21.54 1.116 1.196a8.4 8.4 0 1 1-9.512-9.512Z"
		/>
	</svg>
);
export default UsersReportSvg;
