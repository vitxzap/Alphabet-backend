import { Injectable } from "@nestjs/common";
import {CacheModuleOptions, CacheOptionsFactory} from "@nestjs/cache-manager"
import { ConfigService } from "@nestjs/config";
import KeyvRedis from "@keyv/redis" 
@Injectable()
class CacheConfigService implements CacheOptionsFactory {
    constructor (private readonly configService: ConfigService) {}
    createCacheOptions(): CacheModuleOptions {
        return {
            stores: [
                new KeyvRedis("",{
                    
                })
            ]
        }
    }
}