
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // SCENE 1 — 오프닝
  // ============================================================

  const scene1 = document.getElementById('scene1');
  const titleLayer = document.querySelector('.title-layer');
  const characterLayer = document.getElementById('openingCharacter');
  const bottomCaption = document.querySelector('.bottom-caption-wrapper');
  const captionText = document.getElementById('openingCaption');

  const ZOOM_SCALE = 1.18;
  let isOpeningTriggered = false;
  let initialTopPx = 0;

  if (characterLayer) {
    const rect = characterLayer.getBoundingClientRect();
    initialTopPx = rect.top;
    characterLayer.style.height = `${rect.height}px`;
    characterLayer.style.top = `${initialTopPx}px`;
    characterLayer.style.bottom = 'auto';
    characterLayer.style.transition =
      'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  function triggerOpening() {
    if (isOpeningTriggered) return;
    isOpeningTriggered = true;

    if (titleLayer) {
      titleLayer.style.opacity = '0';
      titleLayer.style.transform = 'translateY(-12px)';
      titleLayer.style.pointerEvents = 'none';
    }

    if (bottomCaption) {
      bottomCaption.style.opacity = '0';
      bottomCaption.style.pointerEvents = 'none';
    }

    if (characterLayer) {
      characterLayer.style.transform =
        `translateX(-50%) scale(${ZOOM_SCALE})`;
    }
  }

  if (captionText) {
    captionText.addEventListener('click', triggerOpening);
  }

  // ============================================================
  // SCENE 2~9 — 요소 연결
  // ============================================================

  const scene2 = document.getElementById('scene2');
  const reportCardImg = document.getElementById('reportCardImg');
  const reportHandImg = document.getElementById('reportHandImg');
  const crumpledStage = document.getElementById('crumpledStage');
  const tearStainImg = document.getElementById('tearStainImg');

  const scene4 = document.getElementById('scene4');
  const thoughtBubble1 = document.getElementById('thoughtBubble1');
  const thoughtBubble2 = document.getElementById('thoughtBubble2');

  const scene5 = document.getElementById('scene5');
  const dropoutFormImg = document.getElementById('dropoutFormImg');
  const dropoutHandImg = document.getElementById('dropoutHandImg');

  const scene6 = document.getElementById('scene6');
  const despairJunseongImg = document.getElementById('despairJunseongImg');

  const scene7 = document.getElementById('scene7');
  const walkingBackImg = document.getElementById('walkingBackImg');
  const scene8 = document.getElementById('scene8');

  const scene9 = document.getElementById('scene9');
  const gradeGridImg = document.getElementById('gradeGridImg');
  const gradeNineImg = document.getElementById('gradeNineImg');
  const gradeFiveImg = document.getElementById('gradeFiveImg');
  const subtitleFive9 = document.querySelector('.grade-subtitle-five');

  // ============================================================
  // SCENE 10~11 — 요소 연결
  // ============================================================

  const scene10 = document.getElementById('scene10');
  const scene10Article = scene10?.querySelector('.scene-article-text');
  const scene10Summary = document.getElementById('scene10Summary');

  const scene11 = document.getElementById('scene11');
  const scene11Question = document.getElementById('scene11Question');
  const scene11Article = scene11?.querySelector('.scene-11-2-text');

  // ============================================================
  // SCENE 12 — 설문조사 요소 연결
  // ============================================================

  const sceneSurvey = document.getElementById('sceneSurvey');
  const surveySingleStudent = document.getElementById('surveySingleStudent');

  const imgStanding = document.getElementById('imgStanding');
  const imgVeryHigh = document.getElementById('imgVeryHigh');
  const imgSomewhatHigh = document.getElementById('imgSomewhatHigh');
  const imgNeutral = document.getElementById('imgNeutral');
  const imgLowCombined = document.getElementById('imgLowCombined');
  const imgSurveyResult = document.getElementById('imgSurveyResult');

  const statVeryHigh = document.getElementById('statVeryHigh');
  const statSomewhatHigh = document.getElementById('statSomewhatHigh');
  const statNeutral = document.getElementById('statNeutral');
  const statLowCombined = document.getElementById('statLowCombined');

  // ============================================================
  // MASTER SCROLL — 전체 장면 스크롤 컨트롤러
  // ============================================================

  function handleMasterScroll() {
    const vh = window.innerHeight;

    // ==========================================================
    // SCENE 1 — 오프닝
    // ==========================================================

    if (scene1 && characterLayer) {
      const rect1 = scene1.getBoundingClientRect();
      const scrollable1 = rect1.height - vh;

      if (scrollable1 > 0) {
        const progress1 = Math.min(
          Math.max(-rect1.top / scrollable1, 0), 1
        );

        if (progress1 > 0.015 && !isOpeningTriggered) {
          triggerOpening();
        }

        if (isOpeningTriggered) {
          const targetTopPx =
            (vh / 2) - (characterLayer.offsetHeight / 2);

          const currentTop =
            initialTopPx + (targetTopPx - initialTopPx) * progress1;

          characterLayer.style.top = `${currentTop}px`;
          characterLayer.style.transform =
            `translateX(-50%) scale(${ZOOM_SCALE})`;
        }
      }
    }

    // ==========================================================
    // SCENE 2 & 3 — 성적표, 손, 구겨진 성적표, 눈물
    // ==========================================================

    if (
      scene2 &&
      reportCardImg &&
      reportHandImg &&
      crumpledStage &&
      tearStainImg
    ) {
      const rect2 = scene2.getBoundingClientRect();
      const scrollable2 = rect2.height - vh;

      if (scrollable2 > 0) {
        const rawProgress = (vh - rect2.top) / rect2.height;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        const morphStep = Math.min(
          Math.max((progress - 0.46) / 0.22, 0), 1
        );

        const cardIn = Math.min(
          Math.max(progress / 0.22, 0), 1
        );

        const cardOffsetY = 30 * (1 - cardIn);

        reportCardImg.style.opacity = cardIn * (1 - morphStep);
        reportCardImg.style.transform =
          `translate(-6%, ${cardOffsetY}px)`;

        const handIn = Math.min(
          Math.max((progress - 0.16) / 0.24, 0), 1
        );

        const handOffsetX = 40 * (1 - handIn);
        const handOffsetY = 80 * (1 - handIn);

        reportHandImg.style.opacity = handIn * (1 - morphStep);
        reportHandImg.style.transform =
          `translate(${handOffsetX}px, ${handOffsetY}px)`;

        crumpledStage.style.opacity = morphStep;
        crumpledStage.style.transform =
          `translate(-2%, ${8 * (1 - morphStep)}px)`;

        const tearStep = Math.min(
          Math.max((progress - 0.70) / 0.22, 0), 1
        );

        tearStainImg.style.opacity = tearStep;
        tearStainImg.style.transform =
          `scale(${0.96 + 0.04 * tearStep})`;
      }
    }

    // ==========================================================
    // SCENE 4 — 생각풍선
    // ==========================================================

    if (scene4 && thoughtBubble1 && thoughtBubble2) {
      const rect4 = scene4.getBoundingClientRect();
      const scrollable4 = rect4.height - vh;

      if (scrollable4 > 0) {
        const progress4 = Math.min(
          Math.max(-rect4.top / scrollable4, 0), 1
        );

        const b1Step = Math.min(
          Math.max((progress4 - 0.12) / 0.30, 0), 1
        );

        const b1Scale = 0.95 + 0.05 * b1Step;
        const b1Y = 16 * (1 - b1Step);

        thoughtBubble1.style.opacity = b1Step;
        thoughtBubble1.style.transform =
          `translate(-50%, ${b1Y}px) scale(${b1Scale})`;

        const b2Step = Math.min(
          Math.max((progress4 - 0.48) / 0.30, 0), 1
        );

        const b2Scale = 0.95 + 0.05 * b2Step;
        const b2Y = 16 * (1 - b2Step);

        thoughtBubble2.style.opacity = b2Step;
        thoughtBubble2.style.transform =
          `translate(-50%, ${b2Y}px) scale(${b2Scale})`;
      }
    }

    // ==========================================================
    // SCENE 5 — 자퇴서와 손
    // ==========================================================

    if (scene5 && dropoutFormImg && dropoutHandImg) {
      const rect5 = scene5.getBoundingClientRect();
      const scrollable5 = rect5.height - vh;

      if (scrollable5 > 0) {
        const rawProgress5 = (vh - rect5.top) / rect5.height;
        const progress5 = Math.min(
          Math.max(rawProgress5, 0), 1
        );

        const formStep = Math.min(
          Math.max(progress5 / 0.36, 0), 1
        );

        const formOffsetY = 24 * (1 - formStep);

        dropoutFormImg.style.opacity = formStep;
        dropoutFormImg.style.transform =
          `translate(-8%, ${formOffsetY}px)`;

        const handStep5 = Math.min(
          Math.max((progress5 - 0.28) / 0.40, 0), 1
        );

        const hand5X = 50 * (1 - handStep5);
        const hand5Y = 70 * (1 - handStep5);

        dropoutHandImg.style.opacity = handStep5;
        dropoutHandImg.style.transform =
          `translate(${hand5X}px, ${hand5Y}px)`;
      }
    }

    // ==========================================================
    // SCENE 6 — 좌절한 준성이
    // ==========================================================

    if (scene6 && despairJunseongImg) {
      const rect6 = scene6.getBoundingClientRect();
      const scrollable6 = rect6.height - vh;

      if (scrollable6 > 0) {
        const rawProgress6 = (vh - rect6.top) / rect6.height;
        const progress6 = Math.min(
          Math.max(rawProgress6, 0), 1
        );

        const imgStep6 = Math.min(
          Math.max(progress6 / 0.42, 0), 1
        );

        const imgY6 = 20 * (1 - imgStep6);

        despairJunseongImg.style.opacity = imgStep6;
        despairJunseongImg.style.transform =
          `translateY(${imgY6}px)`;
      }
    }

    // ==========================================================
    // SCENE 7 → 8 — 준성이 멀어짐, 배경 전환
    // ==========================================================

    if (scene7 && walkingBackImg) {
      const rect7 = scene7.getBoundingClientRect();
      const scrollable7 = rect7.height - vh;

      if (scrollable7 > 0) {
        const rawProgress7 = (vh - rect7.top) / rect7.height;
        const progress7 = Math.min(
          Math.max(rawProgress7, 0), 1
        );

        const fadeIn7 = Math.min(
          Math.max(progress7 / 0.22, 0), 1
        );

        const fadeOut7 = Math.min(
          Math.max((progress7 - 0.58) / 0.32, 0), 1
        );

        const scale7 = 1.18 - (0.28 * progress7);

        walkingBackImg.style.opacity =
          fadeIn7 * (1 - fadeOut7);

        walkingBackImg.style.transform =
          `scale(${scale7})`;

        const wipeStep = Math.min(
          Math.max((progress7 - 0.45) / 0.55, 0), 1
        );

        const sticky7 =
          scene7.querySelector('.walking-back-screen');

        if (wipeStep <= 0) {
          scene7.style.background = '#1d2c41';

          if (sticky7) {
            sticky7.style.background = 'transparent';
          }

        } else if (wipeStep >= 1) {
          scene7.style.background = '#dfd3c3';

          if (sticky7) {
            sticky7.style.background = '#dfd3c3';
          }

        } else {
          const solidEnd = -55 + (155 * wipeStep);
          const fadeEnd = solidEnd + 55;

          const grad =
            `linear-gradient(to top, #dfd3c3 ${solidEnd}%, #1d2c41 ${fadeEnd}%)`;

          scene7.style.background = grad;

          if (sticky7) {
            sticky7.style.background = grad;
          }
        }

        if (scene8) {
          scene8.style.backgroundColor = '#dfd3c3';
        }
      }
    }

    // ==========================================================
    // SCENE 9 — 등급제 비교
    // ==========================================================

    if (
      scene9 &&
      gradeGridImg &&
      gradeNineImg &&
      gradeFiveImg
    ) {
      const rect9 = scene9.getBoundingClientRect();
      const scrollable9 = rect9.height - vh;

      if (scrollable9 > 0) {
        const progress9 = Math.min(
          Math.max(-rect9.top / scrollable9, 0), 1
        );

        const clamp9 = (value) =>
          Math.min(Math.max(value, 0), 1);

        const smooth9 = (value) => {
          const t = clamp9(value);
          return t * t * (3 - 2 * t);
        };

        gradeGridImg.style.opacity = 1;
        gradeNineImg.style.opacity = 1;

        const fiveStep = smooth9(
          (progress9 - 0.20) / 0.30
        );

        gradeFiveImg.style.opacity =
          clamp9(fiveStep * 5);

        const stageWidth =
          gradeGridImg.getBoundingClientRect().width;

        const nineTargetX = -stageWidth * 0.22;
        const fiveTargetX = stageWidth * 0.22;

        gradeNineImg.style.transform =
          `translateX(calc(-50% + ${nineTargetX}px))`;

        const fiveX =
          nineTargetX +
          (fiveTargetX - nineTargetX) * fiveStep;

        gradeFiveImg.style.transform =
          `translateX(calc(-50% + ${fiveX}px))`;

        if (subtitleFive9) {
          subtitleFive9.style.opacity = fiveStep;
          subtitleFive9.style.transform =
            `translateX(calc(-50% + ${fiveX - fiveTargetX}px))`;
        }
      }
    }

    // ==========================================================
    // SCENE 10 — 본문과 강조 박스
    // ==========================================================

    if (scene10 && scene10Article && scene10Summary) {
      const articleRect =
        scene10Article.getBoundingClientRect();

      const summaryRect =
        scene10Summary.getBoundingClientRect();

      const articleVisible =
        articleRect.top < vh * 0.85 &&
        articleRect.bottom > vh * 0.12;

      scene10Article.classList.toggle(
        'fade-in', articleVisible
      );

      scene10Article.classList.toggle(
        'fade-out', articleRect.bottom <= vh * 0.12
      );

      const summaryVisible =
        summaryRect.top < vh * 0.72 &&
        summaryRect.bottom > vh * 0.12;

      scene10Summary.classList.toggle(
        'fade-in', summaryVisible
      );

      scene10Summary.classList.toggle(
        'fade-out', summaryRect.bottom <= vh * 0.12
      );
    }

    // ==========================================================
    // SCENE 11 — 질문과 본문
    // ==========================================================

    if (scene11 && scene11Question && scene11Article) {
      const sceneRect =
        scene11.getBoundingClientRect();

      const articleRect =
        scene11Article.getBoundingClientRect();

      scene11Question.classList.toggle(
        'fade-out',
        sceneRect.top < -vh * 0.15
      );

      scene11Article.classList.toggle(
        'fade-in',
        articleRect.top < vh * 0.85
      );
    }

    // ==========================================================
    // SCENE 12 — 설문조사 디졸브
    // ==========================================================

    if (sceneSurvey && imgStanding) {
      const rectSurvey =
        sceneSurvey.getBoundingClientRect();

      const scrollableSurvey =
        rectSurvey.height - vh;

      if (scrollableSurvey > 0) {
        const progress = Math.min(
          Math.max(-rectSurvey.top / scrollableSurvey, 0),
          1
        );

        // 학생 한 명 페이드아웃
        const singleFade = Math.min(
          Math.max((progress - 0.10) / 0.10, 0),
          1
        );

        if (surveySingleStudent) {
          surveySingleStudent.style.opacity =
            1 - singleFade;
        }

        // 서 있는 학생들 페이드인
        const standingFade = Math.min(
          Math.max((progress - 0.20) / 0.10, 0),
          1
        );

        const surveyProgress = Math.min(
          Math.max((progress - 0.30) / 0.70, 0),
          1
        );

        let standingOpacity = standingFade;
        let veryHighOpacity = 0;
        let somewhatHighOpacity = 0;
        let neutralOpacity = 0;
        let lowCombinedOpacity = 0;
        let resultOpacity = 0;

        // 서 있는 학생들 → 매우 높다
        if (surveyProgress < 0.22) {
          const step = surveyProgress / 0.22;

          standingOpacity =
            standingFade * (1 - step);

          veryHighOpacity = step;

        // 매우 높다 유지
        } else if (surveyProgress < 0.38) {
          standingOpacity = 0;
          veryHighOpacity = 1;

        // 매우 높다 → 다소 높다
        } else if (surveyProgress < 0.55) {
          const step =
            (surveyProgress - 0.38) / 0.17;

          veryHighOpacity = 1 - step;
          somewhatHighOpacity = step;
          standingOpacity = 0;

        // 다소 높다 유지
        } else if (surveyProgress < 0.72) {
          somewhatHighOpacity = 1;
          standingOpacity = 0;

        // 다소 높다 → 보통이다
        } else if (surveyProgress < 0.88) {
          const step =
            (surveyProgress - 0.72) / 0.16;

          somewhatHighOpacity = 1 - step;
          neutralOpacity = step;
          standingOpacity = 0;

        // 보통이다 유지
        } else if (surveyProgress < 0.93) {
          neutralOpacity = 1;
          standingOpacity = 0;

        // 보통이다 → 다소 낮다 / 매우 낮다
        } else if (surveyProgress < 0.97) {
          const step =
            (surveyProgress - 0.93) / 0.04;

          neutralOpacity = 1 - step;
          lowCombinedOpacity = step;
          standingOpacity = 0;

        // 다소 낮다 / 매우 낮다 → 전체 결과
        } else {
          const resultFade = Math.min(
            Math.max(
              (surveyProgress - 0.97) / 0.025,
              0
            ),
            1
          );

          lowCombinedOpacity = 1 - resultFade;
          resultOpacity = resultFade;
          standingOpacity = 0;
        }

        // 이미지 투명도
        if (imgStanding) {
          imgStanding.style.opacity = standingOpacity;
        }

        if (imgVeryHigh) {
          imgVeryHigh.style.opacity = veryHighOpacity;
        }

        if (imgSomewhatHigh) {
          imgSomewhatHigh.style.opacity = somewhatHighOpacity;
        }

        if (imgNeutral) {
          imgNeutral.style.opacity = neutralOpacity;
        }

        if (imgLowCombined) {
          imgLowCombined.style.opacity = lowCombinedOpacity;
        }

        if (imgSurveyResult) {
          imgSurveyResult.style.opacity = resultOpacity;
        }

        // 응답 텍스트 투명도
        if (statVeryHigh) {
          statVeryHigh.style.opacity = veryHighOpacity;
        }

        if (statSomewhatHigh) {
          statSomewhatHigh.style.opacity = somewhatHighOpacity;
        }

        if (statNeutral) {
          statNeutral.style.opacity = neutralOpacity;
        }

        if (statLowCombined) {
          statLowCombined.style.opacity = lowCombinedOpacity;
        }
      }
    }
  }



  // ============================================================
  // 스크롤 이벤트 연결
  // ============================================================

  window.addEventListener(
    'scroll',
    handleMasterScroll,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    handleMasterScroll
  );

  handleMasterScroll();

});

