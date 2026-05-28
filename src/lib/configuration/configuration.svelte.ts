import { configurationDefault } from "./configuration-default";
import type { Configuration, ConfigurationProvider } from "./models";

export const configuration = $state<Configuration>({ ...configurationDefault });

export async function loadConfiguration(provider: ConfigurationProvider) {
  try {
    Object.assign(configuration, await provider.load());
  } catch {
    console.warn('Failed to load configuration, using defaults');
  }
}
