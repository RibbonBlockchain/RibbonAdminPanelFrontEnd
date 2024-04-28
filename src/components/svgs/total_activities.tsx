import React from "react";

const TotalActivitiesSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			width="49"
			height="48"
			viewBox="0 0 49 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect x="0.378906" width="48" height="48" rx="6" fill="#FDF2E7" />
			<path
				d="M32.3789 20.25V30C32.3789 33 30.5889 34 28.3789 34H20.3789C18.1689 34 16.3789 33 16.3789 30V20.25C16.3789 17 18.1689 16.25 20.3789 16.25C20.3789 16.87 20.6289 17.43 21.0389 17.84C21.4489 18.25 22.0089 18.5 22.6289 18.5H26.1289C27.3689 18.5 28.3789 17.49 28.3789 16.25C30.5889 16.25 32.3789 17 32.3789 20.25Z"
				stroke="#292D32"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M28.3789 16.25C28.3789 17.49 27.3689 18.5 26.1289 18.5H22.6289C22.0089 18.5 21.4489 18.25 21.0389 17.84C20.6289 17.43 20.3789 16.87 20.3789 16.25C20.3789 15.01 21.3889 14 22.6289 14H26.1289C26.7489 14 27.3089 14.25 27.7189 14.66C28.1289 15.07 28.3789 15.63 28.3789 16.25Z"
				stroke="#292D32"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M20.3789 25H24.3789"
				stroke="#292D32"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M20.3789 29H28.3789"
				stroke="#292D32"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default TotalActivitiesSvg;