/* ============================================================
   [INDEX: SCENE 13] 질문 박스 스크롤 페이드인
   ============================================================ */

(function () {
  function initScene13Fade() {
    const questionBox = document.querySelector('.scene-13-question-box');

    if (!questionBox) {
      console.warn('SCENE 13 질문 박스를 찾지 못했습니다.');
      return;
    }

    // 처음에는 보이지 않도록 설정
    questionBox.classList.remove('scene-13-visible');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            questionBox.classList.add('scene-13-visible');
            observer.unobserve(questionBox);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    observer.observe(questionBox);
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initScene13Fade
    );
  } else {
    initScene13Fade();
  }
})();



// ============================================================
// [INDEX: SCENE 14] 두 그래프 스크롤 모핑
// ============================================================

(function () {

  function initScene14Graph() {

    const track = document.getElementById('scene14ChartTrack');
    const reveal = document.getElementById('scene14RevealRect');

    const graphOne = document.getElementById('scene14GraphOne');
    const graphTwo = document.getElementById('scene14GraphTwo');

    const highlight = document.getElementById('scene14Highlight');

    const orangeLine = document.getElementById('scene14OrangeLine');
    const orangeArea = document.getElementById('scene14OrangeArea');

    const orangeDots = document.querySelectorAll(
      '#scene14OrangeDots circle'
    );

    const valuesOne = document.getElementById(
      'scene14OrangeValuesOne'
    );

    const valuesTwo = document.getElementById(
      'scene14OrangeValuesTwo'
    );

    const bars = document.querySelectorAll(
      '#scene14Bars rect'
    );

    if (
      !track ||
      !reveal ||
      !graphOne ||
      !graphTwo ||
      !orangeLine ||
      !orangeArea ||
      !highlight ||
      !valuesOne ||
      !valuesTwo
    ) {
      console.warn('SCENE 14 그래프 요소를 확인해 주세요.');
      return;
    }

    // ========================================================
    // 데이터 좌표
    // ========================================================

    const x = [300, 575, 850, 1130, 1410];

    // 첫 번째 그래프의 주황색 점 위치
    const firstY = [630, 573, 520, 513, 493];

    // 두 번째 그래프의 주황색 점 위치
    const secondY = [365, 313, 285, 258, 216];

    // 두 번째 그래프 막대 최종 높이
    const barHeights = [292, 311, 346, 324, 312];

    const bottomY = 840;

    let ticking = false;

    // ========================================================
    // 계산 함수
    // ========================================================

    function clamp(value) {
      return Math.max(0, Math.min(1, value));
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function smoothstep(value) {
      const t = clamp(value);
      return t * t * (3 - 2 * t);
    }

    // ========================================================
    // 스크롤 업데이트
    // ========================================================

    function updateGraph() {

      const rect = track.getBoundingClientRect();

      const distance = Math.max(
        1,
        track.offsetHeight - window.innerHeight
      );

      const progress = clamp(-rect.top / distance);

      // ------------------------------------------------------
      // 1. 첫 번째 그래프 그리기: 0~40%
      // ------------------------------------------------------

      const drawProgress = clamp(progress / 0.40);

      const revealWidth = 1393 * drawProgress;

      reveal.setAttribute(
        'width',
        revealWidth.toFixed(2)
      );

      // ------------------------------------------------------
      // 2. 2025년 하이라이트: 40% 이후 계속 유지
      // ------------------------------------------------------

      highlight.classList.toggle(
        'is-visible',
        progress >= 0.40
      );

      // ------------------------------------------------------
      // 3. 그래프 전환: 55~80%
      // ------------------------------------------------------

      const morph = smoothstep(
        (progress - 0.55) / 0.25
      );

      // 첫 번째 제목, 범례, 축, 빨간 선 사라짐
      graphOne.style.opacity = String(1 - morph);

      // 두 번째 제목, 범례, 축 등장
      graphTwo.style.opacity = String(morph);

      // ------------------------------------------------------
      // 4. 주황색 선의 실제 좌표 이동
      // ------------------------------------------------------

      const currentY = firstY.map((start, index) => {
        return lerp(start, secondY[index], morph);
      });

      // 왼쪽 시작점도 함께 위로 이동
      const leftY = lerp(
        673,
        secondY[0] + 43,
        morph
      );

      const linePoints = [
        `145,${leftY.toFixed(2)}`,
        ...x.map((px, index) => {
          return `${px},${currentY[index].toFixed(2)}`;
        })
      ].join(' ');

      orangeLine.setAttribute(
        'points',
        linePoints
      );

      // 주황색 점 5개도 선과 함께 이동
      orangeDots.forEach((dot, index) => {
        dot.setAttribute(
          'cy',
          currentY[index].toFixed(2)
        );
      });

      // ------------------------------------------------------
      // 5. 주황색 면적은 전환하면서 사라짐
      // ------------------------------------------------------

      orangeArea.style.opacity = String(
        0.25 * (1 - morph)
      );

      // ------------------------------------------------------
      // 6. 첫 번째 수치 → 두 번째 수치
      // ------------------------------------------------------

      const textChange = smoothstep(
        (progress - 0.61) / 0.14
      );

      valuesOne.style.opacity = String(1 - textChange);
      valuesTwo.style.opacity = String(textChange);

      // 첫 번째 수치가 선을 따라 조금 위로 이동
      valuesOne.setAttribute(
        'transform',
        `translate(0, ${-35 * textChange})`
      );

      // 두 번째 수치는 아래에서 올라오며 등장
      valuesTwo.setAttribute(
        'transform',
        `translate(0, ${45 * (1 - textChange)})`
      );

      // ------------------------------------------------------
      // 7. 막대: 아래에서 위로 성장
      // ------------------------------------------------------

      bars.forEach((bar, index) => {

        const start = 0.60 + index * 0.025;

        const barProgress = smoothstep(
          (progress - start) / 0.17
        );

        const height = barHeights[index] * barProgress;
        const y = bottomY - height;

        bar.setAttribute(
          'height',
          height.toFixed(2)
        );

        bar.setAttribute(
          'y',
          y.toFixed(2)
        );

      });

      ticking = false;
    }

    // ========================================================
    // 스크롤 이벤트
    // ========================================================

    function requestUpdate() {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(updateGraph);
    }

    window.addEventListener(
      'scroll',
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      requestUpdate
    );

    // 페이지를 중간 위치에서 새로고침해도 정상 표시
    updateGraph();

  }

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initScene14Graph
    );

  } else {

    initScene14Graph();

  }

})();

