import { useState } from "react";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import RSAHandler from "../lib/rsa_handler";
import { useNavigate } from "react-router";

export default function AddKeypair() {

    const [keypairName, setKeypairName] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const rsaHandler = new RSAHandler();
    const navigate = useNavigate();

    const generateKeypair = async () => {
        const keypair = await rsaHandler.generateKeypair();
        setPublicKey(keypair.publicKey);
        setPrivateKey(keypair.privateKey);
    }

    const saveKeypair = () => {
        rsaHandler.saveKeypair(keypairName, publicKey, privateKey);
        navigate("/");
    }

    return (
        <div className="flex flex-col gap-4 w-full md:w-2/3 mx-auto">
            <h1 className="text-2xl">Add keypair</h1>
            <div className="flex flex-col gap-1">
                <TextInput label="Name" name="keypairName" placeholder="Enter a name for your keypair" 
                onChange={(e) => setKeypairName(e.target.value)} />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <TextArea label="Public Key" name="publicKey" placeholder="Enter your public key" disabledValue={publicKey} disabled={true}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <TextArea label="Private Key" name="privateKey" placeholder="Enter your private key" disabledValue={privateKey} disabled={true} />
                </div>
            </div>
            <div className="ml-auto flex flex-row gap-2">
                <Button color="secondary" onClick={generateKeypair}>Generate Keypair</Button>
                <Button disabled={!publicKey || !privateKey || !keypairName} onClick={saveKeypair}>Save Keypair</Button>
            </div>
        </div>
    )
}