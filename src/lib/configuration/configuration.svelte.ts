import { configurationDefault } from "./configuration-default";
import type { Configuration, ConfigurationProvider } from "./models";

export const configuration = $state<Configuration>({ ...configurationDefault });

export async function loadConfiguration(provider: ConfigurationProvider) {
  try {
    const config = await provider.load();
    const pruned = prune(config);
    Object.assign(configuration, pruned);
  } catch {
    console.warn('Failed to load configuration, using defaults');
  }
}

// Prune unexpected properties
function prune(input: Partial<Configuration>): Configuration {
  const keys = Object.keys(configurationDefault) as Array<keyof Configuration>;

  return Object.fromEntries(
    keys.map((key) => [key, input[key] ?? configurationDefault[key]])
  ) as Configuration;
}