// ============================================================
// [END: SCENE 14]
// ============================================================



/* ============================================================
   [INDEX: SCENE 15] SCENE 10과 동일한 페이드 방식
   ============================================================ */

(function () {
  function initScene15() {
    const scene = document.getElementById("scene15");
    if (!scene) return;

    const track = scene.querySelector(".scene-15-scroll-track");
    const box1 = scene.querySelector(".scene-15-box-1");
    const box2 = scene.querySelector(".scene-15-box-2");

    if (!track || !box1 || !box2) return;

    let ticking = false;

    function updateScene15() {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;

      const scrollDistance = Math.max(
        1,
        track.offsetHeight - vh
      );

      const progress = Math.max(
        0,
        Math.min(1, -rect.top / scrollDistance)
      );

      // SCENE 10과 동일하게 클래스로 애니메이션 제어
      const firstBoxVisible = progress < 0.35;
      const secondBoxVisible = progress >= 0.60;

      box1.classList.toggle("fade-out", !firstBoxVisible);
      box2.classList.toggle("fade-in", secondBoxVisible);

      // 이전 스크롤 연동 코드의 인라인 스타일 제거
      box1.style.removeProperty("opacity");
      box2.style.removeProperty("opacity");
      box1.style.removeProperty("transform");
      box2.style.removeProperty("transform");

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(updateScene15);
    }

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestUpdate);

    updateScene15();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScene15);
  } else {
    initScene15();
  }
})();

