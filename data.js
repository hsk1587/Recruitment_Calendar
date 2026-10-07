// 샘플 데이터입니다. 실제 공고로 교체하세요.
// start/end/exam 은 'YYYY-MM-DD' 형식. 아래 함수는 샘플을 "오늘" 기준으로 배치하기 위한 것이므로
// 실제 데이터를 넣을 땐 날짜 문자열을 직접 쓰면 됩니다.
const _d = (off) => {
  const t = new Date(); t.setDate(t.getDate() + off);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
};

const JOBS = [
  { id: 1, org: '한국전력공사', type: '공기업', job: '사무', title: '2026 하반기 신입사원 채용', start: _d(-3), end: _d(4), exam: _d(25), region: '전국', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 2, org: '한국철도공사', type: '공기업', job: '기술', title: '철도운영 기술직 신입 채용', start: _d(0), end: _d(9), exam: _d(30), region: '전국', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 3, org: '국민건강보험공단', type: '준정부기관', job: '사무', title: '일반직 6급 신규직원 채용', start: _d(2), end: _d(12), exam: _d(33), region: '강원 원주', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 4, org: '한국도로공사', type: '공기업', job: '기술', title: '토목/전기 신입 채용', start: _d(5), end: _d(15), exam: _d(36), region: '경북 김천', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 5, org: '한국수자원공사', type: '공기업', job: '연구', title: '연구직 경력 채용', start: _d(-6), end: _d(1), exam: _d(20), region: '대전', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 6, org: '서울교통공사', type: '지방공기업', job: '기술', title: '신입사원(차량/전기) 채용', start: _d(8), end: _d(18), exam: _d(40), region: '서울', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 7, org: '국민연금공단', type: '준정부기관', job: '사무', title: '체험형 청년인턴 채용', start: _d(10), end: _d(20), exam: _d(35), region: '전북 전주', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 8, org: '한국토지주택공사', type: '공기업', job: '사무', title: '신입(5급) 공개채용', start: _d(-10), end: _d(-2), exam: _d(14), region: '경남 진주', people: '00명', url: 'https://job.alio.go.kr' },
  { id: 9, org: '한국과학기술연구원', type: '기타공공기관', job: '연구', title: '박사후연구원 채용', start: _d(12), end: _d(26), exam: _d(45), region: '서울', people: '00명', url: 'https://job.alio.go.kr' },
];
