import { useTranslation } from "react-i18next";
import { Input, Button } from "../Form";

type DiaryInputProps = {
    title: string;
    content: string;
    setTitle: (v: string) => void;
    setContent: (v: string) => void;
    onCancel: () => void;
    onSave: () => void;
}

export default function DiaryInput({ title, content, setTitle, setContent, onCancel, onSave }: DiaryInputProps) {
    const {t} = useTranslation()
    return (
        <div className="flex flex-1 flex-col w-full h-full pt-13 pr-16 pl-16 pb-16">
            <div className="flex flex-1 flex-col w-full">
                <Input
                    isForm={false}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("input_title")}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t("input_contents")}
                    className="w-full h-116 sm:h-118 text-lg mt-8 border-gray-300 focus:outline-none resize-none sm:text-base"
                />
            </div>
            <div className="flex flex-row gap-2">
                <Button
                    onClick={onCancel}
                    className="w-full mt-3 text-lg sm:text-base"
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={onSave}
                    className="w-full mt-3 text-lg sm:text-base"
                >
                    {t("complete")}
                </Button>
            </div>
        </div>
    );
}
