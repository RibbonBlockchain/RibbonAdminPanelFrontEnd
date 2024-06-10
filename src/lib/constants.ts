import HomeSvg from "@/components/svgs/home";
import urls from "./urls";
import RewardPointSvg from "@/components/svgs/reward_points";
import QuestionnaireSvg from "@/components/svgs/questionnaire";
import SurveySvg from "@/components/svgs/survey";
import TaskSvg from "@/components/svgs/task";
import { ResponseType } from "@/types/enums";
import { HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";
import { IoMdRadioButtonOn, IoMdTime } from "react-icons/io";
import { IoCalendarOutline, IoCheckboxOutline } from "react-icons/io5";
import RoundBoxSvg from "@/components/svgs/round_box";
import BubbleBoxSvg from "@/components/svgs/bubble_box";
import LogoutModal from "@/app/(dashboard)/_components/logout_modal";
import SendNotificationSvg from "@/components/svgs/send_notifications";
import RatingOverviewSvg from "@/components/svgs/rating_overview";
import CPIndexSvg from "@/components/svgs/cp_index";
import UsdcSvg from "@/components/svgs/usdc";
import UsdtSvg from "@/components/svgs/usdt";
import WorldCoinSvg from "@/components/svgs/worldcoin";
import { CreateVaultSchemaType } from "@/schemas";
// import { HiHome, HiTrophy } from "react-icons/hi2";
// import { PiScrollFill } from "react-icons/pi";
// import { RiQuestionnaireFill } from "react-icons/ri";
// import { IoIosListBox } from "react-icons/io";

export const nav_links = [
	{
		name: "Home",
		href: urls.dashboard.home,
		image: HomeSvg,
	},
	{
		name: "Reward partners",
		href: urls.dashboard.reward_partners.index,
		image: RewardPointSvg,
	},
	{
		name: "Questionnaires",
		href: urls.dashboard.questionnaires.index,
		image: QuestionnaireSvg,
	},
	{
		name: "Surveys",
		href: urls.dashboard.surveys.index,
		image: SurveySvg,
	},
	{
		name: "Tasks",
		href: urls.dashboard.tasks.index,
		image: TaskSvg,
	},
	{
		name: "Ratings Overview",
		href: urls.dashboard.ratings.index,
		image: RatingOverviewSvg,
	},
	{
		name: "CP Index",
		href: urls.dashboard.cp_index.index,
		image: CPIndexSvg,
	},
	{
		name: "Send Notification",
		href: urls.dashboard.send_notification,
		image: SendNotificationSvg,
	},
];

export const sidebar_actions = [
	{
		name: "Logout",
		component: LogoutModal,
	},
];

export const response_types = [
	{
		value: ResponseType.SHORT_TEXT,
		name: "Short text response",
		icon: HiOutlineMenuAlt2,
	},
	{
		value: ResponseType.LONG_TEXT,
		name: "Long text response",
		icon: HiOutlineMenu,
	},
	{
		value: ResponseType.RADIO,
		name: "Multiple choices",
		icon: IoMdRadioButtonOn,
	},
	{
		value: ResponseType.CHECK_BOX,
		name: "Checkboxes",
		icon: IoCheckboxOutline,
	},
	{
		value: ResponseType.ROUND_BOX,
		name: "Round box",
		icon: RoundBoxSvg,
	},
	{
		value: ResponseType.BUBBLES,
		name: "Bubbles",
		icon: BubbleBoxSvg,
	},
	{
		value: ResponseType.DATE,
		name: "Date",
		icon: IoCalendarOutline,
	},
	{
		value: ResponseType.TIME,
		name: "Time",
		icon: IoMdTime,
	},
	{
		value: ResponseType.BOOLEAN,
		name: "Boolean",
		icon: IoCheckboxOutline,
	},
	{
		value: ResponseType.MULTISELECT,
		name: "Multiple selections",
		icon: IoCheckboxOutline,
	},
];

export const months = [
	{ id: "Jan", name: "January" },
	{ id: "Feb", name: "February" },
	{ id: "Mar", name: "March" },
	{ id: "Apr", name: "April" },
	{ id: "May", name: "May" },
	{ id: "Jun", name: "June" },
	{ id: "Jul", name: "July" },
	{ id: "Aug", name: "August" },
	{ id: "Sep", name: "September" },
	{ id: "Oct", name: "October" },
	{ id: "Nov", name: "November" },
	{ id: "Dec", name: "December" },
];

export const reward_partner_input: Required<CreateVaultSchemaType["type"]>[] = [
	{
		id: 1,
		image: WorldCoinSvg,
		name: "Worldcoin",
		ticker: "WLD",
		point_per_coin: 5000,
		address: process.env.NEXT_PUBLIC_WORLD_COIN_ADDRESS,
	},
	{
		id: 2,
		image: UsdtSvg,
		name: "USDT",
		ticker: "USDT",
		point_per_coin: 10,
		address: process.env.NEXT_PUBLIC_USDT_ADDRESS,
	},
	{
		id: 3,
		image: UsdcSvg,
		name: "USDC",
		ticker: "USDC",
		point_per_coin: 10.5,
		address: process.env.NEXT_PUBLIC_USDC_ADDRESS,
	},
];