/* [END: SCENE 15] */


/* ============================================================
   [INDEX: SCENE 16] 전문가 순차 페이드인
   ============================================================ */

(function () {
  function initScene16() {

    const experts = document.querySelectorAll(
      "#scene16 .scene-16-expert"
    );

    if (!experts.length) return;

    let ticking = false;

    function updateScene16() {

      const vh = window.innerHeight;

      experts.forEach((expert) => {

        const rect = expert.getBoundingClientRect();

        // 화면에 들어오면 페이드인
        const isVisible =
          rect.top < vh * 0.80 &&
          rect.bottom > vh * 0.12;

        // 화면 위로 지나가면 페이드아웃
        const isPast =
          rect.bottom <= vh * 0.12;

        expert.classList.toggle(
          "fade-in",
          isVisible
        );

        expert.classList.toggle(
          "fade-out",
          isPast
        );

      });

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(updateScene16);
    }

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    updateScene16();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initScene16
    );
  } else {
    initScene16();
  }

})();

/* [END: SCENE 16] */


/* ============================================================
   [INDEX: SCENE 17] 텍스트 박스 페이드인
   ============================================================ */

(function () {
  function initScene17() {

    const box = document.querySelector(
      "#scene17 .scene-17-question-box"
    );

    if (!box) return;

    let ticking = false;

    function updateScene17() {

      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;

      const isVisible =
        rect.top < vh * 0.85 &&
        rect.bottom > vh * 0.12;

      const isPast =
        rect.bottom <= vh * 0.12;

      box.classList.toggle("fade-in", isVisible);
      box.classList.toggle("fade-out", isPast);

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(updateScene17);
    }

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    updateScene17();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initScene17
    );
  } else {
    initScene17();
  }

})();

