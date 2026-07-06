(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e2) {
      throw mod = 0, e2;
    }
  };

  // src/main.ts
  var require_main = __commonJS({
    "src/main.ts"(exports, module) {
      var m = ModAPI;
      var toggles = {
        fullbright: false
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
          m.displayToChat(" \xA7l help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA71 !mode (fps, fancy)\n\xA7b !version (self explanatory)\n\n \xA7l DEV TOOLS\n\xA78 !eval (run JS code)\n \xA77 !devlog (log of events)");
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
            "\xA7d Log: \n" + ev1.map((i) => "\xA7e Event: " + i.event + "\n\xA7d Data:" + JSON.stringify(i.data)).join("\n")
          );
        } else if (e.message[1] === "e" && e.message === "v" && e.message[1] === "a" && e.message === "l") {
          var code = e.message.split("!eval ")[1];
          m.displayToChat("\xA7d Eval:\n\xA7e " + eval(code));
        } else {
          m.displayToChat("\xA7c Unknown Command:");
          m.displayToChat("\xA7c" + e.message);
        }
      });
    }
  });
  require_main();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xudmFyIGV2MTogYW55W10gPSBbXTtcbmxldCBsYXN0TG9nID0gMDtcblxubS5hZGRFdmVudExpc3RlbmVyKFwiZXZlbnRcIiwgKGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBpZiAobm93IC0gbGFzdExvZyA+PSA1MDAwMCkgeyAvLyAzMCBzZWNvbmRzXG4gICAgICAgIGxhc3RMb2cgPSBub3c7XG5cbiAgICAgICAgZXYxLnB1c2goe1xuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgICAgIGV2ZW50OiBlLmV2ZW50LFxuICAgICAgICAgICAgZGF0YTogZS5kYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldjEubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICBldjEuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuY29uc3QgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5nc1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIFx1MDBBN2xGdWxsYnJpZ2h0IGVuYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVzLmZ1bGxicmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMS4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdjIFx1MDBBN2xGdWxsYnJpZ2h0IGRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT09IFwiIWhlbHBcIikge1xuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCIgXHUwMEE3bCBoZWxwXFxuXHUwMEE3MyAhZmIgKEZ1bGxCcmlnaHQpXFxuXHUwMEE3MiAhaGVscCAodGhpcyB0ZXh0KVxcblx1MDBBNzEgIW1vZGUgKGZwcywgZmFuY3kpXFxuXHUwMEE3YiAhdmVyc2lvbiAoc2VsZiBleHBsYW5hdG9yeSlcXG5cXG4gXHUwMEE3bCBERVYgVE9PTFNcXG5cdTAwQTc4ICFldmFsIChydW4gSlMgY29kZSlcXG4gXHUwMEE3NyAhZGV2bG9nIChsb2cgb2YgZXZlbnRzKVwiKVxuICAgIH1cbiAgICBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFtb2RlXCIpKSB7XG4gICAgICAgIHZhciBhcmdzID0ge1xuICAgICAgICAgICAgYTE6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMF0sXG4gICAgICAgICAgICBhMjogZS5tZXNzYWdlLnNwbGl0KFwiIFwiKVsxXVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmEyID09IFwiZnBzXCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSAxXG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLm1pcG1hcExldmVscyA9IDAuMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jbG91ZHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3Mudmlld0JvYmJpbmcgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmEyID09IFwiZmFuY3lcIikge1xuICAgICAgICAgICAgbWNTZXR0aW5ncy5yZW5kZXJEaXN0YW5jZUNodW5rcyA9IDhcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZm9nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAzLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMTAwXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mYW5jeUdyYXBoaWNzID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5jaHVua0ZpeCA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZW5hYmxlVnN5bmMgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiTm8gbW9kZSBleGlzdHMgd2l0aCBuYW1lOiBcIiArIGFyZ3MuYTIpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhdmVyc2lvblwiKVxuICAgIHsgXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBNzkgQ3VycmVudCBDbGllbnQgVmVyc2lvbjogMC4wLjFcIilcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhZGV2bG9nXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFxuICAgICAgICAgICAgXCJcdTAwQTdkIExvZzogXFxuXCIgKyBldjEubWFwKGkgPT4gXCJcdTAwQTdlIEV2ZW50OiBcIiArIGkuZXZlbnQgKyBcIlxcblx1MDBBN2QgRGF0YTpcIiArIEpTT04uc3RyaW5naWZ5KGkuZGF0YSkpLmpvaW4oXCJcXG5cIilcbiAgICAgICAgKVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlWzFdID09PSBcImVcIiAmJiBlLm1lc3NhZ2UgPT09IFwidlwiICYmIGUubWVzc2FnZVsxXSA9PT0gXCJhXCIgJiYgZS5tZXNzYWdlID09PSBcImxcIikge1xuICAgICAgICB2YXIgY29kZSA9IGUubWVzc2FnZS5zcGxpdChcIiFldmFsIFwiKVsxXTtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3ZCBFdmFsOlxcblx1MDBBN2UgXCIgKyBldmFsKGNvZGUpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3YyBVbmtub3duIENvbW1hbmQ6XCIpXG4gICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2NcIiArIGUubWVzc2FnZSlcbiAgICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxVQUFNLElBQUk7QUFDVixVQUFNLFVBQVU7QUFBQSxRQUNaLFlBQVk7QUFBQSxNQUNoQjtBQUNBLFVBQUksTUFBYSxDQUFDO0FBQ2xCLFVBQUksVUFBVTtBQUVkLFFBQUUsaUJBQWlCLFNBQVMsQ0FBQ0EsT0FBVztBQUNwQyxjQUFNLE1BQU0sS0FBSyxJQUFJO0FBRXJCLFlBQUksTUFBTSxXQUFXLEtBQU87QUFDeEIsb0JBQVU7QUFFVixjQUFJLEtBQUs7QUFBQSxZQUNMLE9BQU0sb0JBQUksS0FBSyxHQUFFLG1CQUFtQjtBQUFBLFlBQ3BDLE9BQU9BLEdBQUU7QUFBQSxZQUNULE1BQU1BLEdBQUU7QUFBQSxVQUNaLENBQUM7QUFFRCxjQUFJLElBQUksU0FBUyxLQUFLO0FBQ2xCLGdCQUFJLE1BQU07QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUNELFVBQU0sYUFBYSxPQUFPO0FBQzFCLFFBQUUsU0FBUyxlQUFlO0FBQzFCLFFBQUUsaUJBQWlCLG1CQUFtQixDQUFDLE1BQVc7QUFDOUMsWUFBSSxDQUFDLEVBQUUsUUFBUSxXQUFXLEdBQUcsRUFBRztBQUVoQyxVQUFFLGlCQUFpQjtBQUVuQixZQUFJLEVBQUUsWUFBWSxPQUFPO0FBQ3JCLGNBQUksQ0FBQyxRQUFRLFlBQVk7QUFDckIsb0JBQVEsYUFBYTtBQUNyQixjQUFFLFNBQVMsZUFBZTtBQUMxQixjQUFFLGNBQWMsK0JBQXlCO0FBQUEsVUFDN0MsT0FBTztBQUNILG9CQUFRLGFBQWE7QUFDckIsY0FBRSxTQUFTLGVBQWU7QUFDMUIsY0FBRSxjQUFjLGdDQUEwQjtBQUFBLFVBQzlDO0FBQUEsUUFDSixXQUFXLEVBQUUsWUFBWSxTQUFTO0FBQzlCLFlBQUUsY0FBYywwTUFBa0w7QUFBQSxRQUN0TSxXQUNTLEVBQUUsUUFBUSxXQUFXLE9BQU8sR0FBRztBQUNwQyxjQUFJLE9BQU87QUFBQSxZQUNQLElBQUksRUFBRSxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBQSxZQUMxQixJQUFJLEVBQUUsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsVUFDOUI7QUFDQSxjQUFJLEtBQUssTUFBTSxPQUFPO0FBQ2xCLHVCQUFXLHVCQUF1QjtBQUNsQyx1QkFBVyxNQUFNO0FBQ2pCLHVCQUFXLGVBQWU7QUFDMUIsdUJBQVcsU0FBUztBQUNwQix1QkFBVyxjQUFjO0FBQ3pCLHVCQUFXLGdCQUFnQjtBQUMzQix1QkFBVyxXQUFXO0FBQ3RCLHVCQUFXLGNBQWM7QUFBQSxVQUM3QixXQUNTLEtBQUssTUFBTSxTQUFTO0FBQ3pCLHVCQUFXLHVCQUF1QjtBQUNsQyx1QkFBVyxNQUFNO0FBQ2pCLHVCQUFXLGVBQWU7QUFDMUIsdUJBQVcsU0FBUztBQUNwQix1QkFBVyxjQUFjO0FBQ3pCLHVCQUFXLGdCQUFnQjtBQUMzQix1QkFBVyxXQUFXO0FBQ3RCLHVCQUFXLGNBQWM7QUFBQSxVQUM3QixPQUFPO0FBQ0gsY0FBRSxjQUFjLCtCQUErQixLQUFLLEVBQUU7QUFBQSxVQUMxRDtBQUFBLFFBQ0osV0FBVyxFQUFFLFlBQVksWUFDekI7QUFDSSxZQUFFLGNBQWMscUNBQWtDO0FBQUEsUUFDdEQsV0FBVyxFQUFFLFlBQVksV0FBVztBQUNoQyxZQUFFO0FBQUEsWUFDRSxrQkFBZSxJQUFJLElBQUksT0FBSyxrQkFBZSxFQUFFLFFBQVEsa0JBQWUsS0FBSyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQUEsVUFDekc7QUFBQSxRQUNKLFdBQVcsRUFBRSxRQUFRLENBQUMsTUFBTSxPQUFPLEVBQUUsWUFBWSxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sT0FBTyxFQUFFLFlBQVksS0FBSztBQUMvRixjQUFJLE9BQU8sRUFBRSxRQUFRLE1BQU0sUUFBUSxFQUFFLENBQUM7QUFDdEMsWUFBRSxjQUFjLHdCQUFrQixLQUFLLElBQUksQ0FBQztBQUFBLFFBQ2hELE9BQ0s7QUFDRCxZQUFFLGNBQWMsd0JBQXFCO0FBQ3JDLFlBQUUsY0FBYyxVQUFPLEVBQUUsT0FBTztBQUFBLFFBQ3BDO0FBQUEsTUFDSixDQUFDO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFsiZSJdCn0K
