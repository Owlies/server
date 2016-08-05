local skynet = require "skynet"
local startTime = 0


local function update()
	skynet.timeout(20, update)
	local currentTime = skynet.now()
	local second = (currentTime - startTime) / 100
	print(second)
	
	if (currentTime - startTime> 1000) then
		print("game over!")
		skynet.exit()
	end
end

skynet.start(function()
	
	startTime = skynet.now()
	print("game start")
	update()

end)
