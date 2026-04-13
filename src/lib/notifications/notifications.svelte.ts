import { getContext, setContext } from "svelte";
import { toast } from "svelte-sonner";

class Notifications {
  info = (message: string) => toast.info(message);
  success = (message: string) => toast.success(message);
  error = (message: string) => toast.error(message);
}

const NOFITICATIONS_KEY = Symbol("NOTIFICATIONS");

export function setNotifications() {
  return setContext(NOFITICATIONS_KEY, new Notifications());
}

export function getNotifications() {
  return getContext<ReturnType<typeof setNotifications>>(NOFITICATIONS_KEY);
}
