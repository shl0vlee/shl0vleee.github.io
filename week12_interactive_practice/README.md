# 12주차 인터랙티브반 공통 실습 파일

## 목적
VS Code의 GitHub Copilot Agent를 이용하여 **이미 만들어진 웹페이지에 기능을 추가**하고, 수정 내용을 확인한 후 GitHub Pages로 배포한다.

## 파일 구조
- `index.html`: 페이지 구조
- `css/style.css`: 페이지 디자인 및 반응형 스타일
- `js/script.js`: 이미 작동하는 진입 효과 + 에이전트 작업 지점
- `images/year-a.svg`, `images/year-b.svg`: 가상 실업률 그래프 (실제 통계 아님)

## 시작 상태
- 웹페이지와 연도 A의 수치·설명·그래프가 표시된다.
- 스크롤 시 섹션이 등장하는 효과는 작동한다.
- **연도 B 버튼의 콘텐츠 전환은 아직 구현되지 않았다.** (의도적으로 남긴 실습 과제)

## Copilot Agent 공통 실습 요청문

> 현재 프로젝트를 분석한 후 `.compare-section` 내부의 연도 선택 기능을 구현해 줘.
> - 연도 A 버튼 `.year-button-a`, 연도 B 버튼 `.year-button-b` 클릭에 반응한다.
> - 연도 A: 4.2%, 제목 '연도 A의 실업률 변화', 설명은 A에 대한 설명, 이미지 `images/year-a.svg`
> - 연도 B: 3.6%, 제목 '연도 B의 실업률 변화', 설명은 B에 대한 설명, 이미지 `images/year-b.svg`
> - `.year-rate`, `.metric-title`, `.year-description`, `.year-chart`가 함께 변경되어야 한다.
> - 버튼의 `active` 클래스 및 `aria-pressed`는 하나의 연도만 활성화한다.
> - 기존 레이아웃과 스크롤 등장 효과는 유지한다.
> - 변경하기 전에 수정할 파일과 계획을 먼저 알려줘.

## 검증
1. 처음에는 연도 A가 표시된다.
2. 연도 B를 클릭하면 수치·제목·설명·그래프가 모두 B로 전환된다.
3. A를 다시 클릭하면 A로 복원된다.
4. 페이지의 다른 섹션과 스크롤 등장 효과는 유지된다.
5. GitHub Pages에 게시한 주소에서도 동일하게 작동한다.

## GitHub Pages 배포
1. VS Code에서 폴더를 열고 브라우저로 `index.html`을 실행한다.
2. GitHub 저장소를 만들어 이 폴더의 파일을 저장소 **루트**에 업로드한다.
3. 저장소 `Settings > Pages`에서 `Deploy from a branch`, `main`, `/(root)`를 선택한다.
4. 제공되는 Pages URL로 접속해 이미지·스타일·버튼이 제대로 표시되는지 확인한다.

> `.svg` 그래프는 실습용 가상 데이터이며 실제 실업률 통계가 아니다.
