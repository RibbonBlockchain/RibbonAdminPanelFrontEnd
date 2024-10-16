import React from "react";

const FundingHistorySvg: React.FC = (props) => {
	return (
		<svg
			width="41"
			height="41"
			viewBox="0 0 41 41"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="#F2EEFF" />
			<g clipPath="url(#clip0_2346_23998)">
				<path
					d="M21.1336 31.176C21.0229 31.3773 20.8107 31.5017 20.581 31.4999C20.3513 31.4981 20.1411 31.3704 20.0336 31.1673L16.8088 25.0761L21.8267 20.0581C22.0708 19.814 22.0708 19.4183 21.8267 19.1742C21.5827 18.9302 21.1869 18.9302 20.9429 19.1742L15.9249 24.1922L9.83388 20.9675C9.63084 20.86 9.50314 20.6498 9.50133 20.4201C9.49951 20.1903 9.62388 19.9781 9.8252 19.8675C14.9191 17.067 20.3925 15.2092 25.9896 14.294C26.1881 14.2616 26.3901 14.3267 26.5324 14.4689C26.6746 14.6112 26.7397 14.8132 26.7072 15.0117C25.792 20.6088 23.9342 26.0822 21.1336 31.176Z"
					fill="#7C56FE"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2346_23998">
					<rect
						width="20"
						height="20"
						fill="white"
						transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.5 34.6421)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default FundingHistorySvg;
