- UI 스타일 가이드

## 1. 컬러 팔레트
- 글자: `text-black`, `text-white`
- 배경: `bg-white`, `bg-black`, `bg-blue-200` (메인 배경)
- 버튼: `bg-white text-black`, `bg-black text-white`, `border-gray-300`, `border-black`
- 입력필드: `bg-white`, `border-gray-300`, `focus:border-black`
- 기타: 투명 버튼용 `bg-transparent border-none text-black`

## 2. 폰트
- 인천교육자람체 사용(https://noonnu.cc/font_page/1226)
- 헤드라인(제목, 강조): 24px, Tailwind 기준 `text-3xl`
- 바디(본문, 버튼): 18px, Tailwind 기준 `text-lg`

## 3. 컴포넌트별 스타일

### Button
- 기본: `rounded-lg px-4 py-2 bg-black text-white text-lg border border-black cursor-pointer transition`
- 서브: `rounded-lg px-4 py-2 bg-white text-black text-lg border border-gray-300 cursor-pointer transition`
- 텍스트 버튼: `bg-transparent border-none text-black text-lg cursor-pointer hover:underline p-0 m-0`

### Input
- `w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black text-lg focus:outline-none focus:border-black`

### Select
- `w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black text-lg focus:outline-none focus:border-black appearance-none`

### Texts (Texts.tsx)
- Title: `text-4xl whitespace-pre-line`
- Summary: `text-2xl whitespace-pre-line`
- Paragraph: `text-lg whitespace-pre-line`
- 모두 line-clamp 지원: `line-clamp-{number}`

## 4. 기타
- 버튼, 입력, 셀렉트 등은 모두 `rounded-lg`로 통일
- 텍스트는 `whitespace-pre-line`으로 줄바꿈 지원
- 버튼 등 상호작용 요소는 `cursor-pointer` 적용
- 에러 메시지: `text-red-500`