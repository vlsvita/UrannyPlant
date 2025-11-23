import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Paragraph, Title } from "../../components/Texts";
import { Button, Input } from "../../components/Form";
import NoteGIF from "../../assets/gif/note.gif";
import { Select } from "../../components/Select";
import { FirebaseError } from "firebase/app";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate()
  const {t} = useTranslation()

  const gridMap: { [key: string]: [number, number] } = {
    [t("seoul")]: [60, 127],
    [t("busan")]: [98, 76],
    [t("daegu")]: [89, 90],
    [t("incheon")]: [55, 124],
    [t("gwangju")]: [58, 74],
    [t("daejeon")]: [67, 100],
    [t("ulsan")]: [102, 84],
    [t("sejong")]: [66, 103],
    [t("gyeonggi")]: [60, 120],
    [t("chungbuk")]: [69, 107],
    [t("chungnam")]: [55, 107],
    [t("jeonnam")]: [51, 67],
    [t("gyeongbuk")]: [87, 106],
    [t("gyeongnam")]: [91, 77],
    [t("jeju")]: [52, 38],
    [t("ieodo")]: [28, 8],
    [t("gangwon")]: [73, 134],
    [t("jeonbuk")]: [63, 89],
  };

  const handleSignUp = async () => {
    setError("");

    if(!email.trim()){
      setError(t("input_email"));
      return;
    }

    if(!password.trim()){
      setError(t("input_password"));
      return;
    }

    // 위치 선택 검증
    if (!location) {
      setError(t("input_location"));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      const user = userCredential.user;

      const coordinates = gridMap[location];
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        location: location,
        coordinates: {
          nx: coordinates[0],
          ny: coordinates[1],
        },
      });
      alert(t("signup_success"));
      navigate("/main");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="relative flex flex-col items-center w-full max-w-[600px] px-6">
        <img className="w-full h-auto max-w-[600px]" src={NoteGIF} alt="Note" />
        <div className="absolute mt-4 w-full max-w-[600px] flex flex-col gap-2 px-36 pt-24 sm:px-48 sm:pt-32">
          <Title>{t("sign_up")}</Title>
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
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">{t("select_location")}</option>
              {Object.keys(gridMap).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-0.5">
            {error && <Paragraph className="text-red-500">{error}</Paragraph>}
            <div className="flex gap-2">
              <Button onClick={handleSignUp}>
                {t("sign_up")}
              </Button>
              <Button onClick={() => navigate(-1)} className="flex-1">
                {t("to_sign_in")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
