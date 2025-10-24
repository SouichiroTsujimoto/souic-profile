// View Transitions API の型定義
interface ViewTransition {
	finished: Promise<void>;
	ready: Promise<void>;
	updateCallbackDone: Promise<void>;
	skipTransition: () => void;
}

interface Document {
	startViewTransition(callback: () => void | Promise<void>): ViewTransition;
}
