import { Inject, Injectable, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import chalk from 'chalk';
import CliTable3 from 'cli-table3';
import console from 'console';
import path from 'path';
import { NestListRoutesModuleOptions } from './interfaces/nest-list-routes-options.interface';
import { HttpMethod } from './types/http-method.type';

@Injectable()
export class NestListRoutesService implements OnApplicationBootstrap {
    constructor(private discoveryService: DiscoveryService, @Inject('NEST_LIST_ROUTES_OPTIONS') private options: NestListRoutesModuleOptions) { }

    onApplicationBootstrap() {
        // Called once all modules have been initialized, but before listening for connections.
        if (this.options.print) {
            this.#print();
        }
    }

    #print() {
        let headers: string[] = ['Method', 'Path'];
        if (this.options.metadataKeys && this.options.metadataKeys.length > 0) {
            headers = [...headers, ...this.options.metadataKeys];
        }

        const rows = this.#discoveryDecoratorsWithMetaAtKey(this.options.metadataKeys);

        this.#output(headers, rows);
    }

    #discoveryDecoratorsWithMetaAtKey(metadataKeys: string[] | undefined) {
        const decorators: any[] = [];

        const scanner = new MetadataScanner();
        const controllers = this.discoveryService.getControllers();

        controllers.forEach((controller) => {
            const controllerPath = Reflect.getMetadata(PATH_METADATA, controller.metatype);

            const methodNames = scanner.getAllMethodNames(controller.instance);
            methodNames.forEach((methodName: string) => {
                const requestMethod = RequestMethod[Reflect.getMetadata(METHOD_METADATA, controller.instance[methodName])];
                const styledMethod = this.#colorHttpMethod(requestMethod as HttpMethod);

                const methodPath = Reflect.getMetadata(PATH_METADATA, controller.instance[methodName]);
                // Use path.posix to ensure slashes are used instead of backslashes on Windows.
                const joinedPath = path.posix.join('/' + controllerPath, methodPath);
                // Use normalize to remove duplicate slashes after joining.
                const normalizedPath = path.posix.normalize(joinedPath);
                // Remove the trailing slash.
                const routePath = normalizedPath.replace(/\/+$/, '');

                const data = [styledMethod, routePath];

                if (metadataKeys && metadataKeys.length > 0) {
                    metadataKeys.forEach((metadataKey: string) => {
                        const metadataValue = Reflect.getMetadata(metadataKey, controller.instance, methodName);
                        data.push(metadataValue);
                    });
                }

                decorators.push(data);
            });
        });

        return decorators;
    }

    #colorHttpMethod(httpMethod: HttpMethod) {
        const colorMap: Record<HttpMethod, string> = {
            GET: chalk.green('GET'),
            POST: chalk.yellow('POST'),
            PUT: chalk.blue('PUT'),
            PATCH: chalk.magenta('PATCH'),
            DELETE: chalk.red('DELETE'),
            HEAD: chalk.green('HEAD'),
            OPTIONS: chalk.cyan('OPTIONS'),
        };

        return colorMap[httpMethod];
    }

    #output(headers: string[], rows: any[][]) {
        const table = new CliTable3({
            head: headers.map(x => chalk.underline(x)),
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
        });

        rows.forEach((row: any[]) => {
            table.push(row);
        });

        console.log(table.toString());
    }
}
