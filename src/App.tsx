import "./App.css";
import "antd/dist/antd.css";
import { Slammer } from "./Slammer";
import { moveDefinition } from "./EpicenterDefinitions/move";
import { sifLayout } from "./EpicenterDefinitions/sifLayout";

function App() {
  return <Slammer definitions={[moveDefinition, sifLayout]} />;
}

export default App;
