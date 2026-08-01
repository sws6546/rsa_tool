export default class RSAHandler {
    constructor() {}

    async generateKeypair() {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
        );

        const exportKey = async (key: CryptoKey, type: "public" | "private") => {
            const exported = await window.crypto.subtle.exportKey(
                type === "public" ? "spki" : "pkcs8",
                key
            );
            const b64 = window.btoa(String.fromCharCode(...new Uint8Array(exported)));
            const pem = `-----BEGIN ${type === "public" ? "PUBLIC" : "PRIVATE"} KEY-----\n${b64.match(/.{1,64}/g)?.join('\n')}\n-----END ${type === "public" ? "PUBLIC" : "PRIVATE"} KEY-----`;
            return pem;
        };

        const publicKeyPem = await exportKey(keyPair.publicKey, "public");
        const privateKeyPem = await exportKey(keyPair.privateKey, "private");

        return {
            publicKey: publicKeyPem,
            privateKey: privateKeyPem
        };
    }

    saveKeypair(name: string, publicKey: string, privateKey: string) {
        const stored = localStorage.getItem("keys");
        const keys: Record<string, { publicKey: string; privateKey: string }> = stored
            ? JSON.parse(stored)
            : {};

        keys[name] = { publicKey, privateKey };
        localStorage.setItem("keys", JSON.stringify(keys));
    }

    getKeys() {
        const stored = localStorage.getItem("keys");
        return stored ? JSON.parse(stored) : {};
    }

    deleteKeyPairFromLocalStorage(name: string) {
        const stored = localStorage.getItem("keys");
        const keys: Record<string, { publicKey: string; privateKey: string }> = stored
            ? JSON.parse(stored)
            : {};
        delete keys[name];
        localStorage.setItem("keys", JSON.stringify(keys));
    }

    private pemToArrayBuffer(pem: string): ArrayBuffer {
        const b64 = pem
            .replace(/-----BEGIN [A-Z ]+-----/, "")
            .replace(/-----END [A-Z ]+-----/, "")
            .replace(/\s/g, "");
        const binary = window.atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    async encrypt(publicKey: string, plainText: string): Promise<string> {
        const key = await window.crypto.subtle.importKey(
            "spki",
            this.pemToArrayBuffer(publicKey),
            {
                name: "RSA-OAEP",
                hash: "SHA-256",
            },
            false,
            ["encrypt"]
        );

        const encoded = new TextEncoder().encode(plainText);
        const encrypted = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            key,
            encoded
        );

        return window.btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    }

    async decrypt(privateKey: string, encryptedText: string): Promise<string> {
        const key = await window.crypto.subtle.importKey(
            "pkcs8",
            this.pemToArrayBuffer(privateKey),
            {
                name: "RSA-OAEP",
                hash: "SHA-256",
            },
            false,
            ["decrypt"]
        );

        const binary = window.atob(encryptedText);
        const encrypted = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            encrypted[i] = binary.charCodeAt(i);
        }

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            key,
            encrypted
        );

        return new TextDecoder().decode(decrypted);
    }

    savePublicKey(name: string, publicKey: string) {
        const stored = localStorage.getItem("keys");
        const keys: Record<string, { publicKey: string; privateKey: string }> = stored
            ? JSON.parse(stored)
            : {};

        keys[name] = { publicKey, privateKey: "" };
        localStorage.setItem("keys", JSON.stringify(keys));
    }
}