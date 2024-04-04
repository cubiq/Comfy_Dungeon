from .dungeon import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

import os
import server
from aiohttp import web

WEBROOT = os.path.join(os.path.dirname(os.path.realpath(__file__)), "web")
WEBROOT2 = os.path.join(os.path.dirname(os.path.realpath(__file__)), "web2")

@server.PromptServer.instance.routes.get("/dungeon")
def deungeon_entrance(request):
    return web.FileResponse(os.path.join(WEBROOT, "index.html"))

@server.PromptServer.instance.routes.get("/dungeon2")
def deungeon_entrance(request):
    return web.FileResponse(os.path.join(WEBROOT2, "index.html"))

server.PromptServer.instance.routes.static("/dungeon/css/", path=os.path.join(WEBROOT, "css"))
server.PromptServer.instance.routes.static("/dungeon/js/", path=os.path.join(WEBROOT, "js"))

server.PromptServer.instance.routes.static("/css/", path=os.path.join(WEBROOT2, "css"))
server.PromptServer.instance.routes.static("/js/", path=os.path.join(WEBROOT2, "js"))
server.PromptServer.instance.routes.static("/assets/", path=os.path.join(WEBROOT2, "assets"))
server.PromptServer.instance.routes.static("/workflows/", path=os.path.join(WEBROOT2, "workflows"))


__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS']
