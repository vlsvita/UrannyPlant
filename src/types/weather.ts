
interface WeatherItem {
    baseDate: string; // YYYYMMDD
    baseTime: string; // HHmm
    category: string; // PTY, REH 등
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

