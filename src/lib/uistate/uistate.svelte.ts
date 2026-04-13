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

export const DURATIONS_RESOLUTION = {
  MS: "ms",
  US: "us",
};

export const DURATIONS_RESOLUTION_DECIMALS = {
  [DURATIONS_RESOLUTION.MS]: 3,
  [DURATIONS_RESOLUTION.US]: 6,
};

export class UiState {
  breadcrumbs = $state<Breadcrumb[]>([]);

  showHidden = $state(false);

  durationsResolution = $state(DURATIONS_RESOLUTION.MS);

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
