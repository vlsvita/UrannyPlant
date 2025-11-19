import type { WeatherCategory } from "../types/weather";

const PTY_MAP: Record<string, string> = {
    "0": "맑음",
    "1": "비",
    "2": "비/눈",
    "3": "눈",
    "5": "빗방울",
    "6": "빗방울/눈날림",
    "7": "눈날림",
};

const CATEGORY_MAP: Record<WeatherCategory, { label: string; unit?: string }> = {
    T1H: { label: "기온", unit: "°C" },
    RN1: { label: "강수량(1시간당)", unit: "mm" },
    UUU: { label: "동서바람", unit: "m/s" },
    VVV: { label: "남북풍향", unit: "m/s" },
    REH: { label: "습도", unit: "%" },
    PTY: { label: "강수형태" },
    VEC: { label: "풍향", unit: "°" },
    WSD: { label: "풍속", unit: "m/s" },
};

const formatCategory = (category : WeatherCategory, obsrValue : string) => {
    const categoryInfo = CATEGORY_MAP[category]

    if(!categoryInfo) {
        return {
            label : category,
            value : obsrValue + "단위"
        }
    }

    let value = obsrValue

    if(category === 'PTY') {
        value = PTY_MAP[obsrValue] ?? '알 수 없음'
    } else if (categoryInfo.unit) {
        value += categoryInfo.unit;
    }

    return {
        label : categoryInfo.label,
        value
    }
}

export default formatCategory