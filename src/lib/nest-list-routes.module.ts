import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { NestListRoutesModuleOptions } from './interfaces/nest-list-routes-options.interface';
import { NestListRoutesService } from './nest-list-routes.service';

@Module({})
export class NestListRoutesModule {
    static forRoot(options?: NestListRoutesModuleOptions): DynamicModule {
        const optionsWithDefaults = {
            print: true,
            metatypes: [],
            ...options,
        };

        return {
            module: NestListRoutesModule,
            providers: [
                DiscoveryService,
                {
                    provide: 'NEST_LIST_ROUTES_OPTIONS',
                    useValue: optionsWithDefaults,
                },
                NestListRoutesService,
            ],
        };
    }
}
