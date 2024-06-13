import Image from "next/image";
import React from "react";

type Props = {
	data?: {
		code: string;
		count: number;
		percentage: string;
	}[];
};

const GeographicalDistributionCard: React.FC<Props> = (props) => {
	return (
		<div className="col-span-2 min-h-96 rounded-xl bg-white px-4 py-8">
			<h2 className="text-nowrap text-lg font-bold">
				Geographical distributions
			</h2>

			<ul className="h-full">
				{props.data && props.data.length > 0 ? (
					props.data.map((x, i) => (
						<li
							key={`geographical-distribution-${i}`}
							className="border-b py-4"
						>
							<figure className="flex gap-2">
								<Image
									className="size-7"
									src={""}
									alt=""
									width={28}
									height={28}
								/>
								<figcaption className="flex w-full justify-between gap-4">
									<span className="font-bold">{x.code}</span>
									<span>{x.percentage}</span>
								</figcaption>
							</figure>
						</li>
					))
				) : (
					<li className="flex h-full items-center justify-center">
						No data available
					</li>
				)}
			</ul>
		</div>
	);
};

const data = [
	{
		country: "United States",
		image: "",
		distribution: 35,
	},
	{
		country: "United Kingdom",
		image: "",
		distribution: 27,
	},
	{
		country: "Canada",
		image: "",
		distribution: 70,
	},
	{
		country: "Argentina",
		image: "",
		distribution: 10,
	},
	{
		country: "South Africa",
		image: "",
		distribution: 15,
	},
	{
		country: "Nigeria",
		image: "",
		distribution: 55,
	},
];

export default GeographicalDistributionCard;
