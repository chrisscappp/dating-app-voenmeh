export { NotificationsSchema } from "./model/types/types" 
export { notificationsReducer } from "./model/slice/notificationsSlice"
export { getNotificationsError } from "./model/selectors/getNotificationsError/getNotificationsError"
export { getNotificationsIsLoading } from "./model/selectors/getNotificationsIsLoading/getNotificationsIsLoading"
export { getNotificationsList } from "./model/selectors/getNotificationsList/getNotificationsList"
export { fetchNotifications } from "./model/services/fetchNotifications/fetchNotifications"
export { removeNotifications } from "./model/services/removeNotifications/removeNotifications"

export { NotificationsModal } from "./ui/NotificationsModal/NotificationsModal"