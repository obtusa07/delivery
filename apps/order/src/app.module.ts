import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                HTTP_PORT: Joi.number().required(),
                USER_HOST: Joi.string().required(),
                USER_TCP_PORT: Joi.number().required(),
                DB_URL: Joi.string().required(),
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow('DB_URL'),
            }),
            inject: [ConfigService],
        }),
        ClientsModule.registerAsync({
            clients: [{
                name: 'USER_SERVICE',
                useFactory: (ConfigService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: ConfigService.getOrThrow<string>('USER_HOST'),
                        port: ConfigService.getOrThrow<number>('USER_TCP_PORT'),
                    }
                })
            }],
            isGlobal: true,
        }),
        OrderModule
    ],
})
export class AppModule { }