export type Configuration = {
  read_only: boolean,
};

export interface ConfigurationProvider {
  load: () => Promise<Configuration>,
};
