import { GetRatingOverviewResponse } from "@/types/response";
import { Fetch } from ".";

async function getOverview(token: string) {
	return await Fetch<GetRatingOverviewResponse>(
		`/admin/rating/overview`,
		token
	);
}

export const ratingService = {
	getOverview,
};
