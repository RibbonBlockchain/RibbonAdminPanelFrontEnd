import { Fetch, methods } from ".";

async function getRewardPartners(token: string) {
	return await Fetch(`/admin/reward-partner`, token);
}

async function sendMassPayment(
	input: { address: string; amount: string }[],
	token: string
) {
	return await Fetch("/admin/reward-partner/0/payout", token, {
		method: methods.POST,
		body: JSON.stringify(input),
	});
}

export const paymentService = {
	sendMassPayment,
	getRewardPartners,
};
