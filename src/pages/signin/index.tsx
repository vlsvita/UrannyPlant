import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Paragraph, Title } from "../../components/Texts";
import { Button, Input } from "../../components/Form";
import NoteGIF from "../../assets/gif/note.gif";

export default function Signin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSignIn = async () => {
        setError("");

        if (!email.trim()) {
            setError(t("input_email"));
            return;
        }
        if (!password.trim()) {
            setError(t("input_password"));
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password.trim());
            alert(t("login_success"));
            navigate("/main");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="relative flex flex-col items-center w-full max-w-[600px] px-6">
                <img className="w-full h-auto max-w-[600px]" src={NoteGIF} alt="Note" />
                <div className="absolute mt-4 w-full max-w-[600px] flex flex-col gap-2 px-36 pt-24 sm:px-48 sm:pt-32">
                    <Title>{t("sign_in")}</Title>
                    <div className="flex flex-col gap-2 w-full">
                        <Input
                            isForm
                            type="email"
                            value={email}
                            placeholder={t("input_email")}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            isForm
                            type="password"
                            value={password}
                            placeholder={t("input_password")}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        {error && <Paragraph className="text-red-500">{error}</Paragraph>}
                        <div className="flex gap-2">
                            <Button onClick={handleSignIn}>
                                {t("sign_in")}
                            </Button>
                            <Button onClick={() => navigate("/sign-up")} className="flex-1">
                                {t("to_sign_up")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
