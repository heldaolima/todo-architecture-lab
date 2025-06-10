import { Injectable } from "@nestjs/common";

@Injectable()
export class PluginRegistry {
    private registry = new Map<string, any[]>();

    registerPlugin(type: string, plugin: any) {
        if (!this.registry.has(type)) {
            this.registry.set(type, []);
        }
        
        this.registry.get(type)?.push(plugin);
    }

    getPlugins<T>(type: string): T[] {
        return this.registry.get(type) || [];
    }
}