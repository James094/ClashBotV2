const Socket = require('ws');

class WebSocket
{
    /*
    Initializes a new instance of the Database
    */

    constructor(parent)
    {
        this.parent = parent
    }

    /*
    Starts the Database Server
    */

    start()
    {
        this.connection = new Socket('ws://localhost:8080/wsserver');

        this.connection.on('connection', this.onConnection.bind(this));
        this.connection.on('open', this.onOpen.bind(this));
        this.connection.on('message', this.onMessage.bind(this));
        this.connection.on('close', this.onClose.bind(this));
    }

    onBoot()
    {
        Logger.info(`WebSocket server successfully started on port 9091!`.green);
    }

    onOpen()
    {
        this.connection.send('something');
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

}

module.exports = WebSocket;
