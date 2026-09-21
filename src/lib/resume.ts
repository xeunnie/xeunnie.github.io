/**
 * 문서(PDF)용 요약 데이터.
 * 웹 페이지는 스크롤하며 훑는 매체지만 PDF는 첫 페이지에서 판단이 끝난다.
 * 그래서 나머지 섹션과 달리 이 블록만 손으로 추려 둔다.
 */

export interface ResumeStat {
  label: string;
  value: string;
}

export const RESUME_HEADLINE =
  "디자인부터 서버·배포까지 한 번씩 끝까지 해 본 프론트엔드 개발자";

export const RESUME_SUMMARY = [
  "브라우저에서 다루기 까다로운 것들을 반복해서 맡아 왔습니다. 폐쇄망 지하철의 WebRTC CCTV, LiveKit SFU 화상회의, WebSocket·SSE 실시간 동기화가 그런 일이었습니다.",
  "만든 것이 현장에서 매일 돌아갑니다. Three.js 3D 관제와 GPS 기반 골프장 운영 서비스를 개발했고, 현장에 배포한 뒤 그 자리에서 고치는 일까지 맡았습니다.",
  "화면 밖도 필요한 만큼 했습니다. React Native 앱을 네이티브 설정·릴리스 서명·스토어 제출까지 혼자 올렸고, 서버가 필요한 자리에서는 MSA 7개 서비스를 직접 설계해 구현했습니다.",
  "왜 그렇게 했는지를 남깁니다. 되돌린 결정도 근거와 함께 적어 두고, 인수인계 전에는 구조와 판단 근거를 문서로 정리했습니다.",
];

export const RESUME_STATS: ResumeStat[] = [
  { label: "주로", value: "React · TypeScript · Next.js" },
  { label: "실시간", value: "WebRTC · WebSocket · SSE" },
  { label: "웹 밖", value: "React Native · Three.js" },
  { label: "서버도", value: "Kotlin · Go · Spring Boot" },
];

/** 문서에 굳이 넣지 않는 프로젝트 슬러그 (요약본 기준) */
export const RESUME_MINOR_NOTE = "그 외 개인 프로젝트는 아래에 한 줄로 정리했습니다.";