/* [END: SCENE 17] */




/* ============================================================
   [INDEX: SCENE 18]
   스크롤 고정 + 그래프 애니메이션
   ============================================================ */

(function () {

  function initScene18() {

    const track = document.getElementById("scene18PinTrack");
    const reveal = document.getElementById("scene18RevealRect");
    const highlight = document.getElementById("scene18Highlight");

    if (!track || !reveal || !highlight) return;

    const clamp = (value) => {
      return Math.max(0, Math.min(1, value));
    };

    let ticking = false;

    function updateScene18() {

      const rect = track.getBoundingClientRect();

      /*
        본문이 화면 상단에 도달하면
        sticky 고정이 시작됨

        이후 스크롤하는 동안 그래프가 채워짐
      */

      const pinDistance =
        track.offsetHeight - window.innerHeight;

      const progress = clamp(
        -rect.top / Math.max(1, pinDistance)
      );

      /*
        스크롤 진행률 0~90% 동안 그래프 선 완성
      */

      const drawProgress = clamp(progress / 0.9);

      const startX = 130;
      const endX = 1100;

      const revealWidth =
        (endX - startX) * drawProgress;

      reveal.setAttribute(
        "width",
        revealWidth.toFixed(2)
      );

      /*
        90% 이후 마지막 강조 박스 등장
      */

      highlight.classList.toggle(
        "is-visible",
        progress >= 0.9
      );

      ticking = false;
    }

    function requestUpdate() {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(updateScene18);
    }

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    updateScene18();
  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initScene18
    );

  } else {

    initScene18();

  }

})();

/* ============================================================
   [END: SCENE 18]
   ============================================================ */



/* ============================================================
   [INDEX: SCENE 18-19]
   질문 박스 페이드인
   ============================================================ */

(function () {

  function initScene1819() {

    const questionBox = document.querySelector(
      "#scene18-19 .scene-18-19-question-box"
    );

    if (!questionBox) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            questionBox.classList.add("fade-in");
          } else {
            questionBox.classList.remove("fade-in");
          }

        });

      },
      {
        threshold: 0.3
      }
    );

    observer.observe(questionBox);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initScene1819
    );
  } else {
    initScene1819();
  }

})();

/* ============================================================
   [END: SCENE 18-19]
   ============================================================ */


/* ============================================================
   [INDEX: SCENE 19]
   애니메이션 없음 / 그래프 전체 표시
   ============================================================ */

(function () {

  function showScene19Graph() {

    const reveal = document.getElementById(
      "scene19RevealRect"
    );

    if (!reveal) return;

    /* 그래프 선 전체를 처음부터 표시 */
    reveal.setAttribute("width", "510");

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      showScene19Graph
    );
  } else {
    showScene19Graph();
  }

})();

/* ============================================================
   [INDEX: SCENE 20]
   중앙 질문 박스 페이드인
   ============================================================ */

(function () {

  function initScene20() {

    const question = document.querySelector(
      "#scene20 .scene-20-question"
    );

    if (!question) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            question.classList.add("fade-in");
          } else {
            question.classList.remove("fade-in");
          }

        });

      },
      {
        threshold: 0.3
      }
    );

    observer.observe(question);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initScene20
    );
  } else {
    initScene20();
  }

})();

/* ============================================================
   [END: SCENE 20]
   ============================================================ */




/* ============================================================
   [INDEX: SCENE 21-1]
   인물 선택 + 인터뷰 + SCENE 22 스크롤 연결
   ============================================================ */

