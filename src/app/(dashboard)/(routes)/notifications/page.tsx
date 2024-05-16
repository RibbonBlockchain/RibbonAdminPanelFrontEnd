import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import SendNotificationForm from "./_components/form";
import NotificationHistory from "./_components/notification_history";

export const metadata = {
	title: "Notifications",
	description: "Send and view notifications",
};

const Page = ({
	searchParams,
}: {
	searchParams: { q?: string; page?: string; pageSize?: string };
}) => {
	return (
		<>
			<Header>Send Notification</Header>

			<section className="my-16 flex w-full items-center justify-center px-4">
				<Card className="w-full max-w-5xl pt-12">
					<CardContent className="px-12">
						<SendNotificationForm />
						<hr className="mx-auto my-12 max-w-3xl" />
						<NotificationHistory searchParams={searchParams} />
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default Page;
