"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import QrCode from "qrcode";

const QRCode = () => {
	const [src, setSrc] = React.useState<string>("");

	useEffect(() => {
		QrCode.toDataURL("0x1234").then(setSrc);
	}, []);

	return (
		<>
			<h3 className="flex gap-x-2 self-center">
				<Image
					src={""}
					alt=""
					width={28}
					height={28}
					className="size-7 rounded-full"
				/>
				<span className="font-semibold italic">Optimism</span>
			</h3>
			{src && (
				<figure className="flex flex-col items-center justify-center self-center">
					<Image
						src={src}
						alt=""
						width={200}
						height={200}
						className="size-40 object-cover object-center"
					/>
					<figcaption className="text-base font-medium">
						Scan address to deposit payment
					</figcaption>
				</figure>
			)}
		</>
	);
};

export default QRCode;
