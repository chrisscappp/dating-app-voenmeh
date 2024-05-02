export interface NotificationType {
	message: string;
	notificationId: number;
}

export interface NotificationsSchema {
	notifications?: NotificationType[]
	error?: string;
	isLoading: boolean;
}