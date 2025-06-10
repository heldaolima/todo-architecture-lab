import { Injectable } from "@nestjs/common";

@Injectable()
export class PluginRegistry {
    private registry = new Map<string, any>();

    registerPlugin(type: string, plugin: any) {
        this.registry.set(type, plugin)
    }

    getPlugin<T>(type: string): T {
        return this.registry.get(type) || null
    }
}