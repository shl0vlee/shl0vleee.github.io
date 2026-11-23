/*
 * 12주차 인터랙티브반 공통 실습 시작 파일
 *
 * 구현됨: 페이지 진입 애니메이션, 연도 A/B 콘텐츠 전환.
 *
 * 연도 비교 기능은 .unemployment-compare-section 내부에서만 동작한다.
 * 선택 버튼: .year-button-a / .year-button-b
 * 변경 대상: .year-rate / .year-description / .year-chart
 */

// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const compareSection = document.querySelector('.unemployment-compare-section');

if (compareSection) {
  const yearButtons = {
    A: compareSection.querySelector('.year-button-a'),
    B: compareSection.querySelector('.year-button-b')
  };
  const yearData = {
    A: {
      rate: '4.2',
      description: '연도 A의 학습용 가상 실업률은 4.2%이며, 그래프는 해당 값의 예시 추이를 보여줍니다.',
      image: 'images/year-a.svg',
      imageAlt: '가상 데이터 연도 A 실업률 추이 그래프',
      title: '연도 A의 실업률 변화'
    },
    B: {
      rate: '3.6',
      description: '연도 B의 학습용 가상 실업률은 3.6%이며, 그래프는 해당 값의 예시 추이를 보여줍니다.',
      image: 'images/year-b.svg',
      imageAlt: '가상 데이터 연도 B 실업률 추이 그래프',
      title: '연도 B의 실업률 변화'
    }
  };

  const yearRate = compareSection.querySelector('.year-rate');
  const yearLabel = compareSection.querySelector('.year-label');
  const yearDescription = compareSection.querySelector('.year-description');
  const metricTitle = compareSection.querySelector('.metric-title');
  const yearChart = compareSection.querySelector('.year-chart');
  const chartLabel = compareSection.querySelector('.chart-footer > span:first-child');
  const chartStatus = compareSection.querySelector('.chart-status');
  const practiceMessage = compareSection.querySelector('.practice-message');

  const selectYear = (year) => {
    const data = yearData[year];

    yearRate.innerHTML = `${data.rate}<span>%</span>`;
    yearLabel.textContent = `YEAR ${year}`;
    yearDescription.textContent = data.description;
    metricTitle.textContent = data.title;
    yearChart.src = data.image;
    yearChart.alt = data.imageAlt;
    chartLabel.textContent = `연도 ${year}`;
    chartStatus.textContent = `연도 ${year}의 가상 데이터 그래프가 표시 중입니다.`;
    practiceMessage.textContent = `현재 연도 ${year}의 학습용 가상 데이터가 표시됩니다.`;

    Object.entries(yearButtons).forEach(([buttonYear, button]) => {
      const isSelected = buttonYear === year;
      button.classList.toggle('active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
  };

  Object.entries(yearButtons).forEach(([year, button]) => {
    button.addEventListener('click', () => selectYear(year));
  });

  selectYear('A');
}
