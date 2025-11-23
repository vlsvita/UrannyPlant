import { useCallback, useEffect, useState } from "react";
import getWeather from "../../api/weather";
import type { WeatherResponse } from "../../types/weather";
import PlantGIF from "../../assets/gif/plant.gif";
import DiaryGIF from "../../assets/gif/diary.gif";
import WindowGIF from "../../assets/gif/background/window.gif";
import PageGIF from "../../assets/gif/page.gif";
import type { UserData } from "../../types/user";
import { getUserData } from "../../api/user";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ImageButton from "../../components/ImageButton";
import type { DiaryEntry } from "../../types/diary";
import NoteGIF from "../../assets/gif/note.gif";
import {
  createDiary,
  deleteDiary,
  fetchDiaries,
  updateDiary,
} from "../../api/diary";
import BackgroundImage from "../../components/main/BackgroundImage";
import DiaryList from "../../components/main/DiaryList";
import DiaryInput from "../../components/main/DiaryInput";
import { useTranslation } from "react-i18next";
import { Summary, Title } from "../../components/Texts";
import { Button } from "../../components/Form";
import { useNavigate } from "react-router";

export default function Main() {
  const { t } = useTranslation();
  const [response, setResponse] = useState<WeatherResponse | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<UserData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showPage, setShowPage] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserData(user.uid);
        if (!data) {
          alert("사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.");
          navigate(-1)
          return;
        }
        setUserData(data);
      } catch (error) {
        alert(
          `사용자 정보를 불러오는 중 오류가 발생했습니다: ${
            error instanceof Error ? error.message : "알 수 없는 오류"
          }`
        );
        navigate(-1);
      }
    };

    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    if (!userData?.coordinates) {
      return;
    }
    const initWeather = async () => {
      try {
        const data = await getWeather(
          userData.coordinates.nx,
          userData.coordinates.ny
        );
        if (!data) {
          alert(`날씨 정보를 불러오는 중 오류가 발생했습니다 \n약 20분 후 재시도해보시길 권장드립니다`);
          setLoading(false);
          return;
        }
        setResponse(data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "알 수 없는 오류";
        alert(
          `날씨 정보를 불러오는 중 오류가 발생했습니다: ${errorMessage}\n약 20분 후 재시도해보시길 권장드립니다.`
        );
        setLoading(false);
        navigate(-1);
      }
    };
    initWeather();
  }, [userData, navigate]);

  useEffect(() => {
    if (!user?.uid) return;
    const load = async () => {
      try {
        const list = await fetchDiaries(user.uid);
        setDiaryList(list);
      } catch (error) {
        alert(
          `일기 목록을 불러오는 중 오류가 발생했습니다: ${
            error instanceof Error ? error.message : "알 수 없는 오류"
          }`
        );
      }
    };
    load();
  }, [user?.uid]);

  const handleSaveDiary = useCallback(async () => {
    if (!user?.uid) {
      alert("로그인이 필요합니다.");
      navigate(-1);
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요");
      return;
    }

    try {
      const now = Date.now();

      if (editingId) {
        await updateDiary(user.uid, editingId, {
          title: title.trim(),
          content: content.trim(),
          updatedAt: now,
        });
        alert("일기가 수정되었습니다");
      } else {
        await createDiary(user.uid, {
          title : title.trim(),
          content : content.trim(),
          createdAt: now,
          updatedAt: now,
        });
        alert("일기가 저장되었습니다");
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      setShowInput(false);

      const list = await fetchDiaries(user.uid);
      setDiaryList(list);
    } catch (error) {
      const operation = editingId ? "수정" : "저장";
      alert(
        `일기 ${operation}에 실패했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  }, [user?.uid, title, content, editingId, navigate]);

  const handleEditDiary = (entry: DiaryEntry) => {
    try {
      setTitle(entry.title);
      setContent(entry.content);
      setEditingId(entry.id);
      setShowInput(true);
    } catch (error) {
      alert(
        `일기를 불러오는 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  const handleDeleteDiary = async (id: string) => {
    if (!user?.uid) {
      alert("로그인이 필요합니다");
      return;
    }

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteDiary(user.uid, id);
      setDiaryList((prev) => prev.filter((d) => d.id !== id));
      alert("삭제에 성공했습니다.");
    } catch (error) {
      alert(
        `삭제에 실패했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  return (
    <div className="relative w-screen h-screen bg-blue-200">
      <BackgroundImage response={response} />
      <img
        className="absolute w-screen h-screen object-cover"
        src={WindowGIF}
      />
      <img
        className="w-45 sm:w-48 md:w-51 lg:w-54 xl:w-57 2xl:w-60 left-1/2 bottom-[3vh] -translate-x-1/2 absolute object-contain"
        src={PlantGIF}
      />
      <ImageButton
        className="w-55 sm:w-60 md:w-65 lg:w-70 xl:w-75 2xl:w-80 -right-5 sm:right-[3vw] md:right-[6vw] lg:right-[9vw] xl:right-[12vw] 2xl:right-[15vw] bottom-[3vh] absolute object-contain cursor-pointer"
        src={DiaryGIF}
        onClick={() => {
          setShowPage(true);
        }}
      />
      {showPage && (
        <div
          onClick={() => {
            setTitle("");
            setContent("");
            setEditingId(null);
            setShowPage(false);
            setShowInput(false);
          }}
          className="w-screen h-full absolute bg-black/50 backdrop-blur-2xl flex justify-center overflow-y-auto py-21"
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              className="h-[700px] w-auto"
              src={PageGIF}
              alt="page"
            />
            <div className="absolute inset-0 flex h-full flex-col items-center">
              {showInput ? (
                <DiaryInput
                  title={title}
                  content={content}
                  setTitle={setTitle}
                  setContent={setContent}
                  onCancel={() => {
                    setTitle("");
                    setContent("");
                    setEditingId(null);
                    setShowInput(false);
                  }}
                  onSave={handleSaveDiary}
                />
              ) : (
                <div
                  className="flex flex-col w-full pt-13 pr-16 pl-16 pb-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-1 flex-col w-full h-full">
                    <Summary>{t("my_diary_list")}</Summary>
                    <DiaryList
                      diaryList={diaryList}
                      onEdit={handleEditDiary}
                      onDelete={handleDeleteDiary}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <Button
                      onClick={() => {
                        setTitle("");
                        setContent("");
                        setEditingId(null);
                        setShowPage(false);
                      }}
                      className="w-full mt-3 text-lg"
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      onClick={() => setShowInput(true)}
                      className="w-full mt-3 text-lg"
                    >
                      {t("create")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="w-screen h-full absolute bg-black/50 backdrop-blur-2xl flex items-center justify-center">
          <div className="w-full max-w-[600px] relative inset-0">
            <img className="w-full" src={NoteGIF} />
            <Title className="absolute top-1/2 -translate-y-2/3 left-1/2 -translate-x-1/2">
              {t("loading_weather")}
            </Title>
          </div>
        </div>
      )}
    </div>
  );
}
