import { getContext, setContext } from "svelte";
import { 
  type Server,
  type Service,
  type ServiceInstance,
  type DomainState,
  type ServiceState,
} from "./casual.models";

import * as Ui from './ui.models';

const initalDomainState: DomainState = {
  version: {
    casual: "",
    compiler: "",
    commit: "",
  },
  identity: {
    id: "",
    name: "",
  },
  groups: [],
  executables: [],
  servers: [],
}

const initialServiceState: ServiceState = {
  instances: {
    concurrent: [],
    sequential: [],
  },
  services: [],
};

export class Casual {
  domainState = $state<DomainState>(initalDomainState);
  serviceState = $state<ServiceState>(initialServiceState);

  constructor() {
    this.loadState();
  }

  refresh() {
    this.loadState();
  }

  private async loadState() {
    this.loadDomainState();
    this.loadServiceState();
    // this.loadGatewayState();
  }

  private async get(service: string) {
    const response = await fetch(`/${service}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  }

  private async loadDomainState() {
    const response = await this.get(".casual/domain/state");
    this.domainState = response.result;
  }

  private async loadServiceState() {
    const response = await this.get(".casual/service/state");
    this.serviceState = response.result;
  }

  private async loadGatewayState() {
    const result = await this.get(".casual/gateway/state");
  }

  instances(): Ui.Instance[] {
    const instances = [];

    for (const server of this.domainState.servers) {
      instances.push(
        ...server.instances.map(instance => ({
          instance,
          alias: server.alias,
        }))
      );
    }

    return instances;
  }

  serverInstances = (serverId: number): Ui.Instance[] => {
    const server = this.domainState.servers.find(server => server.id === serverId);
    
    return server?.instances
      .map(instance => ({
        instance,
        alias: server.alias,
      })) ?? [];
  };

  executableInstances = (executableId: number): Ui.Instance[] => {
    const executable = this.domainState.executables.find(executable => executable.id === executableId);
    
    return executable?.instances
      .map(instance => ({
        instance,
        alias: executable.alias,
      })) ?? [];
  };

  serverByInstance(instance: ServiceInstance | undefined): Server {
    return this.domainState.servers.find(server => server.instances.find(i => i.handle.pid === instance?.process.pid))!;
  }

  servicesByInstance(instance: ServiceInstance | undefined): Service[] {
    return [
      ...this.serviceState.services.filter(service => 
        service.instances.sequential.find(i => i.process.ipc === instance?.process.ipc) ||
        service.instances.concurrent.find(i => i.process.ipc === instance?.process.ipc)
      )
    ]
  }

  groupMembers(groupId: number): Ui.GroupMember[] {
    return [
      ...this.domainState.servers
        .filter(s => s.memberships.includes(groupId))
        .map(member => ({ type: "server", member }) as Ui.GroupMember),
      ...this.domainState.executables
        .filter(s => s.memberships.includes(groupId))
        .map(member => ({ type: "executable", member }) as Ui.GroupMember),
    ]
  }
}

const CASUAL_KEY = Symbol('CASUAL');

export function setCasualState() {
	return setContext(CASUAL_KEY, new Casual());
}

export function getCasualState() {
	return getContext<ReturnType<typeof setCasualState>>(CASUAL_KEY);
}
