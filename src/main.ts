const m = ModAPI;

const toggles = {
    fullbright: false
};

m.addEventListener("sendchatmessage", (e: any) => {
    if (!e.message.startsWith("!")) return;

    e.preventDefault = true;

    if (e.message === "!fb") {
        if (!toggles.fullbright) {
            toggles.fullbright = true;
            m.settings.gammaSetting = 1000.0
            m.displayToChat("§a §r Fullbright enabled");
        } else {
            toggles.fullbright = false;
            m.settings.gammaSetting = 0.0
            m.displayToChat("§c §r Fullbright disabled");
        }
    } else if (e.message === "!help") {
        m.displayToChat("§k999§k Help §k999§k\n§3 !fb (FullBright)\n §2 !help (this text)")
    }
});