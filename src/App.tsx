import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AddKeypair from "./pages/AddKeypair"
import KeyPair from "./pages/KeyPair"

function App() {
  return (
    <>
      <Header />
      <main className="p-4 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-keypair" element={<AddKeypair />} />
          <Route path="/keyPair/:id" element={<KeyPair />} />
        </Routes>
      </main>
    </>
  )
}

export default App
