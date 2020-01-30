import * as io from 'socket.io-client';
import * as Rx from "rxjs";

export class MessageService {
    private socket;

    public status$ = new Rx.BehaviorSubject(false);

    constructor() {

        this.socket = io({ transports: ['websocket'], upgrade: false });
        this.socket.on('connectStatus', function (data) {
            console.log(data);
        });

        this.socket.on('messageStatus', (data) => {
            this.status$.next(data);
        });

    }

    getStatus() {
        return this.status$;
    }

    public sendMessage(email) {
        this.socket.emit('new-message', email);
    }

}