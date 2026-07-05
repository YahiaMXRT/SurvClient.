// src/main.ts
var m = ModAPI;
var toggles = {
  fullbright: false
};
m.settings.gammaSetting = 1;
m.addEventListener("sendchatmessage", (e) => {
  if (!e.message.startsWith("!"))
    return;
  e.preventDefault = true;
  if (e.message === "!fb") {
    if (!toggles.fullbright) {
      toggles.fullbright = true;
      m.settings.gammaSetting = 1000;
      m.displayToChat("§a Fullbright enabled");
    } else {
      toggles.fullbright = false;
      m.settings.gammaSetting = 1;
      m.displayToChat("§c Fullbright disabled");
    }
  } else if (e.message === "!help") {
    m.displayToChat(`§khelp
 §3 !fb (FullBright)
 §2 !help (this text)`);
  }
});
