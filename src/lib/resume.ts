/**
 * 문서(PDF)용 요약 데이터.
 * 웹 페이지는 스크롤하며 훑는 매체지만 PDF는 첫 페이지에서 판단이 끝난다.
 * 그래서 나머지 섹션과 달리 이 블록만 손으로 추려 둔다.
 */

export interface ResumeStat {
  label: string;
  value: string;
}

export const RESUME_HEADLINE = "실시간·3D·모바일 앱까지, 현장에서 쓰이는 서비스를 만들어 온 프론트엔드 개발자";

export const RESUME_SUMMARY = [
  "폐쇄망 WebRTC CCTV, LiveKit SFU 화상회의, WebSocket·SSE 실시간 동기화 등 브라우저에서 다루기 까다로운 미디어·실시간 영역을 반복해서 맡아 왔습니다.",
  "Three.js 3D 관제 시스템과 GPS 기반 골프장 운영 서비스처럼 실제 현장에서 매일 돌아가는 프로덕션을 개발하고, 현장 배포·즉시 수정까지 책임졌습니다.",
  "React Native 앱을 개발부터 네이티브 설정·릴리스 서명·스토어 제출까지 단독으로 수행하며 웹 밖의 배포 파이프라인도 직접 다뤘습니다.",
  "FSD 아키텍처, zod 2층 계약 테스트, API 응답 계약 문서화처럼 '왜 이렇게 했는지'가 남는 구조를 선호하고, 되돌린 결정도 근거와 함께 기록합니다.",
];

export const RESUME_STATS: ResumeStat[] = [
  { label: "Focus", value: "React · TypeScript · Next.js" },
  { label: "Realtime", value: "WebRTC · WebSocket · SSE" },
  { label: "Beyond Web", value: "React Native · Three.js" },
  { label: "Also", value: "Kotlin · Go · Spring Boot" },
];

/** 문서에 굳이 넣지 않는 프로젝트 슬러그 (요약본 기준) */
export const RESUME_MINOR_NOTE = "그 외 개인 프로젝트는 아래에 한 줄로 정리했습니다.";
