import { useTranslation } from "react-i18next";
import type { DiaryEntry } from "../../types/diary";
import { Paragraph } from "../Texts";
import { TextButton } from "../Form";

interface DiaryListProps {
    diaryList: DiaryEntry[];
    onEdit: (entry: DiaryEntry) => void;
    onDelete: (id: string) => void;
}

export default function DiaryList({ diaryList, onEdit, onDelete }: DiaryListProps) {
    const {t} = useTranslation()
    if (diaryList.length === 0) {
        return <Paragraph className="h-116 sm:h-118 mt-8">{t("no_diary")}</Paragraph>;
    }
    return (
        <div className="w-full h-116 sm:h-118 flex flex-col mt-8 overflow-y-auto gap-2 sm:gap-1">
            {diaryList.map((v, i) => (
                <div key={i} className="flex flex-row w-full gap-2 cursor-pointer sm:gap-1" onClick={() => onEdit(v)}>
                    <div className="flex flex-col flex-1">
                        <Paragraph>{t("title", {title : v.title})}</Paragraph>
                        <Paragraph>{t("date", {date : (new Date(v.createdAt)).toLocaleDateString()})}</Paragraph>
                    </div>
                    <div className="flex flex-row w-auto gap-4 sm:gap-2">
                        <TextButton onClick={() => onEdit(v)}>{t("edit")}</TextButton>
                        <TextButton onClick={(e) => {
                            e.stopPropagation();
                            onDelete(v.id);
                        }}>
                            {t("delete")}
                        </TextButton>
                    </div>
                </div>
            ))}
        </div>
    );
}
