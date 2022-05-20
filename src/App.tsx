import "./App.css";
import "antd/dist/antd.css";
import { Slammer } from "./Slammer";
import { moveDefinition } from "./EpicenterDefinitions/move";

function App() {
  return <Slammer definitions={[moveDefinition]} />;
}

export default App;
