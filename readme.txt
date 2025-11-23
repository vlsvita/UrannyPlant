- UI 스타일 가이드

## 1. 컬러 팔레트
- 글자: `text-black`, `text-white`, `text-red-500` (에러)
- 배경: `bg-white`, `bg-black`, `bg-blue-200` (메인 배경)
- 버튼: `bg-white text-black`, `bg-black text-white`, `border-gray-300`, `border-black`
- 입력필드: `bg-white`, `border-gray-300`, `focus:border-black`
- 기타: 투명 버튼용 `bg-transparent border-none text-black`

## 2. 폰트
- 인천교육자람체 사용(https://noonnu.cc/font_page/1226)
- 헤드라인(제목, 강조): 24px, Tailwind 기준 `text-4xl sm:text-2xl`
- 바디(본문, 버튼): 18px, Tailwind 기준 `text-lg sm:text-base`
- 소제목: 20px, Tailwind 기준 `text-2xl sm:text-lg`
- 일반 텍스트: 16px, Tailwind 기준 `text-base sm:text-sm`
- 글로벌 폰트 적용: `font-[inchun]` 또는 CSS에서 `font-family: 'IncheonJaram', sans-serif;`

## 3. 컴포넌트별 스타일

### Button
- 기본: `rounded-lg px-4 py-2 bg-black text-white text-lg border border-black cursor-pointer transition hover:bg-white hover:text-black sm:text-base sm:px-2 sm:py-1`
- 서브: `rounded-lg px-4 py-2 bg-white text-black text-lg border border-gray-300 cursor-pointer transition hover:bg-black hover:text-white sm:text-base sm:px-2 sm:py-1`
- 텍스트 버튼: `bg-transparent border-none text-black text-lg cursor-pointer hover:underline p-0 m-0 sm:text-base`

### Input
- `w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black text-lg focus:outline-none focus:border-black sm:text-base sm:px-2 sm:py-1`

### Select
- `w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black text-lg focus:outline-none focus:border-black appearance-none sm:text-base sm:px-2 sm:py-1`

### Texts (Texts.tsx)
- Title: `text-4xl whitespace-pre-line sm:text-2xl`
- Summary: `text-2xl whitespace-pre-line sm:text-lg`
- Paragraph: `text-lg whitespace-pre-line sm:text-base`
- 모두 line-clamp 지원: `line-clamp-{number}`

## 4. 레이아웃 및 반응형
- 주요 컨테이너: `w-[40vw] max-w-[400px] min-w-[260px] sm:w-[90vw]` 등 vw, max/min-width, padding 등으로 반응형 적용
- 내부 padding: `px-4 sm:px-2`, gap: `gap-4 sm:gap-2`, margin: `mt-8 sm:mt-4` 등
- 이미지: `w-full`, `h-auto`, `max-w-[600px]`, `sm:w-36` 등
- 버튼, 입력, 셀렉트 등은 모두 `rounded-lg`로 통일
- 텍스트는 `whitespace-pre-line`으로 줄바꿈 지원
- 버튼 등 상호작용 요소는 `cursor-pointer` 적용
- 에러 메시지: `text-red-500`
- overflow-y-auto, flex, gap 등 Tailwind 유틸리티 적극 활용

## 5. 기타
- 모든 주요 컴포넌트(Button, Input, Select, Texts)는 sm 브레이크포인트에서 폰트 크기와 패딩이 줄어듦
- 다국어(i18n) 지원: 모든 텍스트는 t()로 관리, 지역명 등도 다국어화
- 일기 리스트, 입력, 버튼 등은 모바일 환경에서도 자연스럽게 보이도록 설계