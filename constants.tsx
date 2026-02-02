
import React from 'react';
import { Contest } from './types';

export const ERICA_BLUE = '#003c71';

export const CATEGORIES = ['창업', 'IT/SW', '디자인', '마케팅', '공학', '인문/사회'];

export const REWARD_OPTIONS = ['전체', '100만원 이상', '500만원 이상', '1000만원 이상'];

export const MOCK_CONTESTS: Contest[] = [
  {
    id: "1",
    title: "제12회 ERICA 창업 경진대회",
    dates: {
      start: "2024-05-01",
      end: "2024-05-15",
      submission_deadline: "2024-05-20"
    },
    category: "창업",
    reward: "1000만원 이상",
    is_team_recruiting: true,
    host: "한양대학교 창업지원단",
    target: "한양대 재학생 및 휴학생",
    description: "한양대학교 ERICA 캠퍼스 학생들의 혁신적인 창업 아이디어를 발굴하고 지원합니다.",
    posterUrl: "https://picsum.photos/seed/startup/400/600",
    link: "https://example.com/contest/1"
  },
  {
    id: "2",
    title: "ERICA 캡스톤 디자인 어워드",
    dates: {
      start: "2024-05-05",
      end: "2024-05-25",
      submission_deadline: "2024-05-30"
    },
    category: "공학",
    reward: "500만원 이상",
    is_team_recruiting: true,
    host: "LINC 3.0 사업단",
    target: "공과대학 3,4학년",
    description: "한 학기 동안 진행한 캡스톤 디자인 결과물을 뽐내는 자리입니다.",
    posterUrl: "https://picsum.photos/seed/capstone/400/600",
    link: "https://example.com/contest/2"
  },
  {
    id: "3",
    title: "2024 안산시 공공데이터 활용 공모전",
    dates: {
      start: "2024-05-10",
      end: "2024-06-10",
      submission_deadline: "2024-06-15"
    },
    category: "IT/SW",
    reward: "500만원 이상",
    is_team_recruiting: false,
    host: "안산시청",
    target: "전국 대학생 및 일반인",
    description: "안산시의 공공데이터를 활용한 창의적인 서비스 및 아이디어 제안 공모전입니다.",
    posterUrl: "https://picsum.photos/seed/data/400/600",
    link: "https://example.com/contest/3"
  },
  {
    id: "4",
    title: "ERICA 홍보 영상 공모전",
    dates: {
      start: "2024-05-12",
      end: "2024-05-20",
      submission_deadline: "2024-05-22"
    },
    category: "디자인",
    reward: "100만원 이상",
    is_team_recruiting: true,
    host: "ERICA 홍보팀",
    target: "ERICA 전공 불문 재학생",
    description: "우리 캠퍼스의 매력을 알릴 수 있는 감각적인 숏폼 영상을 모집합니다.",
    posterUrl: "https://picsum.photos/seed/video/400/600",
    link: "https://example.com/contest/4"
  },
  {
    id: "5",
    title: "전국 대학생 알고리즘 경진대회",
    dates: {
      start: "2024-05-18",
      end: "2024-05-18",
      submission_deadline: "2024-05-19"
    },
    category: "IT/SW",
    reward: "100만원 이상",
    is_team_recruiting: false,
    host: "소프트웨어중심대학사업단",
    target: "소프트웨어 학부생",
    description: "최고의 코딩 실력자를 가리는 알고리즘 문제 해결 대회입니다.",
    posterUrl: "https://picsum.photos/seed/coding/400/600",
    link: "https://example.com/contest/5"
  },
  {
    id: "6",
    title: "ERICA 마케팅 전략 공모전",
    dates: {
      start: "2024-04-25",
      end: "2024-05-08",
      submission_deadline: "2024-05-10"
    },
    category: "마케팅",
    reward: "100만원 이상",
    is_team_recruiting: true,
    host: "경영학부",
    target: "전국 대학생",
    description: "기업 연계 실전 마케팅 전략을 수립하는 공모전입니다.",
    posterUrl: "https://picsum.photos/seed/marketing/400/600",
    link: "https://example.com/contest/6"
  }
];
