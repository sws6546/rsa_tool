import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import AddKeypair from "./pages/AddKeypair"
import KeyPair from "./pages/KeyPair"
import AddPublicKey from "./pages/AddPublicKey"
import PublicKey from "./pages/PublicKey"

function App() {
  return (
    <>
      <Header />
      <main className="p-4 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-keypair" element={<AddKeypair />} />
          <Route path="/add-public-key" element={<AddPublicKey />} />
          <Route path="/keyPair/:id" element={<KeyPair />} />
          <Route path="/publicKey/:id" element={<PublicKey />} />
        </Routes>
      </main>
    </>
  )
}

export default App
