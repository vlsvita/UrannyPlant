
export type WeatherCategory = "T1H" | "RN1" | "UUU" | "VVV" | "REH" | "PTY" | "VEC" | "WSD"

interface WeatherItem {
    baseDate: string; // YYYYMMDD
    baseTime: string; // HHmm
    category: WeatherCategory
    nx: number;
    ny: number;
    obsrValue: string; // 관측값
}

interface WeatherHeader {
    resultCode: string;
    resultMsg: string;
}

interface WeatherBody {
    dataType: string;
    items: {
        item: WeatherItem[];
    };
    numOfRows: number;
    pageNo: number;
    totalCount: number;
}

export interface WeatherResponse {
    response: {
        header: WeatherHeader;
        body: WeatherBody;
    };
}

