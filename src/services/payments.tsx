import { Fetch, methods } from ".";

async function getRewardPartner(token: string) {
	return await Fetch(`/admin/reward-partner/0`, token);
}

async function getRewardPartners(token: string) {
	return await Fetch(`/admin/reward-partner`, token);
}

async function getPaymentHistory(token: string) {
	return await Fetch(`/admin/reward-partner/0/wallet`, token);
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
	getRewardPartner,
	getRewardPartners,
	getPaymentHistory,
};
