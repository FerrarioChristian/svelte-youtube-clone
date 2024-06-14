export type User = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	image: string;
	age: number;
	email: string;
	gender: string;
	phone: string;
	birthday: string;
};

export type Comment = {
	id: number;
	title?: string;
	body: string;
	tags?: string[];
	reactions?: {
		likes: number;
		dislikes: number;
	};
	views?: number;
	userId: number;
};

export type Video = {
	id: string;
	title: string;
	channelId: number;
};

export type LoginStatus = {
	isLogged: boolean;
	userData?: User;
	authKey?: string;
};

export type Subscription = {
	subscriberId: number;
	channelId: number;
};

export type LikedVideo = {
	likerId: number;
	videoId: string;
};
