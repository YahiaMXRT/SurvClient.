(() => {
  // src/gui_based_mods/handler/handler.ts
  var keysPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    lmb: false,
    rmb: false
  };
  var handleRender = () => {
    keystrokesRndr.innerHTML = `
  <p style="display:block" ${keysPressed.w ? 'class="lighter"' : ""}>${keysPressed.w ? "W" : "w"}</p></br>
    <div style="display:flex;gap:10px;">
      <p ${keysPressed.a ? 'class="lighter"' : ""}>${keysPressed.a ? "A" : "a"}</p></br>                      
      <p ${keysPressed.s ? 'class="lighter"' : ""}>${keysPressed.s ? "S" : "s"}</p></br>
      <p ${keysPressed.d ? 'class="lighter"' : ""}>${keysPressed.d ? "D" : "d"}</p></br>                  
    </div>
    <div>
      <p class="space${keysPressed.d ? " lighter" : ""}"></p>
    </div>       
    <div style="display:flex;gap:10px;"></div>
      <p ${keysPressed.lmb ? 'class="lighter"' : ""}>${keysPressed.lmb ? "LMB" : "lmb"}</p></br>
      <p ${keysPressed.rmb ? 'class="lighter"' : ""}>${keysPressed.rmb ? "RMB" : "rmb"}</p></br>                     
    </div>  
  `;
  };
  var handlers = {
    mouseUp: (e2) => {
      if (e2.button === 0) {
        keysPressed.lmb = false;
      } else if (e2.button === 2) {
        keysPressed.rmb = false;
      }
      handleRender();
    },
    mouseDown: (e2) => {
      if (e2.button === 0) {
        keysPressed.lmb = true;
      } else if (e2.button === 2) {
        keysPressed.rmb = true;
      }
      handleRender();
    },
    keyUp: (e2) => {
      const k = e2.key.toLowerCase();
      if (!(k in keysPressed || k == " ")) return;
      if (k == " ") {
        keysPressed.space = false;
        handleRender();
      } else {
        keysPressed[k] = false;
        handleRender();
      }
    },
    keyDown: (e2) => {
      const k = e2.key.toLowerCase();
      if (!(k in keysPressed || k == " ")) return;
      if (k == " ") {
        keysPressed.space = true;
        handleRender();
      } else {
        keysPressed[k] = true;
        handleRender();
      }
    }
  };

  // src/gui_based_mods/keystr.ts
  var keystrokesRndr;
  var initkeystrokesCSS = () => {
  };
  var initKeystrokes = () => {
    const existing = document.getElementById("keystrokes_");
    if (toggles.keystrokes) {
      const keystrokes = existing ?? document.createElement("div");
      keystrokes.id = "keystrokes_";
      if (!existing) document.body.appendChild(keystrokes);
      keystrokesRndr = keystrokes;
      if (!existing) {
        window.addEventListener("keydown", handlers.keyDown);
        window.addEventListener("keyup", handlers.keyUp);
        document.addEventListener("mousedown", handlers.mouseDown);
        document.addEventListener("mouseup", handlers.mouseUp);
      }
    } else {
      const el = document.getElementById("keystrokes_");
      window.removeEventListener("keydown", handlers.keyDown);
      window.removeEventListener("keyup", handlers.keyUp);
      document.removeEventListener("mousedown", handlers.mouseDown);
      document.removeEventListener("mouseup", handlers.mouseUp);
      if (el) el.remove();
    }
  };

  // src/gui_based_mods/fpsmod.ts
  var fpsElement = null;
  var updateHandler = null;
  var renderFps = () => {
    if (!fpsElement) return;
    const fps = typeof ModAPI.getFPS === "function" ? ModAPI.getFPS() : 0;
    fpsElement.innerHTML = `<span class="fpsm-inner">${fps}</span>`;
  };
  var initFpsMod = () => {
    if (!document.body) return;
    if (toggles.fpsMod) {
      if (!fpsElement) {
        fpsElement = document.createElement("div");
        fpsElement.id = "fpsm_";
        document.body.appendChild(fpsElement);
      }
      if (!updateHandler) {
        updateHandler = () => renderFps();
        ModAPI.addEventListener("update", updateHandler);
      }
      renderFps();
    } else {
      if (updateHandler) {
        if (typeof ModAPI.removeEventListener === "function") {
          ModAPI.removeEventListener("update", updateHandler);
        }
      }
      if (fpsElement && fpsElement.isConnected) {
        fpsElement.remove();
      }
      fpsElement = null;
      updateHandler = null;
    }
  };

  // src/main.ts
  initkeystrokesCSS();
  var m = ModAPI;
  var toggles = {
    fullbright: false,
    keystrokes: false,
    fpsMod: false
  };
  var ev1 = [];
  var lastLog = 0;
  m.addEventListener("event", (e2) => {
    const now = Date.now();
    if (now - lastLog >= 5e4) {
      lastLog = now;
      ev1.push({
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        event: e2.event,
        data: e2.data
      });
      if (ev1.length > 100) {
        ev1.shift();
      }
    }
  });
  var mcSettings = ModAPI.settings;
  m.settings.gammaSetting = 1;
  m.addEventListener("sendchatmessage", (e) => {
    if (!e.message.startsWith("!")) return;
    e.preventDefault = true;
    if (e.message === "!fb") {
      if (!toggles.fullbright) {
        toggles.fullbright = true;
        m.settings.gammaSetting = 1e3;
        m.displayToChat("\xA7a \xA7lFullbright enabled");
      } else {
        toggles.fullbright = false;
        m.settings.gammaSetting = 1;
        m.displayToChat("\xA7c \xA7lFullbright disabled");
      }
    } else if (e.message === "!help") {
      m.displayToChat(
        " \xA7l help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA76 !keystrokes (self explanatory)\n\xA71 !mode (fps, fancy)\n\xA7b !version (self explanatory)\n\n \xA7l DEV TOOLS\n\xA78 !eval (run JS code)\n \xA77 !devlog (log of events)"
      );
    } else if (e.message.startsWith("!mode")) {
      var args = {
        a1: e.message.split(" ")[0],
        a2: e.message.split(" ")[1]
      };
      if (args.a2 == "fps") {
        mcSettings.renderDistanceChunks = 1;
        mcSettings.fog = false;
        mcSettings.mipmapLevels = 0;
        mcSettings.clouds = 0;
        mcSettings.viewBobbing = false;
        mcSettings.fancyGraphics = false;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else if (args.a2 == "fancy") {
        mcSettings.renderDistanceChunks = 8;
        mcSettings.fog = true;
        mcSettings.mipmapLevels = 3;
        mcSettings.clouds = 100;
        mcSettings.viewBobbing = true;
        mcSettings.fancyGraphics = true;
        mcSettings.chunkFix = true;
        mcSettings.enableVsync = false;
      } else {
        m.displayToChat("No mode exists with name: " + args.a2);
      }
    } else if (e.message === "!version") {
      m.displayToChat("\xA79 Current Client Version: 0.0.1");
    } else if (e.message === "!devlog") {
      m.displayToChat(
        "\xA7d Log: \n" + ev1.map(
          (i) => "\xA7e Event: " + i.event + "\n\xA7d Data:" + JSON.stringify(i.data)
        ).join("\n")
      );
    } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
      var code = e.message.split("!eval ")[1];
      m.displayToChat("\xA7d Eval:\n\xA7e " + eval(code));
    } else if (e.message === "!keystrokes") {
      if (toggles.keystrokes == true) {
        toggles.keystrokes = false;
        m.displayToChat("\xA7c \xA7lKeystrokes disabled");
      } else if (toggles.keystrokes == false) {
        toggles.keystrokes = true;
        m.displayToChat("\xA7a \xA7lKeystrokes enabled");
      }
      initKeystrokes();
    } else if (e.message == "!fps") {
      if (toggles.fpsMod == true) {
        toggles.fpsMod = false;
        m.displayToChat("\xA7c \xA7lFPS mod disabled");
      } else if (toggles.fpsMod == false) {
        toggles.fpsMod = true;
        m.displayToChat("\xA7a \xA7lFPS mod enabled");
      }
      initFpsMod();
    } else {
      m.displayToChat("\xA7c Unknown Command:");
      m.displayToChat("\xA7c" + e.message);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2d1aV9iYXNlZF9tb2RzL2hhbmRsZXIvaGFuZGxlci50cyIsICIuLi9zcmMvZ3VpX2Jhc2VkX21vZHMva2V5c3RyLnRzIiwgIi4uL3NyYy9ndWlfYmFzZWRfbW9kcy9mcHNtb2QudHMiLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGtleXN0cm9rZXNSbmRyIH0gZnJvbSBcIi4uL2tleXN0clwiO1xuZXhwb3J0IHZhciBrZXlzUHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7XG4gIHc6IGZhbHNlLFxuICBhOiBmYWxzZSxcbiAgczogZmFsc2UsXG4gIGQ6IGZhbHNlLFxuICBzcGFjZTogZmFsc2UsXG4gIGxtYjogZmFsc2UsXG4gIHJtYjogZmFsc2UsXG59O1xuXG5leHBvcnQgdmFyIGhhbmRsZVJlbmRlciA9ICgpID0+IHtcbiAga2V5c3Ryb2tlc1JuZHIuaW5uZXJIVE1MID0gYFxuICA8cCBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiAke2tleXNQcmVzc2VkLncgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogXCJcIn0+JHtrZXlzUHJlc3NlZC53ID8gXCJXXCIgOiBcIndcIn08L3A+PC9icj5cbiAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O2dhcDoxMHB4O1wiPlxuICAgICAgPHAgJHtrZXlzUHJlc3NlZC5hID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6IFwiXCJ9PiR7a2V5c1ByZXNzZWQuYSA/IFwiQVwiIDogXCJhXCJ9PC9wPjwvYnI+ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgPHAgJHtrZXlzUHJlc3NlZC5zID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6IFwiXCJ9PiR7a2V5c1ByZXNzZWQucyA/IFwiU1wiIDogXCJzXCJ9PC9wPjwvYnI+XG4gICAgICA8cCAke2tleXNQcmVzc2VkLmQgPyAnY2xhc3M9XCJsaWdodGVyXCInIDogXCJcIn0+JHtrZXlzUHJlc3NlZC5kID8gXCJEXCIgOiBcImRcIn08L3A+PC9icj4gICAgICAgICAgICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHAgY2xhc3M9XCJzcGFjZSR7a2V5c1ByZXNzZWQuZCA/ICcgbGlnaHRlcicgOiBcIlwifVwiPjwvcD5cbiAgICA8L2Rpdj4gICAgICAgXG4gICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtnYXA6MTBweDtcIj48L2Rpdj5cbiAgICAgIDxwICR7a2V5c1ByZXNzZWQubG1iID8gJ2NsYXNzPVwibGlnaHRlclwiJyA6IFwiXCJ9PiR7a2V5c1ByZXNzZWQubG1iID8gXCJMTUJcIiA6IFwibG1iXCJ9PC9wPjwvYnI+XG4gICAgICA8cCAke2tleXNQcmVzc2VkLnJtYiA/ICdjbGFzcz1cImxpZ2h0ZXJcIicgOiBcIlwifT4ke2tleXNQcmVzc2VkLnJtYiA/IFwiUk1CXCIgOiBcInJtYlwifTwvcD48L2JyPiAgICAgICAgICAgICAgICAgICAgIFxuICAgIDwvZGl2PiAgXG4gIGA7XG59O1xuZXhwb3J0IHZhciBoYW5kbGVycyA9IHtcbiAgbW91c2VVcDogKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgIGtleXNQcmVzc2VkLmxtYiA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZS5idXR0b24gPT09IDIpIHtcbiAgICAgIGtleXNQcmVzc2VkLnJtYiA9IGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVSZW5kZXIoKTtcbiAgfSxcbiAgbW91c2VEb3duOiAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmIChlLmJ1dHRvbiA9PT0gMCkge1xuICAgICAga2V5c1ByZXNzZWQubG1iID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUuYnV0dG9uID09PSAyKSB7XG4gICAgICBrZXlzUHJlc3NlZC5ybWIgPSB0cnVlO1xuICAgIH1cbiAgICBoYW5kbGVSZW5kZXIoKTtcbiAgfSxcbiAga2V5VXA6IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgY29uc3QgayA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEoayBpbiBrZXlzUHJlc3NlZCB8fCBrID09IFwiIFwiKSkgcmV0dXJuO1xuICAgIGlmIChrID09IFwiIFwiKSB7XG4gICAgICBrZXlzUHJlc3NlZC5zcGFjZSA9IGZhbHNlO1xuICAgICAgaGFuZGxlUmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXNQcmVzc2VkW2tdID0gZmFsc2U7XG4gICAgICBoYW5kbGVSZW5kZXIoKTtcbiAgICB9XG4gIH0sXG4gIGtleURvd246IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgY29uc3QgayA9IGUua2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEoayBpbiBrZXlzUHJlc3NlZCB8fCBrID09IFwiIFwiKSkgcmV0dXJuO1xuXG4gICAgaWYgKGsgPT0gXCIgXCIpIHtcbiAgICAgIGtleXNQcmVzc2VkLnNwYWNlID0gdHJ1ZTtcbiAgICAgIGhhbmRsZVJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzUHJlc3NlZFtrXSA9IHRydWU7XG4gICAgICBoYW5kbGVSZW5kZXIoKTtcbiAgICB9XG4gIH0sXG59O1xuIiwgImltcG9ydCB7IHRvZ2dsZXMgfSBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHsgXG4gICAga2V5c1ByZXNzZWQsIFxuICAgIGhhbmRsZVJlbmRlciwgXG4gICAgaGFuZGxlcnNcbn0gZnJvbSBcIi4vaGFuZGxlci9oYW5kbGVyXCI7XG4vLyBAdHMtaWdub3JlOiBzaWRlLWVmZmVjdCBpbXBvcnQgc28gd2VicGFjayBjYW4gYnVuZGxlIGFuZCBpbmplY3QgQ1NTXG5pbXBvcnQgXCIuL2tleXN0cm9rZXNDU1MuY3NzXCI7XG5leHBvcnQgdmFyIGtleXN0cm9rZXNSbmRyOiBIVE1MRWxlbWVudDtcbmV4cG9ydCB2YXIgaW5pdGtleXN0cm9rZXNDU1MgPSAoKSA9PiB7XG4gIC8vIENTUyBpcyBpbXBvcnRlZCBhdCBtb2R1bGUgbG9hZDsgd2l0aCBzdHlsZS1sb2FkZXIgaXQgd2lsbCBiZSBpbmplY3RlZCBhdXRvbWF0aWNhbGx5LlxufTtcblxuZXhwb3J0IHZhciBpbml0S2V5c3Ryb2tlcyA9ICgpID0+IHtcbiAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgaWYgKHRvZ2dsZXMua2V5c3Ryb2tlcykge1xuICAgIGNvbnN0IGtleXN0cm9rZXMgPSBleGlzdGluZyA/PyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAgICBcbiAgICBrZXlzdHJva2VzLmlkID0gXCJrZXlzdHJva2VzX1wiO1xuICAgIGlmICghZXhpc3RpbmcpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoa2V5c3Ryb2tlcyk7XG4gICAga2V5c3Ryb2tlc1JuZHIgPSBrZXlzdHJva2VzXG4gICAgLy8gT25seSBhdHRhY2ggbGlzdGVuZXJzIG9uY2Ugd2hlbiBjcmVhdGluZyB0aGUgZWxlbWVudFxuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVycy5rZXlEb3duKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVycy5rZXlVcCk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXJzLm1vdXNlRG93bik7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoYW5kbGVycy5tb3VzZVVwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtleXN0cm9rZXNfXCIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVycy5rZXlEb3duKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaGFuZGxlcnMua2V5VXApXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVycy5tb3VzZURvd24pXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGFuZGxlcnMubW91c2VVcClcbiAgICBpZiAoZWwpIGVsLnJlbW92ZSgpO1xuICB9XG59O1xuIiwgImltcG9ydCB7dG9nZ2xlc30gZnJvbSBcIi4uL21haW5cIlxuLy8gQHRzLWlnbm9yZTogc2lkZS1lZmZlY3QgaW1wb3J0IHNvIHdlYnBhY2sgY2FuIGJ1bmRsZSBhbmQgaW5qZWN0IENTU1xuaW1wb3J0ICcuL2Zwc21vZENTUy5jc3MnXG5cbmxldCBmcHNFbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xubGV0IHVwZGF0ZUhhbmRsZXI6ICgoZT86IGFueSkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuY29uc3QgcmVuZGVyRnBzID0gKCkgPT4ge1xuICAgIGlmICghZnBzRWxlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IGZwcyA9IHR5cGVvZiBNb2RBUEkuZ2V0RlBTID09PSBcImZ1bmN0aW9uXCIgPyBNb2RBUEkuZ2V0RlBTKCkgOiAwO1xuICAgIGZwc0VsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZnBzbS1pbm5lclwiPiR7ZnBzfTwvc3Bhbj5gO1xufVxuXG5leHBvcnQgdmFyIGluaXRGcHNNb2QgPSAoKSA9PiB7XG4gICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XG5cbiAgICBpZiAodG9nZ2xlcy5mcHNNb2QpIHtcbiAgICAgICAgaWYgKCFmcHNFbGVtZW50KSB7XG4gICAgICAgICAgICBmcHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmcHNFbGVtZW50LmlkID0gXCJmcHNtX1wiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcHNFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXBkYXRlSGFuZGxlcikge1xuICAgICAgICAgICAgdXBkYXRlSGFuZGxlciA9ICgpID0+IHJlbmRlckZwcygpO1xuICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIiwgdXBkYXRlSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJGcHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBNb2RBUEkucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIiwgdXBkYXRlSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnBzRWxlbWVudCAmJiBmcHNFbGVtZW50LmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICBmcHNFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnBzRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXIgPSBudWxsO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgaW5pdEtleXN0cm9rZXMsIGluaXRrZXlzdHJva2VzQ1NTIH0gZnJvbSBcIi4vZ3VpX2Jhc2VkX21vZHMva2V5c3RyXCI7XG5pbXBvcnQgeyBpbml0RnBzTW9kIH0gZnJvbSBcIi4vZ3VpX2Jhc2VkX21vZHMvZnBzbW9kXCI7XG5pbml0a2V5c3Ryb2tlc0NTUygpO1xuY29uc3QgbSA9IE1vZEFQSTtcbmV4cG9ydCBjb25zdCB0b2dnbGVzID0ge1xuICBmdWxsYnJpZ2h0OiBmYWxzZSxcbiAga2V5c3Ryb2tlczogZmFsc2UsXG4gIGZwc01vZDogZmFsc2UsXG59O1xudmFyIGV2MTogYW55W10gPSBbXTtcbmxldCBsYXN0TG9nID0gMDtcblxubS5hZGRFdmVudExpc3RlbmVyKFwiZXZlbnRcIiwgKGU6IGFueSkgPT4ge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gIGlmIChub3cgLSBsYXN0TG9nID49IDUwMDAwKSB7XG4gICAgLy8gMzAgc2Vjb25kc1xuICAgIGxhc3RMb2cgPSBub3c7XG5cbiAgICBldjEucHVzaCh7XG4gICAgICB0aW1lOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgZXZlbnQ6IGUuZXZlbnQsXG4gICAgICBkYXRhOiBlLmRhdGEsXG4gICAgfSk7XG5cbiAgICBpZiAoZXYxLmxlbmd0aCA+IDEwMCkge1xuICAgICAgZXYxLnNoaWZ0KCk7XG4gICAgfVxuICB9XG59KTtcbmNvbnN0IG1jU2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3M7XG5tLnNldHRpbmdzLmdhbW1hU2V0dGluZyA9IDEuMDtcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKSByZXR1cm47XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbiAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgIGlmICghdG9nZ2xlcy5mdWxsYnJpZ2h0KSB7XG4gICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSB0cnVlO1xuICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxMDAwLjA7XG4gICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIFx1MDBBN2xGdWxsYnJpZ2h0IGVuYWJsZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjA7XG4gICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFx1MDBBN2xGdWxsYnJpZ2h0IGRpc2FibGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWhlbHBcIikge1xuICAgIG0uZGlzcGxheVRvQ2hhdChcbiAgICAgIFwiIFx1MDBBN2wgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTc2ICFrZXlzdHJva2VzIChzZWxmIGV4cGxhbmF0b3J5KVxcblx1MDBBNzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuXHUwMEE3YiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gXHUwMEE3bCBERVYgVE9PTFNcXG5cdTAwQTc4ICFldmFsIChydW4gSlMgY29kZSlcXG4gXHUwMEE3NyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiLFxuICAgICk7XG4gIH0gZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgIHZhciBhcmdzID0ge1xuICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXSxcbiAgICB9O1xuICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAxO1xuICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZTtcbiAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMC4wO1xuICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjA7XG4gICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2U7XG4gICAgICBtY1NldHRpbmdzLmZhbmN5R3JhcGhpY3MgPSBmYWxzZTtcbiAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlO1xuICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4O1xuICAgICAgbWNTZXR0aW5ncy5mb2cgPSB0cnVlO1xuICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjA7XG4gICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMDtcbiAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSB0cnVlO1xuICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZTtcbiAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlO1xuICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBtLmRpc3BsYXlUb0NoYXQoXCJObyBtb2RlIGV4aXN0cyB3aXRoIG5hbWU6IFwiICsgYXJncy5hMik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKSB7XG4gICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3OSBDdXJyZW50IENsaWVudCBWZXJzaW9uOiAwLjAuMVwiKTtcbiAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWRldmxvZ1wiKSB7XG4gICAgbS5kaXNwbGF5VG9DaGF0KFxuICAgICAgXCJcdTAwQTdkIExvZzogXFxuXCIgK1xuICAgICAgICBldjFcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGkpID0+XG4gICAgICAgICAgICAgIFwiXHUwMEE3ZSBFdmVudDogXCIgKyBpLmV2ZW50ICsgXCJcXG5cdTAwQTdkIERhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShpLmRhdGEpLFxuICAgICAgICAgIClcbiAgICAgICAgICAuam9pbihcIlxcblwiKSxcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGUubWVzc2FnZVsxXSA9PT0gXCJlXCIgJiZcbiAgICBlLm1lc3NhZ2UgPT09IFwidlwiICYmXG4gICAgZS5tZXNzYWdlWzFdID09PSBcImFcIiAmJlxuICAgIGUubWVzc2FnZSA9PT0gXCJsXCJcbiAgKSB7XG4gICAgdmFyIGNvZGUgPSBlLm1lc3NhZ2Uuc3BsaXQoXCIhZXZhbCBcIilbMV07XG4gICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3ZCBFdmFsOlxcblx1MDBBN2UgXCIgKyBldmFsKGNvZGUpKTtcbiAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWtleXN0cm9rZXNcIikge1xuICAgIGlmICh0b2dnbGVzLmtleXN0cm9rZXMgPT0gdHJ1ZSkge1xuICAgICAgdG9nZ2xlcy5rZXlzdHJva2VzID0gZmFsc2U7XG4gICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFx1MDBBN2xLZXlzdHJva2VzIGRpc2FibGVkXCIpO1xuICAgIH0gZWxzZSBpZiAodG9nZ2xlcy5rZXlzdHJva2VzID09IGZhbHNlKSB7XG4gICAgICB0b2dnbGVzLmtleXN0cm9rZXMgPSB0cnVlO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YSBcdTAwQTdsS2V5c3Ryb2tlcyBlbmFibGVkXCIpO1xuICAgIH1cbiAgICBpbml0S2V5c3Ryb2tlcygpO1xuICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PSBcIiFmcHNcIikge1xuICAgIGlmICh0b2dnbGVzLmZwc01vZCA9PSB0cnVlKSB7XG4gICAgICB0b2dnbGVzLmZwc01vZCA9IGZhbHNlO1xuICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBcdTAwQTdsRlBTIG1vZCBkaXNhYmxlZFwiKTtcbiAgICB9IGVsc2UgaWYgKHRvZ2dsZXMuZnBzTW9kID09IGZhbHNlKSB7XG4gICAgICB0b2dnbGVzLmZwc01vZCA9IHRydWU7XG4gICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIFx1MDBBN2xGUFMgbW9kIGVuYWJsZWRcIik7XG4gICAgfVxuICAgIGluaXRGcHNNb2QoKTtcbiAgfSBlbHNlIHtcbiAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFVua25vd24gQ29tbWFuZDpcIik7XG4gICAgbS5k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
