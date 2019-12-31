import { InjectorModule } from '../injector.module';
import { ConnectionService } from '../services/connection.service';

export function EnableOffline(cls: Function) {
    return function(target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const connectionService = InjectorModule.injector.get(ConnectionService);
            const offlineService = InjectorModule.injector.get(cls);

            if (connectionService && !connectionService.isOnline()) {
                if (offlineService[key]) {
                    return offlineService[key].apply(offlineService, args);
                } else {
                    console.warn(`@EnableOffline cannot find ${String(key)} method.`);
                }
            } else {
                return original.apply(this, args);
            }
        };

        return descriptor;
    };
}
