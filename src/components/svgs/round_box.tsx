import * as React from "react";
const RoundBoxSvg: React.FC = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={22}
		fill="none"
		{...props}
	>
		<rect
			width={4.172}
			height={8.929}
			x={1}
			y={5.566}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 1 5.566)"
		/>
		<rect
			width={4.172}
			height={8.929}
			x={1}
			y={12.887}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 1 12.887)"
		/>
		<rect
			width={4.172}
			height={8.929}
			x={1}
			y={20.605}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 1 20.605)"
		/>
		<rect
			width={4.172}
			height={8.929}
			x={14.07}
			y={5.566}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 14.07 5.566)"
		/>
		<rect
			width={4.172}
			height={8.929}
			x={14.07}
			y={12.887}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 14.07 12.887)"
		/>
		<rect
			width={4.172}
			height={8.929}
			x={14.07}
			y={20.605}
			fill="#7C56FE"
			stroke="#7C56FE"
			strokeWidth={2}
			rx={2.086}
			transform="rotate(-90 14.07 20.605)"
		/>
	</svg>
);
export default RoundBoxSvg;
