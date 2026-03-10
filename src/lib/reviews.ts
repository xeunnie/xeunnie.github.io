export interface PeerReview {
  name: string;
  role: string;
  relation: string;
  content: string;
}

export const PEER_REVIEWS: PeerReview[] = [
  {
    name: "팀원 A",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "승은님은 팀장으로서 팀의 중심이 되어주셨고, 항상 밝고 유쾌한 에너지를 전해주었습니다. 질문이 있을 때마다 단순히 답만 주는 것이 아니라 더 좋은 방향을 제시해주며 함께 고민해주었고, 덕분에 더 나은 코드를 작성할 수 있었습니다. 백엔드 지식도 풍부하셔서 협업하는 데 큰 도움이 되었고, 전반적으로 팀의 운영과 기술적 성장에 크게 기여하신 팀장이었습니다.",
  },
  {
    name: "팀원 B",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "처음부터 끝까지 프로젝트를 완성시키는 것에 집중했을 뿐만 아니라, 포트폴리오와 이력서에 담을 수 있는 가치를 고민하는 모습이 인상적이었습니다. 모르는 것에 대해 질문하면 항상 친절하게 대답해주었고, 두 달간 함께할 수 있어 정말 즐거웠습니다. 언젠가 다시 동료로 만나고 싶습니다.",
  },
  {
    name: "팀원 C",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "승은님 덕분에 도움이 너무 많이 됐습니다. 지식이 풍부해지는 느낌이란 게 이런 거일까 싶었습니다. 좋은 아티클과 최신 기술을 공유해 주어서 코드의 퀄리티를 높일 수 있었고, 승은님이 아니었다면 대충 했을 거란 생각이 듭니다.",
  },
];
