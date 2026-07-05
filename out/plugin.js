(() => {
  // src/main.ts
  var m = ModAPI;
  var toggles = {
    fullbright: false
  };
  m.displayToChat("Client commands start with: !");
  m.addEventListener("sendchatmessage", (e) => {
    if (!e.message.startsWith("!")) return;
    e.preventDefault = true;
    if (e.message === "!fb") {
      if (!toggles.fullbright) {
        toggles.fullbright = true;
        m.displayToChat("\xA79Fullbright enabled");
      } else {
        toggles.fullbright = false;
        m.displayToChat("\xA73Fullbright disabled");
      }
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG0gPSBNb2RBUEk7XG5cbmNvbnN0IHRvZ2dsZXMgPSB7XG4gICAgZnVsbGJyaWdodDogZmFsc2Vcbn07XG5cbm0uZGlzcGxheVRvQ2hhdChcIkNsaWVudCBjb21tYW5kcyBzdGFydCB3aXRoOiAhXCIpO1xuXG5tLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgKGU6IGFueSkgPT4ge1xuICAgIGlmICghZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCIhXCIpKSByZXR1cm47XG5cbiAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcblxuICAgIGlmIChlLm1lc3NhZ2UgPT09IFwiIWZiXCIpIHtcbiAgICAgICAgaWYgKCF0b2dnbGVzLmZ1bGxicmlnaHQpIHtcbiAgICAgICAgICAgIHRvZ2dsZXMuZnVsbGJyaWdodCA9IHRydWU7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTc5RnVsbGJyaWdodCBlbmFibGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlcy5mdWxsYnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBtLmRpc3BsYXlUb0NoYXQoXCJcdTAwQTczRnVsbGJyaWdodCBkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsTUFBTSxJQUFJO0FBRVYsTUFBTSxVQUFVO0FBQUEsSUFDWixZQUFZO0FBQUEsRUFDaEI7QUFFQSxJQUFFLGNBQWMsK0JBQStCO0FBRS9DLElBQUUsaUJBQWlCLG1CQUFtQixDQUFDLE1BQVc7QUFDOUMsUUFBSSxDQUFDLEVBQUUsUUFBUSxXQUFXLEdBQUcsRUFBRztBQUVoQyxNQUFFLGlCQUFpQjtBQUVuQixRQUFJLEVBQUUsWUFBWSxPQUFPO0FBQ3JCLFVBQUksQ0FBQyxRQUFRLFlBQVk7QUFDckIsZ0JBQVEsYUFBYTtBQUNyQixVQUFFLGNBQWMseUJBQXNCO0FBQUEsTUFDMUMsT0FBTztBQUNILGdCQUFRLGFBQWE7QUFDckIsVUFBRSxjQUFjLDBCQUF1QjtBQUFBLE1BQzNDO0FBQUEsSUFDSjtBQUFBLEVBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
