import './App.css'
import { Example } from "./components/Example/Example";
import { ExampleState } from "./state/example";

function App() {
  return (
      <ExampleState.Provider>
        <div>
            <div className="flex h-screen">
                <div className="m-auto">
                    <Example />
                </div>
            </div>
        </div>
      </ExampleState.Provider>
  )
}

export default App
