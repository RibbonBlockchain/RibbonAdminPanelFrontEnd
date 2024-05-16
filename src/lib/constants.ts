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
