import { useNavigate } from "react-router";
import Button from "../components/Button";
import KeysList from "../components/KeysList";

export default function Home() {

  let navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Your rsa keys</h1>
        <div className="flex flex-row gap-2">
          <Button onClick={() => { navigate("/add-keypair") }} color="primary">Add keypair</Button>
          <Button onClick={() => { console.log("add public key") }} color="secondary">Add public key</Button>
        </div>
      </div>
      <KeysList />
    </div>
  )
}
