"use client";

import { useToken } from "@/components/providers/token";
import ErrorScreen from "@/components/sections/error";
import { cpIndexService } from "@/services/cp_index";
import { useQuery } from "@tanstack/react-query";
import { Button, Select, Space, Table, TableColumnsType } from "antd";
import React from "react";

type Props = {};

const CPIndexPage: React.FC<Props> = (props) => {
	const { token } = useToken();
	const [country, setCountry] = React.useState("");
	const [year, setYear] = React.useState(0);

	const {
		data: cpiCountries,
		isPending,
		error,
		refetch: refetchCountries,
	} = useQuery({
		queryKey: ["cp-index-countries"],
		queryFn: () => cpIndexService.getSupportedCPICountries(token || ""),
		enabled: !!token,
	});

	const {
		data: cpiData,
		error: cpiError,
		refetch: refetchCPIData,
	} = useQuery({
		queryKey: ["cp-index-data", { year, country }],
		queryFn: () => cpIndexService.getAll(year, country, token || ""),
		enabled: false, // Disable automatic fetching
	});

	function getSupportedYears(countryName: string) {
		const country = cpiCountries?.data?.find((c) => c.name === countryName);
		if (country) return country.years;
		else return [];
	}

	const countries = cpiCountries?.data?.map((c) => c.name);

	if (error) return <ErrorScreen error={error} reset={refetchCountries} />;
	if (cpiError) return <ErrorScreen error={cpiError} reset={refetchCPIData} />;

	const handleSearch = () => {
		// Trigger the CPI data query manually
		refetchCPIData();
	};

	interface DataType {
		category: string;
	}

	const cpiCategory = [
		"CONSUMER_PRICE_INDEX",
		"FOOD_AND_BEVERAGES",
		"ALCOHOL_TOBACCO_NARCOTICS",
		"CLOTHING_AND_FOOTWEAR",
		"HOUSING_AND_UTILITIES",
		"FURNISHINGS_AND_MAINTENANCE",
		"HEALTH",
		"TRANSPORT",
		"COMMUNICATION",
		"RECREATION_AND_CULTURE",
		"EDUCATION",
		"RESTAURANTS_AND_HOTELS",
		"MISCELLANEOUS_GOODS_AND_SERVICES",
	] as const;

	const columns: TableColumnsType<DataType> = [
		{
			title: "Category",
			width: 300,
			dataIndex: "category",
			key: "category",
			fixed: "left",
			rowScope: "row",
		},
		{ title: "Jan", width: 100, dataIndex: "Jan", key: "Jan" },
		{ title: "Feb", width: 100, dataIndex: "Feb", key: "Feb" },
		{ title: "Mar", width: 100, dataIndex: "Mar", key: "Mar" },
		{ title: "Apr", width: 100, dataIndex: "Apr", key: "Apr" },
		{ title: "May", width: 100, dataIndex: "May", key: "May" },
		{ title: "Jun", width: 100, dataIndex: "Jun", key: "Jun" },
		{ title: "Jul", width: 100, dataIndex: "Jul", key: "Jul" },
		{ title: "Aug", width: 100, dataIndex: "Aug", key: "Aug" },
		{ title: "Sep", width: 100, dataIndex: "Sep", key: "Sep" },
		{ title: "Oct", width: 100, dataIndex: "Oct", key: "Oct" },
		{ title: "Nov", width: 100, dataIndex: "Nov", key: "Nov" },
		{ title: "Dec", width: 100, dataIndex: "Dec", key: "Dec" },
	];

	const data: DataType[] = cpiCategory?.map((c) => {
		const categoryData = cpiData?.data?.filter((d) => d.category === c);

		const monthValues = {
			Jan: categoryData?.find((d) => d.month === 1)?.value || "-",
			Feb: categoryData?.find((d) => d.month === 2)?.value || "-",
			Mar: categoryData?.find((d) => d.month === 3)?.value || "-",
			Apr: categoryData?.find((d) => d.month === 4)?.value || "-",
			May: categoryData?.find((d) => d.month === 5)?.value || "-",
			Jun: categoryData?.find((d) => d.month === 6)?.value || "-",
			Jul: categoryData?.find((d) => d.month === 7)?.value || "-",
			Aug: categoryData?.find((d) => d.month === 8)?.value || "-",
			Sep: categoryData?.find((d) => d.month === 9)?.value || "-",
			Oct: categoryData?.find((d) => d.month === 10)?.value || "-",
			Nov: categoryData?.find((d) => d.month === 11)?.value || "-",
			Dec: categoryData?.find((d) => d.month === 12)?.value || "-",
		};

		return {
			key: c,
			category: c,
			...monthValues,
		};
	});

	return (
		<div className="mx-4">
			<Space style={{ marginBottom: 16 }}>
				<Select
					onChange={(val) => setCountry(val)}
					placeholder="Select Country"
					options={countries?.map((c) => ({
						label: c,
						value: c,
					}))}
				/>
				<Select
					onChange={(val) => setYear(val)}
					placeholder="Select Year"
					onSelect={handleSearch}
					options={getSupportedYears(country)?.map((c) => ({
						label: c,
						value: c,
					}))}
				/>
				{/* <Button onClick={handleSearch}>Search</Button> */}
			</Space>
			<Table
				columns={columns}
				dataSource={data}
				scroll={{ x: 1300 }}
				pagination={{
					pageSize: 10,
				}}
			/>
		</div>
	);
};

export default CPIndexPage;
