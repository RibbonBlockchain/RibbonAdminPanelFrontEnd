import * as React from "react";
const AverageCompletionRateSvg: React.FC<React.SVGProps<SVGSVGElement>> = (
	props
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={49}
		height={48}
		fill="none"
		{...props}
	>
		<rect width={48} height={48} x={0.379} fill="#E4FCEC" rx={6} />
		<path
			stroke="#0F172A"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M15.379 25.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-6.75ZM22.129 20.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-11.25ZM28.879 16.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-15.75Z"
		/>
	</svg>
);
export default AverageCompletionRateSvg;
