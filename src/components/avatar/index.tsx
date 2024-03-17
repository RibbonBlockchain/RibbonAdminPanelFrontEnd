import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

interface Props {
	containerClass?: string;
	iconClass?: string;
	imageClass?: string;
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
}

const Avatar: React.FC<Props> = (props) => {
	return (
		<figure
			className={`flex items-center justify-center bg-gray-500 ${
				props.containerClass || ""
			}`}
		>
			{props.src ? (
				<Image
					src={props.src}
					alt={props.alt || ""}
					width={props.width}
					height={props.height}
					className={props.imageClass}
				/>
			) : (
				<FaUser className={props.iconClass} />
			)}
		</figure>
	);
};

export default Avatar;
