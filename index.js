import sdk from 'matrix-js-sdk'


const client = sdk.createClient({
    baseUrl: "http://localhost:8008",
    accessToken: "MDAxN2xvY2F0aW9uIGJhenN1cC5tZQowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjFjaWQgdXNlcl9pZCA9IEBiYXM6YmF6c3VwLm1lCjAwMTZjaWQgdHlwZSA9IGFjY2VzcwowMDIxY2lkIG5vbmNlID0gSiw0LlZEVD1PR1JBbEFPRgowMDJmc2lnbmF0dXJlIPVWKpuWY-M-imTcygTDN8W_Gc1gLWkM3bBnpnvIAiGBCg",
    userId: "@bas:bazsup.me"
});

// const roomOpt = {
//     'room_alias_name': 'test-room'
// }

// client.createRoom(roomOpt, (err, data) => {
//     console.log('err: ', err)
//     console.log('data: ', data)
// })

// const roomId = '!lJVpRiqByHuHfGHDYG:bazsup.me'

client.startClient();

client.once('sync', function(state, prevState, res) {
    console.log('state: ', state); // state will be 'PREPARED' when the client is ready to use
    // var rooms = client.getRooms();
    // testSendMessage()
    // testListenRoomTimeline()
    // testGetRoomTimeline()
    createDirectMessageRoom()
    // rooms.forEach(room => {
    //     console.log(room);
    // });
});

function createDirectMessageRoom() {
    // AvaPa$$w0rd1
    const userId = '@man:bazsup.me'
    client.createRoom({
        preset: 'trusted_private_chat',
        invite: [userId],
        is_direct: true,
    }).then((resp) => {
        console.log('resp: ', resp)
    }).catch((err) => {
        console.log('err: ', err)
    });
}

function testSendMessage() {
    // var testRoomId = "!jhpZBTbckszblMYjMK:bazsup.me";
    const testRoomId = '!lJVpRiqByHuHfGHDYG:bazsup.me'
    
    var content = {
        "body": "Hello World",
        "msgtype": "m.text"
    };
    client.sendEvent(testRoomId, "m.room.message", content, "", (err, res) => {
        console.log(err);
    });
}

function testListenRoomTimeline() {
    const testRoomId = '!lJVpRiqByHuHfGHDYG:bazsup.me'
    client.on("Room.timeline", function(event, room, toStartOfTimeline) {
        // we know we only want to respond to messages
        if (event.getType() !== "m.room.message") {
            return;
        }
    
        // we are only intested in messages from the test room, which start with "!"
        if (event.getRoomId() === testRoomId && event.getContent().body[0] === '!') {
            // sendNotice(event.event.content.body);
            console.log('evnt timeline: ', event.event.content.body)
        }
    });
    
    function sendNotice(body) {
        var content = {
            "body": body.substring(1),
            "msgtype": "m.notice"
        };
        client.sendEvent(testRoomId, "m.room.message", content, "", (err, res) => {
            console.log(err);
        });
    }
}

function testGetRoomTimeline() {
    const testRoomId = '!lJVpRiqByHuHfGHDYG:bazsup.me'
    client.getRoom(testRoomId).timeline.forEach(t => {
        console.log(t.event);
    });
}

// client.on("event", function(event){
//     console.log('eventType: ', event.getType());
//     console.log('event: ', event);
// })
