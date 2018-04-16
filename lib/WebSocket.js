const Socket = require('ws');

class WebSocket
{
    /*
    Initializes a new instance of the WebSocket connection
    */

    constructor(parent)
    {
        this.parent = parent
    }

    /*
    Starts the WebSocket Server
    */

    start()
    {
        this.connection = new Socket('ws://localhost:8080');

        this.connection.on('connection', this.onConnection.bind(this));
        this.connection.on('open', this.onOpen.bind(this));
        this.connection.on('message', this.onMessage.bind(this));
        this.connection.on('close', this.onClose.bind(this));
    }

    onOpen()
    {
        Logger.info('Client online!');
    }

    onConnection(ws)
    {
        let connIp = ws.upgradeReq.connection.remoteAddress;
        Logger.info(`Client connected with address: ${connIp}`.white);
    }

    onMessage(msg)
    {
        console.log(msg);
    }

    onClose(code, reason)
    {
        console.log(reason);
    }

    sendPacket(methodName, parameters)
    {
        let data = {
            'method': methodName,
            'params': parameters
        };

        this.connection.send(JSON.stringify(data));
    }

}

module.exports = WebSocket;