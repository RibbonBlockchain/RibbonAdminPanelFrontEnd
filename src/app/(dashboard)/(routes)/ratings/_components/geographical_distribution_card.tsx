import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { countries } from "@/lib/constants";

type Props = {
	data?: {
		code: string;
		count: number;
		percentage: string;
	}[];
};

const GeographicalDistributionCard: React.FC<Props> = (props) => {
	const formattedData = React.useMemo(() => {
		if (!!props.data && Array.isArray(props.data) && props.data.length > 0) {
			const data = [];
			for (let i = 0; i < props.data?.length; i++) {
				const x = props.data[i];

				const country = countries.find(
					(c) => c.phone.toString() === x.code.slice(1)
				); // Find country

				data.push({
					name: country?.name || x.code,
					count: x.count,
					percentage: x.percentage,
					code: country?.code,
				});
			}

			return data;
		}

		return null;
	}, [props.data]);
	return (
		<div className="col-span-2 min-h-96 rounded-xl bg-white px-4 py-8 shadow">
			<h2 className="text-nowrap text-lg font-bold">
				Geographical distributions
			</h2>

			<ul className="h-full">
				{formattedData && formattedData.length > 0 ? (
					formattedData.map((x, i) => (
						<li
							key={`geographical-distribution-${i}`}
							className="border-b py-4"
						>
							<figure className="flex gap-2">
								{x.code ? (
									<ReactCountryFlag
										countryCode={x.code}
										svg
										className="mt-1 size-5"
									/>
								) : (
									<Image
										className="size-5 border"
										src={""}
										alt=""
										width={28}
										height={28}
									/>
								)}
								<figcaption className="flex w-full justify-between gap-4">
									<span className="font-bold">{x.name}</span>
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
