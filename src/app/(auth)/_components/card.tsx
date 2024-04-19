import Image from "next/image";
import RibbonLogo from "@/public/images/ribbon.webp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
	bgColor: string;
	title?: string;
};
const AuthCard: React.FC<React.PropsWithChildren<Props>> = (props) => {
	return (
		<Card
			className={`flex flex-grow flex-col gap-8 overflow-hidden rounded-lg p-8 shadow-md ${props.bgColor} max-w-lg`}
		>
			<CardHeader className=" self-center">
				<Image src={RibbonLogo} alt="" className="w-36" priority />
			</CardHeader>
			{props.title && (
				<CardTitle className="text-center text-2xl capitalize text-gray-800">
					{props.title}
				</CardTitle>
			)}
			<CardContent className="p-0">{props.children}</CardContent>
		</Card>
	);
};

export default AuthCard;
