import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import SendNotificationForm from "./_component/form";

const SendNotificationsPage = () => {
	return (
		<>
			<Header>Send Notification</Header>

			<section className="mt-16 flex w-full items-center justify-center px-4">
				<Card className="w-full max-w-3xl">
					<CardHeader className="px-12">
						<CardTitle>New Notification</CardTitle>
					</CardHeader>
					<CardContent className="px-12">
						<SendNotificationForm />
					</CardContent>
				</Card>
			</section>
		</>
	);
};

export default SendNotificationsPage;
