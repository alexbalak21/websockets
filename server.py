import asyncio
from websockets.server import serve


async def echo(websocket):
    async for message in websocket:
        response = "Response from the server."
        print("Client sent:")
        print(message)
        await websocket.send(response)


async def main():
    async with serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
