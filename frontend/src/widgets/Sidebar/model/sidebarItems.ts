import { SidebarItemType } from "./types"
import LikesIcon from "shared/assets/icons/my-likes-icon.svg"
import SymphatyIcon from "shared/assets/icons/my-sympathy-icon.svg"
import FriendIcon from "shared/assets/icons/my-friends-icon.svg"
import SupportIcon from "shared/assets/icons/support-icon.svg"
import LogoutIcon from "shared/assets/icons/logout-icon-sidebar.svg"
import { routerPath } from "shared/config/routeConfig/routeConfig"

export const sidebarItemList: SidebarItemType[] = [
	{
		Icon: LikesIcon,
		path: routerPath.likes,
		text: "Мои лайки"
	},
	{
		Icon: SymphatyIcon,
		path: routerPath.symphaty,
		text: "Мои симпатии"
	},
	{
		Icon: FriendIcon,
		path: routerPath.friends,
		text: "Мои друзья"
	},
	{
		Icon: SupportIcon,
		path: "/",
		text: "Тех поддержка"
	},
	{
		Icon: LogoutIcon,
		path: "/logout",
		text: "Выйти"
	}
]