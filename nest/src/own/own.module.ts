import { Module } from '@nestjs/common';
import {OwnController} from "./own.controller";
import {OwnService} from "./own.service";

@Module({
    imports: [],
    controllers: [OwnController],
    providers: [OwnService],
})
export class OwnModule {}
