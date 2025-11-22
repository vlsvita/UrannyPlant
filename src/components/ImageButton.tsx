import { useState } from "react"

type ImageButtonProps = {
    className ?: string
    src : string
    onClick ?: () => void
}

export default function ImageButton(props : ImageButtonProps){
    const [pressed, setPressed] = useState(false)
    return (
        <img 
            src={props.src}
            className={`${props.className} ${pressed ? "opacity-70" : "opacity-100"}`}
            onClick={props.onClick}
            onMouseDown={(_) => setPressed(true)}
            onMouseUp={(_) => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchStart={(_) => setPressed(true)}
            onTouchEnd={(_) => setPressed(false)}
            onTouchCancel={(_) => setPressed(false)}
        />
    )
}