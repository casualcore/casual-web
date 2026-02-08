export type DomainState = {
  version: Version,
  identity: Identity,
  groups: Group[],
  executables: Executable[],
  servers: Server[],
};

export type ServiceState = {
  instances: ServiceInstances,
  services: Service[],
};

export type Group = {
  id: number,
  name: string,
  note: string,
  enabled: boolean,
  dependencies: number[],
};

export type Server = {
  id: number,
  alias: string,
  path: string,
  arguments: string[],
  note: string,
  memberships: number[],
  enabled: boolean,
  restart: boolean,
  restarts: number,
  instances: Instance[],
  resources: string[],
};

export type Executable = {
  id: number,
  alias: string,
  path: string,
  arguments: string[],
  note: string,
  memberships: number[],
  enabled: boolean,
  restart: boolean,
  restarts: number,
  instances: Instance[],
};

export type Instance = {
  handle: Process,
  state: number,
  spawnpoint: number,
};

export type Version = {
  casual: string,
  compiler: string,
  commit: string,
};

export type Identity = {
  id: string,
  name: string,
};

export type Service = {
  name: string,
  instances: ServiceInstances,
  category: string,
  transaction: 0 | 1 | 2 | 3,
  visibility: number, // set of values?
  metric: Metric,
};

export type ServiceInstances = {
  sequential: ServiceInstance[],
  concurrent: ServiceInstance[],
};

export type ServiceInstance = {
  process: Process,
  alias: string,
  description?: string, // concurrent
  state?: number, // sequential
};

export type Process = {
  pid: number,
  ipc: string,
};

export type Metric = {
  invoked: MetricDetails,
  pending: MetricDetails,
  last: number,
  remote: number,
};

export type MetricDetails = {
  count: number,
  total: number,
  limit: {
    min: number,
    max: number,
  },
};
