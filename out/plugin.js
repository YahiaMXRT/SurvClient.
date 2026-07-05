(() => {
  // src/main.ts
  var m = ModAPI;
  var toggles = {
    fullbright: false
  };
  var playerLocation = {
    x: 0,
    y: 0,
    z: 0
  };
  m.addEventListener("sendpacketplayer", (e) => {
    playerLocation = {
      x: e.x,
      y: e.y,
      z: e.z
    };
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
        m.displayToChat("\xA7a Fullbright enabled");
      } else {
        toggles.fullbright = false;
        m.settings.gammaSetting = 1;
        m.displayToChat("\xA7c Fullbright disabled");
      }
    } else if (e.message === "!help") {
      m.displayToChat(" \xA7k help\n\xA73 !fb (FullBright)\n\xA72 !help (this text)\n\xA71 !mode (fps, fancy)\n\xA7b !cLocation (Current Coordinates)");
    } else if (e.message.startsWith("!mode")) {
      var args = {
        a1: e.message.split(" ")[0],
        a2: e.message.split(" ")[1]
      };
      if (args.a2 == "fps") {
        mcSettings.renderDistanceChunks = 2;
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
    } else if (e.message === "!cLocation") {
      m.displayToChat("\xA710 Current Location");
      m.displayToChat("\xA74 X:" + playerLocation.x);
      m.displayToChat("\xA74 Y:" + playerLocation.y);
      m.displayToChat("\xA74 Z:" + playerLocation.z);
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5jb25zdCB0b2dnbGVzID0ge1xuICAgIGZ1bGxicmlnaHQ6IGZhbHNlXG59O1xudmFyIHBsYXllckxvY2F0aW9uPXtcbiAgICB4OjAsXG4gICAgeTowLFxuICAgIHo6MFxufTtcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRwYWNrZXRwbGF5ZXJcIiwgKGU6YW55KSA9PiB7XG4gICAgcGxheWVyTG9jYXRpb24gPSB7XG4gICAgICAgIHg6IGUueCxcbiAgICAgICAgeTogZS55LFxuICAgICAgICB6OiBlLnpcbiAgICB9XG59KVxuY29uc3QgbWNTZXR0aW5ncyA9IE1vZEFQSS5zZXR0aW5nc1xubS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbm0uYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCAoZTogYW55KSA9PiB7XG4gICAgaWYgKCFlLm1lc3NhZ2Uuc3RhcnRzV2l0aChcIiFcIikpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuXG4gICAgaWYgKGUubWVzc2FnZSA9PT0gXCIhZmJcIikge1xuICAgICAgICBpZiAoIXRvZ2dsZXMuZnVsbGJyaWdodCkge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG0uc2V0dGluZ3MuZ2FtbWFTZXR0aW5nID0gMTAwMC4wXG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTdhIEZ1bGxicmlnaHQgZW5hYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgbS5zZXR0aW5ncy5nYW1tYVNldHRpbmcgPSAxLjBcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIlx1MDBBN2MgRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09PSBcIiFoZWxwXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiIFx1MDBBN2sgaGVscFxcblx1MDBBNzMgIWZiIChGdWxsQnJpZ2h0KVxcblx1MDBBNzIgIWhlbHAgKHRoaXMgdGV4dClcXG5cdTAwQTcxICFtb2RlIChmcHMsIGZhbmN5KVxcblx1MDBBN2IgIWNMb2NhdGlvbiAoQ3VycmVudCBDb29yZGluYXRlcylcIilcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhbW9kZVwiKSkge1xuICAgICAgICB2YXIgYXJncyA9IHtcbiAgICAgICAgICAgIGExOiBlLm1lc3NhZ2Uuc3BsaXQoXCIgXCIpWzBdLFxuICAgICAgICAgICAgYTI6IGUubWVzc2FnZS5zcGxpdChcIiBcIilbMV1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5hMiA9PSBcImZwc1wiKSB7XG4gICAgICAgICAgICBtY1NldHRpbmdzLnJlbmRlckRpc3RhbmNlQ2h1bmtzID0gMlxuICAgICAgICAgICAgbWNTZXR0aW5ncy5mb2cgPSBmYWxzZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5taXBtYXBMZXZlbHMgPSAwLjBcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2xvdWRzID0gMC4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLnZpZXdCb2JiaW5nID0gZmFsc2VcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IGZhbHNlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNodW5rRml4ID0gdHJ1ZVxuICAgICAgICAgICAgbWNTZXR0aW5ncy5lbmFibGVWc3luYyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5hMiA9PSBcImZhbmN5XCIpIHtcbiAgICAgICAgICAgIG1jU2V0dGluZ3MucmVuZGVyRGlzdGFuY2VDaHVua3MgPSA4XG4gICAgICAgICAgICBtY1NldHRpbmdzLmZvZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MubWlwbWFwTGV2ZWxzID0gMy4wXG4gICAgICAgICAgICBtY1NldHRpbmdzLmNsb3VkcyA9IDEwMFxuICAgICAgICAgICAgbWNTZXR0aW5ncy52aWV3Qm9iYmluZyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuZmFuY3lHcmFwaGljcyA9IHRydWVcbiAgICAgICAgICAgIG1jU2V0dGluZ3MuY2h1bmtGaXggPSB0cnVlXG4gICAgICAgICAgICBtY1NldHRpbmdzLmVuYWJsZVZzeW5jID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG0uZGlzcGxheVRvQ2hhdChcIk5vIG1vZGUgZXhpc3RzIHdpdGggbmFtZTogXCIgKyBhcmdzLmEyKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUubWVzc2FnZSA9PT0gXCIhY0xvY2F0aW9uXCIpIHtcbiAgICAgICAgbS5kaXNwbGF5VG9DaGF0KFwiXHUwMEE3MTAgQ3VycmVudCBMb2NhdGlvblwiKVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFg6XCIgKyBwbGF5ZXJMb2NhdGlvbi54KVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFk6XCIgKyBwbGF5ZXJMb2NhdGlvbi55KVxuICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc0IFo6XCIgKyBwbGF5ZXJMb2NhdGlvbi56KVxuXG4gICAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxNQUFNLElBQUk7QUFDVixNQUFNLFVBQVU7QUFBQSxJQUNaLFlBQVk7QUFBQSxFQUNoQjtBQUNBLE1BQUksaUJBQWU7QUFBQSxJQUNmLEdBQUU7QUFBQSxJQUNGLEdBQUU7QUFBQSxJQUNGLEdBQUU7QUFBQSxFQUNOO0FBQ0EsSUFBRSxpQkFBaUIsb0JBQW9CLENBQUMsTUFBVTtBQUM5QyxxQkFBaUI7QUFBQSxNQUNiLEdBQUcsRUFBRTtBQUFBLE1BQ0wsR0FBRyxFQUFFO0FBQUEsTUFDTCxHQUFHLEVBQUU7QUFBQSxJQUNUO0FBQUEsRUFDSixDQUFDO0FBQ0QsTUFBTSxhQUFhLE9BQU87QUFDMUIsSUFBRSxTQUFTLGVBQWU7QUFDMUIsSUFBRSxpQkFBaUIsbUJBQW1CLENBQUMsTUFBVztBQUM5QyxRQUFJLENBQUMsRUFBRSxRQUFRLFdBQVcsR0FBRyxFQUFHO0FBRWhDLE1BQUUsaUJBQWlCO0FBRW5CLFFBQUksRUFBRSxZQUFZLE9BQU87QUFDckIsVUFBSSxDQUFDLFFBQVEsWUFBWTtBQUNyQixnQkFBUSxhQUFhO0FBQ3JCLFVBQUUsU0FBUyxlQUFlO0FBQzFCLFVBQUUsY0FBYywwQkFBdUI7QUFBQSxNQUMzQyxPQUFPO0FBQ0gsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLFNBQVMsZUFBZTtBQUMxQixVQUFFLGNBQWMsMkJBQXdCO0FBQUEsTUFDNUM7QUFBQSxJQUNKLFdBQVcsRUFBRSxZQUFZLFNBQVM7QUFDOUIsUUFBRSxjQUFjLGdJQUFpSDtBQUFBLElBQ3JJLFdBQ1MsRUFBRSxRQUFRLFdBQVcsT0FBTyxHQUFHO0FBQ3BDLFVBQUksT0FBTztBQUFBLFFBQ1AsSUFBSSxFQUFFLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLFFBQzFCLElBQUksRUFBRSxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBQSxNQUM5QjtBQUNBLFVBQUksS0FBSyxNQUFNLE9BQU87QUFDbEIsbUJBQVcsdUJBQXVCO0FBQ2xDLG1CQUFXLE1BQU07QUFDakIsbUJBQVcsZUFBZTtBQUMxQixtQkFBVyxTQUFTO0FBQ3BCLG1CQUFXLGNBQWM7QUFDekIsbUJBQVcsZ0JBQWdCO0FBQzNCLG1CQUFXLFdBQVc7QUFDdEIsbUJBQVcsY0FBYztBQUFBLE1BQzdCLFdBQ1MsS0FBSyxNQUFNLFNBQVM7QUFDekIsbUJBQVcsdUJBQXVCO0FBQ2xDLG1CQUFXLE1BQU07QUFDakIsbUJBQVcsZUFBZTtBQUMxQixtQkFBVyxTQUFTO0FBQ3BCLG1CQUFXLGNBQWM7QUFDekIsbUJBQVcsZ0JBQWdCO0FBQzNCLG1CQUFXLFdBQVc7QUFDdEIsbUJBQVcsY0FBYztBQUFBLE1BQzdCLE9BQU87QUFDSCxVQUFFLGNBQWMsK0JBQStCLEtBQUssRUFBRTtBQUFBLE1BQzFEO0FBQUEsSUFDSixXQUNTLEVBQUUsWUFBWSxjQUFjO0FBQ2pDLFFBQUUsY0FBYyx5QkFBc0I7QUFDdEMsUUFBRSxjQUFjLGFBQVUsZUFBZSxDQUFDO0FBQzFDLFFBQUUsY0FBYyxhQUFVLGVBQWUsQ0FBQztBQUMxQyxRQUFFLGNBQWMsYUFBVSxlQUFlLENBQUM7QUFBQSxJQUU5QztBQUFBLEVBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
