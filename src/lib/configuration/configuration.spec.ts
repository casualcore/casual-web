import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ConfigurationProvider } from './models';

// Match exports from configuration module
let configuration: any;
let loadConfiguration: (provider: ConfigurationProvider) => Promise<void>;

beforeEach(async () => {
  vi.resetModules();
  const mod = await import('./configuration.svelte');
  configuration = mod.configuration;
  loadConfiguration = mod.loadConfiguration;
});

describe('configuration state', () => {
  it('exports the default configuration state', () => {
    expect(configuration.read_only).toBe(true);
  });

  it('exports the default configration on load failure', async () => {
    await loadConfiguration({
      load: async () => { throw new Error() }
    } as ConfigurationProvider);

    expect(configuration.read_only).toBe(true);
  });

  it('sets loaded configuration', async() => {
    await loadConfiguration({
      load: async () => ({
        read_only: false
      })
    } as ConfigurationProvider);

    expect(configuration.read_only).toBe(false);
  });

  it('merges default with loaded configuration', async() => {
    await loadConfiguration({
      load: async () => ({})
    } as ConfigurationProvider);

    expect(configuration.read_only).toBe(true);
  });

  it('ignores extra properties returned by the provider', async() => {
    await loadConfiguration({
      load: async () => ({
        read_only: false,
        extra_flag: true,
      })
    } as ConfigurationProvider);

    expect(configuration.read_only).toBe(false);
    expect((configuration as any).extra_flag).toBeUndefined();
  });
});
