// ============================================================
// NBTI Quiz UI v2.0
// 使用 buildQuestionPath 自适应路由引擎
// ============================================================

import { navigateTo } from '../app/router.js';
import { getQuestionById, buildQuestionPath } from '../content/questions.js';
import { buildResultFromAnswers } from '../domain/scoring.js';

let currentIndex = -1;

export function renderQuizShell(rootElement, appState) {
  // 使用新的路径构建引擎，它会根据已有答案动态计算完整路径
  const path = buildQuestionPath(appState.answers);
  const totalQuestions = path.length;

  // 定位到当前题目
  if (currentIndex === -1 || currentIndex >= totalQuestions) {
    // 找到第一道未答的题
    currentIndex = path.findIndex(id => !appState.answers[id]);
    if (currentIndex === -1) {
      currentIndex = totalQuestions - 1; // 全部已答，定位到最后一题
    }
  }

  // 安全边界
  currentIndex = Math.max(0, Math.min(currentIndex, totalQuestions - 1));

  const questionId = path[currentIndex];
  const question = getQuestionById(questionId);

  if (!question) {
    rootElement.innerHTML = `<main class="screen"><p>题目加载失败，请刷新重试。</p></main>`;
    return;
  }

  // 计算已答题数
  const answeredCount = path.filter(id => appState.answers[id]).length;

  // 是否全部完成
  const isComplete = answeredCount === totalQuestions;
  const progressPercent = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

  // 渲染选项
  const optionMarkup = question.options.map((option) => {
    const checkedAttribute = appState.answers[questionId] === option.id ? 'checked' : '';
    return `
      <label class="option-card">
        <input type="radio" name="${question.id}" value="${option.id}" ${checkedAttribute} />
        <span>${option.text}</span>
      </label>
    `;
  }).join('');

  // 题目类型标签
  const categoryLabels = {
    mbti: '🧭 MBTI 维度探测',
    core: '🎯 核心性格识别',
    adaptive: '🔍 深度分析',
    funny: '🎪 趣味彩蛋',
    philosophy: '🌊 灵魂拷问',
  };
  const categoryLabel = categoryLabels[question.category] || 'NBTI 测试';

  rootElement.innerHTML = `
    <main class="screen screen--quiz">
      <section class="panel-card quiz-header-card">
        <p class="eyebrow">${categoryLabel}</p>
        <h2>先把题做完，再让结果骂你。</h2>
        
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p class="progress-text" data-testid="quiz-progress">答题进度：已答 ${answeredCount}/${totalQuestions} 题 | 当前第 ${currentIndex + 1} 题</p>
        </div>
      </section>
      
      <form class="quiz-grid" data-testid="quiz-form">
        <fieldset class="question-card" data-question-id="${question.id}">
          <legend><span class="question-index">${currentIndex + 1}</span>${question.prompt}</legend>
          <div class="option-grid">${optionMarkup}</div>
        </fieldset>
      </form>
      
      <div class="quiz-navigation">
        <button class="secondary-button" type="button" data-action="prev-question" ${currentIndex === 0 ? 'disabled' : ''}>上一题</button>
        ${
          isComplete
            ? `<button class="primary-button" type="button" data-action="submit-quiz">提交并查看结果</button>`
            : `<button class="primary-button" type="button" data-action="next-question" ${appState.answers[questionId] ? '' : 'disabled'}>下一题</button>`
        }
      </div>
      
      <div style="text-align: center; margin-top: 12px;">
         <button class="secondary-button" type="button" data-action="go-home" style="border:none; text-decoration:underline;">返回首页</button>
      </div>
    </main>
  `;

  // 绑定事件
  const formElement = rootElement.querySelector('[data-testid="quiz-form"]');
  const prevButton = rootElement.querySelector('[data-action="prev-question"]');
  const nextButton = rootElement.querySelector('[data-action="next-question"]');
  const submitButton = rootElement.querySelector('[data-action="submit-quiz"]');
  const homeButton = rootElement.querySelector('[data-action="go-home"]');

  formElement?.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'radio' || !target.name) {
      return;
    }

    // 设置答案
    const newAnswers = { ...appState.answers, [target.name]: target.value };
    appState.setAnswers(newAnswers);

    // 视觉反馈
    const optionGrid = formElement.querySelector('.option-grid');
    if (optionGrid) {
      optionGrid.style.pointerEvents = 'none';
      optionGrid.style.opacity = '0.7';
    }

    if (nextButton) {
      nextButton.innerHTML = '正在跳转... ⏳';
    } else if (submitButton) {
      submitButton.innerHTML = '准备提交... ⏳';
    }

    // 自动跳转下一题
    setTimeout(() => {
      currentIndex++;
      renderQuizShell(rootElement, appState);
    }, 850);
  });

  prevButton?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuizShell(rootElement, appState);
    }
  });

  nextButton?.addEventListener('click', () => {
    currentIndex++;
    renderQuizShell(rootElement, appState);
  });

  submitButton?.addEventListener('click', () => {
    currentIndex = -1;

    // 只保留路径中的答案
    const finalAnswers = {};
    path.forEach(id => {
      if (appState.answers[id]) {
        finalAnswers[id] = appState.answers[id];
      }
    });

    const result = buildResultFromAnswers(finalAnswers);
    appState.setResult(result);
    navigateTo('/result');
  });

  homeButton?.addEventListener('click', () => {
    currentIndex = -1;
    navigateTo('/');
  });
}