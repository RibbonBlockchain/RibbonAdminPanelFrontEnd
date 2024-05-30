import * as React from "react";
const FileSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={17}
		height={22}
		className="fill-none"
		// fill="none"
		{...props}
	>
		<path
			// stroke="#fff"
			className="stroke-white"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M16.25 13.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.875 1.25H5M5 14h7.5M5 17h3.75M7.25 1.25H2.375c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V10.25a9 9 0 0 0-9-9Z"
		/>
	</svg>
);
export default FileSvg;
