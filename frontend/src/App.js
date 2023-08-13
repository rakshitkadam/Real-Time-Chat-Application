import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatsPage from "./pages/ChatsPage";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={ChatsPage} />
    </div>
  );
}

export default App;