(function () {

  const interviews = {

    student: {
      image: "images/student.png",
      alt: "고등학교 1학년 K 양",
      title: "고등학교 1학년 K 양 — 한 과목의 2등급도 크게 느껴졌어요.",
      body: `저는 서울 대치동 일대의 일반고에 다니는 고등학교 1학년 학생이에요. 내신 성적이 생각만큼 나오지 않을까 봐 불안했고, 한 과목에서 2등급을 받으면서 원하는 대학에 갈 수 있을지 걱정되기 시작했어요. 주변에서는 자퇴한 뒤 검정고시를 보고 수능에 집중하는 방법도 있다고 이야기했어요. 내신과 수행평가 대신 수능 공부에 더 많은 시간을 쓸 수 있다는 점에서 고민이 됐어요. 하지만 자퇴하면 공부뿐 아니라 학창 시절도 포기해야 한다는 생각이 들었어요. 친구들과 수업을 듣고 점심시간에 이야기하며 쌓을 추억도 더는 만들 수 없을 테니까요. 대학에 가기 위해 학교를 떠나는 선택까지 고민해야 한다는 게 아쉬웠어요.`
    },

    parent: {
      image: "images/parent.png",
      alt: "고등학생 자녀를 둔 학부모 A 씨",
      title: "고등학생 자녀를 둔 학부모 A 씨 — 아이가 내신 리셋을 하고 싶어 합니다.",
      body: `저는 고등학생 자녀를 둔 학부모예요. 아이가 성적에 대한 부담 때문에 학교를 그만두고 내신을 다시 준비하는 방법을 고민하고 있어요. 학년을 다시 시작하면 원하는 성적을 받을 수 있을 거라고 기대하는 것 같았어요. 아이의 간절한 마음을 알기에 그 선택을 쉽게 반대할 수 없었어요. 하지만 학교를 다시 다닌다고 성적이 반드시 오르는 것은 아니고, 그만큼 시간도 더 필요할 수 있잖아요. 검정고시와 수능을 준비하는 방법까지 알아봤지만 어떤 선택이 아이에게 더 도움이 될지 판단하기 어려웠어요. 아이에게 더 나은 길을 찾아주고 싶지만, 입시 결과만 생각하며 결정하고 싶지는 않아요. 성적을 다시 쌓는 것도 중요하지만 아이가 감당해야 할 부담과 앞으로의 학교생활까지 함께 생각해야 한다는 마음이 들어요.`
    },

    teacher: {
      image: "images/teacher.png",
      alt: "고교 부장교사 K 씨",
      title: "경기 이천시의 한 고교 부장교사 K 씨 — 학생들을 설득하고 싶었지만 쉽지 않았습니다.",
      body: `저는 고등학교에서 학생들의 진학 상담을 맡고 있는 교사입니다. 최근 학생들이 수시로는 원하는 대학에 가기 어려울 것 같다며 자퇴 상담을 요청하는 일이 늘었습니다. 내신 성적이 기대만큼 나오지 않으면 앞으로의 입시도 불리해질 것이라는 불안감에 학교를 그만두는 방법까지 고민하는 것입니다. 실제로 지난해에는 상담을 거쳐 학생 네 명이 자퇴하기도 했습니다. 저는 학생들에게 자퇴하면 수시 전형 지원이 어려워지고, 정시에서도 불리할 수 있다고 설명했습니다. 하지만 학생들에게는 당장 눈앞의 성적과 입시 결과가 무엇보다 크게 느껴지는 것 같았습니다. 원하는 대학에 갈 수 없을지도 모른다는 불안과 성적에 대한 압박이 크다 보니, 자퇴 이후의 불이익을 설명해도 쉽게 마음을 돌리지 못했습니다. 학생들이 미래에 대한 불안 때문에 학교를 떠나는 선택까지 하게 되는 현실이 안타까웠습니다.`
    }

  };

  function initScene21() {

    const section = document.getElementById("scene21");
    const choices = document.getElementById("scene21Choices");
    const detail = document.getElementById("scene21Detail");
    const detailImage = document.getElementById("scene21DetailImage");
    const title = document.getElementById("scene21InterviewTitle");
    const body = document.getElementById("scene21InterviewBody");
    const back = document.getElementById("scene21Back");
    const nextScene = document.getElementById("scene22");

    if (!section || !choices || !detail ||
        !detailImage || !title || !body || !back) return;

    const buttons = choices.querySelectorAll(".scene-21-person");

    let busy = false;
    let interviewOpen = false;
    let typingTimer = null;
    let typingToken = 0;
    let transitionTimer = null;
    let activeFlying = null;

    let originalHtmlOverflow = "";
    let originalBodyOverflow = "";

    let touchStartY = null;
    let wheelAmount = 0;
    let wheelResetTimer = null;

    /* ============================
       스크롤 잠금
       ============================ */

    function lockScroll() {

      originalHtmlOverflow =
        document.documentElement.style.overflow;

      originalBodyOverflow =
        document.body.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll() {

      document.documentElement.style.overflow =
        originalHtmlOverflow;

      document.body.style.overflow =
        originalBodyOverflow;
    }

    /* ============================
       타이핑 중지
       ============================ */

    function stopTyping() {

      typingToken++;

      if (typingTimer !== null) {
        clearTimeout(typingTimer);
        typingTimer = null;
      }

      body.classList.remove("is-typing");
    }

    /* ============================
       타이핑 시작
       ============================ */

    function startTyping(text) {

      stopTyping();

      body.textContent = "";
      body.classList.add("is-typing");

      const token = typingToken;
      const characters = Array.from(text);

      let index = 0;

      // 이전에 사용했던 빠른 타이핑 속도
      const typingSpeed = 22;

      function typeNext() {

        if (token !== typingToken) return;

        body.textContent += characters
          .slice(index, index + 2)
          .join("");

        index += 2;

        if (index < characters.length) {

          typingTimer = setTimeout(
            typeNext,
            typingSpeed
          );

        } else {

          body.classList.remove("is-typing");
          typingTimer = null;

        }
      }

      typeNext();
    }

    /* ============================
       인터뷰 화면 초기화
       ============================ */

    function resetInterview() {

      stopTyping();

      if (transitionTimer !== null) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
      }

      if (activeFlying) {
        activeFlying.remove();
        activeFlying = null;
      }

      detail.classList.remove(
        "is-visible",
        "is-ready",
        "is-content-visible"
      );

      detail.setAttribute("aria-hidden", "true");
      detail.setAttribute("inert", "");

      choices.classList.remove(
        "is-selecting",
        "is-detail-open"
      );

      buttons.forEach(button => {

        button.classList.remove("is-selected");

        const img = button.querySelector("img");

        if (img) {
          img.style.visibility = "";
        }

      });

      body.textContent = "";

      interviewOpen = false;
      wheelAmount = 0;

      unlockScroll();
    }

    /* ============================
       인터뷰 열기
       ============================ */

    function openInterview(button) {

      if (busy || interviewOpen) return;

      const key = button.dataset.person;
      const data = interviews[key];

      if (!data) return;

      const sourceImage = button.querySelector("img");
      if (!sourceImage) return;

      busy = true;
      interviewOpen = true;

      stopTyping();

      const sourceRect =
        sourceImage.getBoundingClientRect();

      title.textContent = data.title;
      body.textContent = "";

      detailImage.src = data.image;
      detailImage.alt = data.alt;

      detail.classList.remove(
        "is-ready",
        "is-content-visible"
      );

      detail.classList.add("is-visible");
      detail.setAttribute("aria-hidden", "false");
      detail.removeAttribute("inert");

      buttons.forEach(item => {
        item.classList.toggle(
          "is-selected",
          item === button
        );
      });

      choices.classList.add("is-selecting");

      lockScroll();

      const flying = sourceImage.cloneNode(true);

      activeFlying = flying;
      flying.className = "scene-21-flying-image";

      Object.assign(flying.style, {
        left: sourceRect.left + "px",
        top: sourceRect.top + "px",
        width: sourceRect.width + "px",
        height: sourceRect.height + "px",
        margin: "0"
      });

      document.body.appendChild(flying);

      sourceImage.style.visibility = "hidden";

      requestAnimationFrame(() => {

        const targetRect =
          detailImage.getBoundingClientRect();

        const dx = targetRect.left - sourceRect.left;
        const dy = targetRect.top - sourceRect.top;

        const sx = targetRect.width / sourceRect.width;
        const sy = targetRect.height / sourceRect.height;

        const motion = flying.animate(
          [
            {
              transform:
                "translate(0px, 0px) scale(1, 1)"
            },
            {
              transform:
                `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
            }
          ],
          {
            duration: 950,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards"
          }
        );

        function finishMovement() {

          if (!interviewOpen) return;

          flying.remove();
          activeFlying = null;

          choices.classList.add("is-detail-open");
          detail.classList.add("is-ready");

          requestAnimationFrame(() => {
            detail.classList.add("is-content-visible");
          });

          transitionTimer = setTimeout(() => {

            if (interviewOpen) {
              startTyping(data.body);
            }

            transitionTimer = null;

          }, 700);

          busy = false;
        }

        motion.finished.then(
          finishMovement,
          finishMovement
        );

      });
    }

    /* ============================
       다른 이야기 보기
       ============================ */

    function closeInterview() {

      if (busy || !interviewOpen) return;

      busy = true;

      stopTyping();

      if (transitionTimer !== null) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
      }

      detail.classList.remove("is-content-visible");

      setTimeout(() => {

        resetInterview();
        busy = false;

      }, 450);
    }

    /* ============================
       인터뷰 → SCENE 22 이동
       ============================ */

    function goToScene22() {

      if (!interviewOpen || busy || !nextScene) return;

      busy = true;

      resetInterview();

      // 스크롤 잠금을 해제한 뒤 다음 장면으로 이동
      requestAnimationFrame(() => {

        nextScene.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        setTimeout(() => {
          busy = false;
        }, 900);

      });
    }

    /* ============================
       마우스 휠 / 트랙패드
       ============================ */

    function handleWheel(event) {

      if (!interviewOpen) return;

      event.preventDefault();

      if (busy) return;

      // 위로 스크롤: 이전 장면 이동 차단
      if (event.deltaY <= 0) {
        wheelAmount = 0;
        return;
      }

      // 작은 트랙패드 움직임은 누적
      wheelAmount += event.deltaY;

      clearTimeout(wheelResetTimer);

      wheelResetTimer = setTimeout(() => {
        wheelAmount = 0;
      }, 450);

      // 충분히 아래로 스크롤하면 다음 장면
      if (wheelAmount >= 45) {
        wheelAmount = 0;
        goToScene22();
      }
    }

    document.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    /* ============================
       터치 스크롤
       ============================ */

    document.addEventListener(
      "touchstart",
      function (event) {

        if (!interviewOpen) return;

        touchStartY = event.touches[0].clientY;

      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      function (event) {

        if (!interviewOpen) return;

        event.preventDefault();

        if (busy || touchStartY === null) return;

        const currentY = event.touches[0].clientY;
        const distance = touchStartY - currentY;

        if (distance > 45) {
          touchStartY = null;
          goToScene22();
        }

      },
      { passive: false }
    );

    document.addEventListener(
      "touchend",
      function () {
        touchStartY = null;
      }
    );

    /* ============================
       키보드 스크롤
       ============================ */

    document.addEventListener(
      "keydown",
      function (event) {

        if (!interviewOpen) return;

        const downKeys = [
          "ArrowDown",
          "PageDown",
          " "
        ];

        const upKeys = [
          "ArrowUp",
          "PageUp",
          "Home",
          "End"
        ];

        if (downKeys.includes(event.key) &&
            !event.shiftKey) {

          event.preventDefault();
          goToScene22();

        } else if (
          upKeys.includes(event.key) ||
          (event.key === " " && event.shiftKey)
        ) {

          event.preventDefault();

        }

      }
    );

    /* ============================
       버튼 연결
       ============================ */

    buttons.forEach(button => {

      button.addEventListener("click", () => {
        openInterview(button);
      });

    });

    back.addEventListener(
      "click",
      closeInterview
    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initScene21
    );

  } else {

    initScene21();

  }

})();

/* ============================================================
   [END: SCENE 21-1]
   ============================================================ */



/* ============================================================
   [INDEX: SCENE 22]
   친구들 페이드아웃 → 준성이 표정 변화
   → 첫 문장 페이드인 → 2초 유지 → 두 번째 문장
   ============================================================ */

(function () {

  function initScene22() {

    const scene = document.getElementById("scene22");

    if (!scene) return;

    const friends = scene.querySelector(
      ".scene-22-friends"
    );

    const happy = scene.querySelector(
      ".scene-22-jun-happy"
    );

    const sad = scene.querySelector(
      ".scene-22-jun-sad"
    );

    const message = document.getElementById(
      "scene22Message"
    );

    if (!friends || !happy || !sad || !message) return;

    let messageStarted = false;
    let messageTimer = null;
    let messagePhase = 0;
    let ticking = false;

    /* ============================
       숫자 범위 제한
       ============================ */

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    /* ============================
       마지막 메시지 초기화
       ============================ */

    function resetMessage() {

      if (messageTimer !== null) {
        clearTimeout(messageTimer);
        messageTimer = null;
      }

      messageStarted = false;
      messagePhase = 0;

      message.classList.remove(
        "is-visible",
        "is-first",
        "is-second"
      );
    }

    /* ============================
       마지막 메시지 시작
       ============================ */

    function startMessage() {

      if (messageStarted) return;

      messageStarted = true;
      messagePhase = 1;

      // 첫 번째 문장과 박스 페이드인
      message.classList.add(
        "is-visible",
        "is-first"
      );

      /*
       * 첫 문장 페이드인 0.9초
       * + 문장 유지 2초
       * = 총 2.9초 후 전환 시작
       */
      messageTimer = setTimeout(() => {

        if (!messageStarted) return;

        messagePhase = 2;

        // 첫 번째 문장 페이드아웃
        message.classList.remove("is-first");

        // 0.8초 뒤 두 번째 문장 페이드인
        messageTimer = setTimeout(() => {

          if (!messageStarted) return;

          messagePhase = 3;

          message.classList.add("is-second");
          messageTimer = null;

        }, 800);

      }, 2900);
    }

    /* ============================
       스크롤 진행률에 따른 변화
       ============================ */

    function updateScene22() {

      const rect = scene.getBoundingClientRect();

      const scrollDistance =
        scene.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const progress = clamp(
        -rect.top / scrollDistance,
        0,
        1
      );

      /*
       * 0.00 ~ 0.15
       * 친구들과 웃는 준성이 유지
       *
       * 0.15 ~ 0.55
       * 주변 친구들 페이드아웃
       *
       * 0.35 ~ 0.70
       * 웃는 준성이 → 우울한 준성이
       *
       * 0.78 이후
       * 마지막 메시지 자동 시작
       */

      const friendsFade = clamp(
        (progress - 0.15) / 0.40,
        0,
        1
      );

      const emotionChange = clamp(
        (progress - 0.35) / 0.35,
        0,
        1
      );

      friends.style.opacity = 1 - friendsFade;

      happy.style.opacity = 1 - emotionChange;

      sad.style.opacity = emotionChange;

      /* ============================
         마지막 메시지 표시
         ============================ */

      if (progress >= 0.78) {

        startMessage();

      } else {

        // 위로 스크롤하면 메시지 초기화
        if (messageStarted) {
          resetMessage();
        }

      }

    }

    /* ============================
       스크롤 성능 최적화
       ============================ */

    function requestUpdate() {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {

        updateScene22();
        ticking = false;

      });
    }

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    updateScene22();

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initScene22
    );

  } else {

    initScene22();

  }

})();

/* ============================================================
   [END: SCENE 22]
   ============================================================ */




/* ============================================================
   [INDEX: STORY TEXT BOXES]
   SCENE 1~7 스토리텔링 단계별 텍스트 연출
   ============================================================ */

(function initStoryTextBoxes() {

  const storyScenes = [

    /* ==========================================================
       SCENE 1 — 오프닝
       ========================================================== */

    {
      id: "scene1",
      screen: ".opening-container",
      start: 0.20,
      end: 0.96,

      texts: [
        "2025년 봄, 준성이는 고등학교에 입학했다.",

        "새로운 교복, 낯선 교실, 처음 받아 든 시험지. 모든 것이 새롭게 시작되는 순간이었다.",

        "마침 그해부터 내신 평가 체계가 9등급제에서 5등급제로 바뀌었고,<br>1등급 비율은 4%에서 10%로 늘어났다.<br>준성이는 원하는 대학에 진학하기 위해 앞으로의 학교생활과 성적 관리에 마음을 다잡았다."
      ]
    },

    /* ==========================================================
       SCENE 2 — 성적표 → 구겨진 성적표
       ========================================================== */

    {
      id: "scene2",
      screen: ".report-screen",
      start: 0.20,
      end: 0.95,

      texts: [
        "1학년 내내 완벽한 성적을 유지하던 준성이.",

        "1학년 2학기 기말고사, 단 한 과목에서 마킹 실수로 2등급을 받았다.<br>1등급이 10%나 되는 5등급제 체제에서 2등급은 단순한 아쉬움이 아닌,<br>의대 수시 지원의 사형선고였다."
      ]
    },

    /* ==========================================================
       SCENE 4 — 고민하는 준성이
       ========================================================== */

    {
      id: "scene4",
      screen: ".thought-screen",
      start: 0.20,
      end: 0.96,

      texts: [
        "시험에서 한번이라도 더 실수하면 원하는 대학에 가지 못할 수도 있다는<br>생각에 점점 불안해졌다.",

        "많은 노력을 쏟아부어도 부족하다는 생각은 좀처럼 사라지지 않았고,<br>원하는 대학에 갈 수 있을지에 대한 불안은 점점 커져갔다.",

        "준성이는 단 한 번의 실수로 인한 앞으로의 입시 경로를 고민했다.<br>학교에 남아 교과 성적과 학교생활기록부를 관리할 것인지,",

        "아니면 학교를 그만두고 수능 준비에 집중할 것인지."
      ]
    },

    /* ==========================================================
       SCENE 5 — 자퇴서
       ========================================================== */

    {
      id: "scene5",
      screen: ".dropout-screen",
      start: 0.35,
      end: 0.90,

      texts: [
        "결국 준성이는 학교에 남아 내신을 관리하는 대신,<br>자퇴한 뒤 수능에 집중하는 길을 택했다."
      ]
    },

    /* ==========================================================
       SCENE 6 — 좌절한 준성이
       ========================================================== */

    {
      id: "scene6",
      screen: ".despair-screen",
      start: 0.30,
      end: 0.90,

      texts: [
        "단 한 번의 실수로 한 번뿐인 학창 시절을 포기하게 된 준성이."
      ]
    },

    /* ==========================================================
       SCENE 7 — 마지막 질문
       ========================================================== */

    {
      id: "scene7",
      screen: ".walking-back-screen",
      start: 0.28,
      end: 0.95,

      texts: [
        "과연 이것이 우리가 마주해야만 했던 현실일까?"
      ]
    }

  ];

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

  const instances = [];

  /* ==========================================================
     박스 생성
     ========================================================== */

  storyScenes.forEach(config => {

    const scene = document.getElementById(config.id);
    if (!scene) return;

    const screen = scene.querySelector(config.screen);
    if (!screen) return;

    let box = screen.querySelector(".story-text-box");

    if (!box) {
      box = document.createElement("div");
      box.className = "story-text-box";
      screen.appendChild(box);
    }

    box.innerHTML = "";

    const inner = document.createElement("div");
    inner.className = "story-text-inner";

    const lines = config.texts.map(text => {
      const p = document.createElement("p");
      p.className = "story-text-line";
      p.innerHTML = text;
      inner.appendChild(p);
      return p;
    });

    box.appendChild(inner);

    instances.push({
      config,
      scene,
      box,
      lines
    });

  });

  /* ==========================================================
     부드러운 전환
     ========================================================== */

  function smoothstep(t) {
    t = clamp(t, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function fadeInOut(t) {

    // 0~15% 등장
    if (t < 0.15) {
      return smoothstep(t / 0.15);
    }

    // 15~75% 유지
    if (t < 0.75) {
      return 1;
    }

    // 75~100% 퇴장
    return 1 - smoothstep(
      (t - 0.75) / 0.25
    );
  }

  /* ==========================================================
     스크롤 연출
     ========================================================== */

  function updateStoryBoxes() {

    const vh = window.innerHeight;

    instances.forEach(item => {

      const { config, scene, box, lines } = item;

      const rect = scene.getBoundingClientRect();

      const scrollRange = Math.max(
        1,
        rect.height - vh
      );

      const progress = clamp(
        -rect.top / scrollRange,
        0,
        1
      );

      const localProgress =
        (progress - config.start) /
        (config.end - config.start);

      // 박스 전체 표시 구간 밖
      if (localProgress <= 0 || localProgress >= 1) {

        box.classList.remove(
          "is-visible",
          "is-dark"
        );

        lines.forEach(line => {
          line.classList.remove("is-active");
        });

        return;
      }

      const count = lines.length;

      // 문장 하나당
      // ① 텍스트 표시
      // ② 텍스트 없는 빈 박스
      const segmentCount = count * 2;

      const position =
        localProgress * segmentCount;

      const segment = Math.min(
        segmentCount - 1,
        Math.floor(position)
      );

      const segmentProgress =
        position - segment;

      const isTextSegment =
        segment % 2 === 0;

      const textIndex =
        Math.floor(segment / 2);

      box.classList.add("is-visible");

      // SCENE 2 두 번째 문장에서는 검정 박스
      if (
        config.id === "scene2" &&
        textIndex === 1
      ) {
        box.classList.add("is-dark");
      } else {
        box.classList.remove("is-dark");
      }

      if (isTextSegment) {

        lines.forEach((line, index) => {
          line.classList.toggle(
            "is-active",
            index === textIndex
          );
        });

      } else {

        // 빈 박스 구간
        lines.forEach(line => {
          line.classList.remove("is-active");
        });

      }

      // 첫 문장부터 마지막 문장까지
      // 박스 자체는 계속 유지
      // 마지막 구간에서만 사라짐
      const isLastSegment =
        segment === segmentCount - 1;

      if (isLastSegment) {

        box.style.opacity =
          1 - smoothstep(segmentProgress);

      } else {

        box.style.opacity = "1";

      }

    });

  }

  let ticking = false;

  function requestStoryUpdate() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      updateStoryBoxes();
      ticking = false;
    });

  }

  window.addEventListener(
    "scroll",
    requestStoryUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestStoryUpdate
  );

  updateStoryBoxes();

})();

/* ============================================================
   [END: STORY TEXT BOXES]
   ============================================================ */
