RegisterNUICallback('loadscreenReady', function(data, cb)
    SetNuiFocus(true, true)
    if cb then cb('ok') end
end)

CreateThread(function()
    Wait(1000)
    SetNuiFocus(true, true)

    while true do
        Wait(50)
        local loaded = true

        for i = 0, GetNumResources() - 1 do
            local res = GetResourceByFindIndex(i)
            if res and GetResourceState(res) ~= "started" then
                loaded = false
                break
            end
        end

        if loaded then break end
    end

    Wait(500)
    
    SetNuiFocus(false, false)
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end)