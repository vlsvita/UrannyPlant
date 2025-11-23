import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { makeClassName } from "./textUtil";
// P tag 의 모든 속성
type TextProps = DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
>;
export type TitleProps = TextProps & {
    numberOfLines?: number;
};
export const Title: FC<TitleProps> = ({
    className: _className,
    numberOfLines,
    ...props
}) => {
    const className = makeClassName(
        "text-4xl whitespace-pre-line sm:text-2xl",
        _className,
        numberOfLines
    );
    return <p {...props} className={className} />;
};

export type SummaryProps = TitleProps & {}; // Title과 속성 동일
export const Summary: FC<SummaryProps> = ({
    className: _className,
    numberOfLines,
    ...props
}) => {
    const className = makeClassName(
        "text-2xl whitespace-pre-line sm:text-lg",
        _className,
        numberOfLines
    );
    return <p {...props} className={className} />;
};

export type ParagraphProps = TitleProps & {}; // Title과 속성 동일
export const Paragraph: FC<ParagraphProps> = ({
    className: _className,
    numberOfLines,
    ...props
}) => {
    const className = makeClassName(
        "text-base whitespace-pre-line sm:text-sm",
        _className,
        numberOfLines
    );
    return <p {...props} className={className} />;
};
