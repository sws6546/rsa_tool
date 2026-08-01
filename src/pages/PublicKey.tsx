import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import RSAHandler from "../lib/rsa_handler";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

export default function PublicKey() {
    const { id } = useParams();
    const rsaHandler = new RSAHandler();
    const navigate = useNavigate();
    const [publicKey, setPublicKey] = useState<string>("");
    const [encryptedText, setEncryptedText] = useState<string>("");

    useEffect(() => {
        const keys = rsaHandler.getKeys();
        const key = keys[id as string];
        if (!key) {
            navigate("/");
        }
        setPublicKey(key.publicKey);
    }, [id]);

    const handlePlainTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const plainText = e.target.value;
        const encryptedText = await rsaHandler.encrypt(publicKey, plainText);
        setEncryptedText(encryptedText as string);
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl">{id}</h1>
            <TextArea label="Public Key" name="publicKey" placeholder="Public Key" disabled={true} 
                disabledValue={publicKey} rows={5} />
            <hr className="border-slate-300" />
            <h2 className="text-2xl">Encrypt</h2>
            <TextArea label="Plain Text" name="plainText" placeholder="Plain Text" onChange={handlePlainTextChange} rows={5} />
            <TextArea label="Encrypted Text" name="encryptedText" placeholder="Encrypted Text" disabled={true} 
                disabledValue={encryptedText} rows={5} />
            
            <div className="ml-auto">
                <Button color="secondary" onClick={() => navigate("/")}>Back</Button>
            </div>
        </div>
    )
}