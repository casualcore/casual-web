import type { ConfigurationProvider } from "./models";

export const provider: ConfigurationProvider = {
  load: async () => {
    return (await fetch('/configuration.json')).json();
  }
};
