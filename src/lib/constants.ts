import urls from "./urls";
import { HiHome, HiTrophy } from "react-icons/hi2";
import { PiScrollFill } from "react-icons/pi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { IoIosListBox } from "react-icons/io";

export const nav_links = [
	{
		name: "Home",
		href: urls.dashboard.home,
		image: HiHome,
	},
	{
		name: "Reward points",
		href: urls.dashboard.reward_points,
		image: HiTrophy,
	},
	{
		name: "Questionnaires",
		href: urls.dashboard.questionnaires,
		image: RiQuestionnaireFill,
	},
	{
		name: "Surveys",
		href: urls.dashboard.surveys,
		image: PiScrollFill,
	},
	{
		name: "Tasks",
		href: urls.dashboard.tasks,
		image: IoIosListBox,
		imageClass: "fill",
	},
];
