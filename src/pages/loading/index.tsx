import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import NoteGIF from "../../assets/gif/note.gif"
import { useTranslation } from "react-i18next";
import { Title } from "../../components/Texts";

export default function Loading() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()
    const {t} = useTranslation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(!user){
                navigate('/sign-in')
            } else {
                navigate('/main')
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-1 justify-center items-center w-screen h-screen bg-white">
            <div className="w-[60vw] relative inset-0">
                <img className="w-full" src={NoteGIF}/>
                <Title className="absolute top-1/2 -translate-y-2/3 left-1/2 -translate-x-1/2">{t("loading")}</Title>
            </div>
        </div>
    )
}