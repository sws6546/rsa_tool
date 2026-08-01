import { useNavigate, useParams } from "react-router";
import RSAHandler from "../lib/rsa_handler";
import { useEffect, useState } from "react";
import TextArea from "../components/TextArea";

export default function KeyPair() {
    const { id } = useParams();
    const rsaHandler = new RSAHandler();
    const navigate = useNavigate();
    const [keypair, setKeypair] = useState<{ publicKey: string; privateKey: string } | null>(null);
    const [encryptedText, setEncryptedText] = useState<string>("");
    const [plainText, setPlainText] = useState<string>("");

    useEffect(() => {
        const keys = rsaHandler.getKeys();
        const key = keys[id as string];
        if (!key) {
            navigate("/");
        }
        setKeypair(key);
    }, [id]);

    const handlePlainTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const plainText = e.target.value;
        const encryptedText = await rsaHandler.encrypt(keypair?.publicKey as string, plainText);
        setEncryptedText(encryptedText as string);
    }

    const handleEncryptedTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const encryptedText = e.target.value;
        const plainText = await rsaHandler.decrypt(keypair?.privateKey as string, encryptedText);
        setPlainText(plainText as string);
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl">{id}</h1>
            <div className="flex flex-row gap-4 w-full">
                <TextArea rows={5} label="Public Key" name="publicKey" placeholder="Public Key" disabled={true} 
                disabledValue={keypair?.publicKey} />
                <TextArea rows={5} label="Private Key" name="privateKey" placeholder="Private Key" disabled={true} 
                disabledValue={keypair?.privateKey} />
            </div>
            <div className="flex flex-row gap-4 w-full mt-4">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-2xl">Encrypt</h2>
                    <TextArea rows={5} label="Plain Text" name="plainText" placeholder="Plain Text" onChange={handlePlainTextChange} />
                    <TextArea rows={5} label="Encrypted Text" name="encryptedText" placeholder="Encrypted Text" disabled={true} disabledValue={encryptedText} />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-2xl">Decrypt</h2>
                    <TextArea rows={5} label="Encrypted Text" name="encryptedText" placeholder="Encrypted Text" onChange={handleEncryptedTextChange} />
                    <TextArea rows={5} label="Plain Text" name="plainText" placeholder="Plain Text" disabled={true} disabledValue={plainText} />
                </div>
            </div>
        </div>
    )
}