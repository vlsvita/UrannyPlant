import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Loading from './pages/loading/index.tsx';

import "./i18n.ts";

import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {
    console.log("새 버전이 있습니다.");
  },
  onOfflineReady() {
    console.log("오프라인 사용 가능합니다.");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
);
