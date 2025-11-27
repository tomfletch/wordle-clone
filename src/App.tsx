import "./App.css";
import { Wordle } from "./components/Wordle/Wordle";
import { InputControllerProvider } from "./context/InputController/InputControllerProvider";

function App() {
  return (
    <InputControllerProvider>
      <Wordle />
    </InputControllerProvider>
  );
}

export default App;
