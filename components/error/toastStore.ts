export type ToastType = 'error' | 'warning' | 'success';

export type ToastItem = {
  id: number;
  type: ToastType;
  hi: string;
  en?: string;
};

let listeners: ((msgs: ToastItem[]) => void)[] = [];
let messages: ToastItem[] = [];

export function subscribe(fn: (msgs: ToastItem[]) => void) {
  listeners.push(fn);
  fn(messages);

  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function removeToast(id: number) {
  messages = messages.filter((m) => m.id !== id);
  notify();
}

function notify() {
  listeners.forEach((l) => l([...messages]));
}

export function addToast(item: Omit<ToastItem, 'id'>) {
  const newItem = { ...item, id: Date.now() };
  messages = [...messages, newItem];
  notify();

  setTimeout(() => {
    messages = messages.filter((m) => m.id !== newItem.id);
    notify();
  }, 3000);
}
