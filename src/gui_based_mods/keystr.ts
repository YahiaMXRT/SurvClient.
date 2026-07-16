import { toggles } from "../main";
import { 
    keysPressed, 
    handleRender, 
    handlers
} from "./handler/handler";
// @ts-ignore: side-effect import so webpack can bundle and inject CSS
import "./keystrokesCSS.css";
export var keystrokesRndr: HTMLElement;
let inputListenersBound = false;

const attachInputListeners = () => {
  if (inputListenersBound) return;

  window.addEventListener("keydown", handlers.keyDown, true);
  window.addEventListener("keyup", handlers.keyUp, true);
  window.addEventListener("mousedown", handlers.mouseDown, true);
  window.addEventListener("mouseup", handlers.mouseUp, true);
  inputListenersBound = true;
};

const detachInputListeners = () => {
  if (!inputListenersBound) return;

  window.removeEventListener("keydown", handlers.keyDown, true);
  window.removeEventListener("keyup", handlers.keyUp, true);
  window.removeEventListener("mousedown", handlers.mouseDown, true);
  window.removeEventListener("mouseup", handlers.mouseUp, true);
  inputListenersBound = false;
};

export var initkeystrokesCSS = () => {
  // CSS is imported at module load; with style-loader it will be injected automatically.
};

export var initKeystrokes = () => {
  const existing = document.getElementById("keystrokes_") as HTMLElement | null;
  if (toggles.keystrokes) {
    const keystrokes = existing ?? document.createElement("div");
    keystrokes.id = "keystrokes_";
    if (!existing) document.body.appendChild(keystrokes);
    keystrokesRndr = keystrokes;
    attachInputListeners();
  } else {
    const el = document.getElementById("keystrokes_");
    detachInputListeners();
    if (el) el.remove();
  }
};
