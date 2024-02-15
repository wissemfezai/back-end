import { Logger, UseGuards } from '@nestjs/common';

import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Roles, RoleType } from '../../security';
import { WsAuthGuard } from '../../security/guards/ws/ws-auth.guard';
import { WsRolesGuard } from '../../security/guards/ws/ws-roles.guard';

@WebSocketGateway(4000)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('AppGateway');

    @WebSocketServer() server: Server;

    @SubscribeMessage('test')
    handleMessageTest(): void {
        this.logger.log(`Message from client test`);
        this.server.emit('message-to-client');
    }

    @SubscribeMessage('event')
    handleMessage(@MessageBody() payload: string): void {
        this.logger.log(`Message from client: ${JSON.stringify(payload)}`);

        this.server.emit('message-to-client', JSON.stringify(payload));
    }

    @UseGuards(WsAuthGuard, WsRolesGuard)
    @Roles(RoleType.SUPER_ADMIN, RoleType.ADMIN)
    handleConnection(client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }

    afterInit(): void {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}