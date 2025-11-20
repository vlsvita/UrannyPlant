import { useCallback, useEffect, useState } from "react"
import getWeather from "../../api/weather"
import type { WeatherResponse } from "../../types/weather"
import BackgorundImg from "../../assets/images/background.png"
import PlantGIF from "../../assets/gif/plant.gif"
import formatCategory from "../../utils/FormatCategory"

export default function Main() {
    const [response, setResponse] = useState<WeatherResponse | null>(null)

    useEffect(() => {
        const initWeather = async () => {
            const data = await getWeather();
            if(!data){
                console.log('값 받아오기 실패')
                return
            }
            setResponse(data)
        }
        initWeather()
    }, [])

    const renderWeatherInfoList = useCallback(() => {
        return response?.response.body.items.item.map(({category, obsrValue}, i) => {
            const { label, value } = formatCategory(category, obsrValue);
            return (
                <div className="inline-flex flex-row gap-2 p-2 mr-2 mb-2 bg-white flex-wrap" key={i}>
                    <p>{label}</p>
                    <p>{value}</p>
                </div>
            );
        });
    }, [response])

    return (
        <div className="relative w-screen h-screen bg-blue-200">
            <img
                className="absolute w-screen h-screen object-cover"
                src={BackgorundImg}
            />
            <img 
                className="w-60 left-1/2 top-1/2 -translate-x-4/7 translate-y-1/5 absolute object-contain"
                src={PlantGIF}
            />
            <div className="gap-3 absolute">
                {renderWeatherInfoList()}
            </div>
        </div>
    )
}