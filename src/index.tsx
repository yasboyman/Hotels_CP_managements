import './index.css';
import { createRoot } from "react-dom/client"; // Updated to React 18+ method
import { App } from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);