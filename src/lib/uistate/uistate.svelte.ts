import { getContext, setContext } from "svelte";

type Breadcrumb = {
  url?: string,
  title: string | undefined,
};

export const pages = {
  groups: {
    url: "/groups",
    title: "Groups",
  },
  servers: {
    url: "/servers",
    title: "Servers",
  },
  executables: {
    url: "/executables",
    title: "Executables",
  },
  instances: {
    url: "/instances",
    title: "Instances",
  },
  services: {
    url: "/services",
    title: "Services",
  }
};

export class UiState {
  breadcrumbs = $state<Breadcrumb[]>([]);

  showHidden = $state(false);

  setBreadcrumb(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbs = breadcrumbs;
  }
}

const UI_STATE = Symbol('UI_STATE');

export function setUiState() {
	return setContext(UI_STATE, new UiState());
}

export function getUiState() {
	return getContext<ReturnType<typeof setUiState>>(UI_STATE);
}
