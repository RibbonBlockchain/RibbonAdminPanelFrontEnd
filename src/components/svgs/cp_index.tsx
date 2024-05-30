import * as React from "react";
const CPIndexSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={25}
		className="fill-none"
		{...props}
	>
		<path
			// fill="#fff"
			className="fill-white"
			fillRule="evenodd"
			d="M12.433 1.499a.9.9 0 0 0-.87 0L2.872 6.294l9.127 5.036 9.128-5.036L12.433 1.5Zm9.165 6.248-8.85 4.883V22.7l8.385-4.625a.9.9 0 0 0 .465-.788v-9.54ZM11.248 22.7V12.629l-8.85-4.882v9.54a.9.9 0 0 0 .466.788l8.384 4.626Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default CPIndexSvg;
