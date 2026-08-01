import { useEffect, useState } from "react";
import RSAHandler from "../lib/rsa_handler";
import { useNavigate } from "react-router";
import Button from "./Button";

export default function KeysList() {
    const rsaHandler = new RSAHandler();
    const [keys, setKeys] = useState<Record<string, { publicKey: string; privateKey: string }>>({});

    useEffect(() => {
        setKeys(rsaHandler.getKeys());
    }, []);

    const navigate = useNavigate();

    const handleKeyClick = (key: string) => {
        if (keys[key]?.publicKey && keys[key]?.privateKey) {
            navigate(`/keyPair/${key}`);
        }
    }

    const handleDeleteKey = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this key pair?")) {
            rsaHandler.deleteKeyPairFromLocalStorage(name);
            setKeys(rsaHandler.getKeys());
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {Object.keys(keys).map((key) => (
                <div key={key} onClick={() => handleKeyClick(key)}
                    className="flex flex-row justify-between items-center bg-slate-200 p-3
                    shadow-xl rounded-xl px-6 cursor-pointer hover:bg-slate-300 transition-all duration-300">
                    <h2 className="text-lg font-bold">{key}</h2>
                    <div className="flex flex-row gap-4 text-lg items-center">
                        {keys[key]?.publicKey && <p className="border-r pr-4 border-slate-300">public key</p>}
                        {keys[key]?.privateKey && <p>private key</p>}
                        <div></div>
                        <Button color="danger" onClick={(e) => handleDeleteKey(e, key)}>Delete</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}