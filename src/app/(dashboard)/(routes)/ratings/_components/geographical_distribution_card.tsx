import Image from "next/image";
import React from "react";

const GeographicalDistributionCard = () => {
	return (
		<div className="col-span-2 rounded-xl bg-white px-4 py-8">
			<h2 className="text-nowrap text-lg font-bold">
				Geographical distributions
			</h2>

			<ul>
				{data.map((x, i) => (
					<li key={`geographical-distribution-${i}`} className="border-b py-4">
						<figure className="flex gap-2">
							<Image
								className="size-7"
								src={x.image}
								alt=""
								width={28}
								height={28}
							/>
							<figcaption className="flex w-full justify-between gap-4">
								<span className="font-bold">{x.country}</span>
								<span>{x.distribution}%</span>
							</figcaption>
						</figure>
					</li>
				))}
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
