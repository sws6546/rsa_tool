import { useState } from "react";
import TextInput from "../components/TextInput"
import TextArea from "../components/TextArea"
import Button from "../components/Button"
import RSAHandler from "../lib/rsa_handler";
import { useNavigate } from "react-router";

export default function AddPublicKey() {

    const rsaHandler = new RSAHandler();
    const navigate = useNavigate();

    const [publicKey, setPublicKey] = useState("");
    const [publicKeyName, setPublicKeyName] = useState("");

    const savePublicKey = () => {
        if (!publicKey || !publicKeyName) {
            return;
        }
        rsaHandler.savePublicKey(publicKeyName, publicKey);
        navigate("/");
    }

    return (
        <div className="flex flex-col gap-4 w-full md:w-2/3 mx-auto">
            <h1 className="text-2xl">Add public key</h1>
            <div className="flex flex-col gap-1">
                <TextInput label="Name" name="publicKeyName" placeholder="Enter a name for your public key"
                    onChange={(e) => setPublicKeyName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
                <TextArea label="Public Key" name="publicKey" placeholder="Enter your public key" rows={10} onChange={(e) => setPublicKey(e.target.value)} />
            </div>
            <div className="ml-auto flex flex-row gap-2">
                <Button disabled={!publicKey || !publicKeyName} onClick={savePublicKey}>Save Public Key</Button>
            </div>
        </div>
    )
}