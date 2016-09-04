local skynet = require "skynet"
require "skynet.manager"
local protobufLoader = require "owlies.protobufLoader"
local max_client = 64

skynet.start(function()
	print("game start")
    protobufLoader.testFunction();
    local watchdog = skynet.newservice("owlies-lua-watchdog")
	skynet.call(watchdog, "lua", "start", {
		port = 8888,
		maxclient = max_client,
		nodelay = true,
	})
end)