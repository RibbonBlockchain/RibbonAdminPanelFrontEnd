import { GetRatingOverviewResponse } from "@/types/response";
import { Fetch } from ".";

async function getOverview(type: "q" | "s" | "t" = "q", token: string) {
	return await Fetch<GetRatingOverviewResponse>(
		`/admin/rating/overview?type=${type}`,
		token
	);
}

export const ratingService = {
	getOverview,
};
