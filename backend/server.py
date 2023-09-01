import asyncio
from websockets.server import serve
import json
from types import SimpleNamespace

users = []
WEBSOCKET = None


async def connect(name):
    users.append(name)
    response = "{'id': %s,'name':'%s'}" % (len(users)-1, name)
    await WEBSOCKET.send(response)


async def disconnect(name):
    users.remove(name)
    await WEBSOCKET.send(f'{name} Disconnected')


async def listen(websocket):
    global WEBSOCKET
    WEBSOCKET = websocket
    async for message in websocket:
        if "user" in message and "state" in message:
            message = json.loads(message)
            m = SimpleNamespace(**message)
            if m.state:
                await connect(m.user)
            else:
                await disconnect(m.user)


async def main():
    async with serve(listen, "localhost", 8765):
        print("Server Running")
        await asyncio.Future()  # run forever

asyncio.run(main())
