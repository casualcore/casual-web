import * as Casual from './casual.models';

export type Instance = {
  instance: Casual.Instance,
  alias: string,
}

export type ServiceInstace = {
  type: "sequential" | "concurrent",
  instance: Casual.ServiceInstance,
}

export type GroupMember = {
  type: "server" | "executable",
  member: Casual.Server | Casual.Executable
};
