import { navigateTo } from '../app/router.js';
import { getQuestionById, getNextQuestionId, getFirstQuestionId } from '../content/questions.js';
import { buildResultFromAnswers } from '../domain/scoring.js';

let path = [];
let currentIndex = -1;

export function renderQuizShell(rootElement, appState) {
  // Rebuild the path every time based on current answers to handle branch changes perfectly
  path = [];
  let currId = getFirstQuestionId();
  path.push(currId);
  
  while (appState.answers[currId]) {
    let nextId = getNextQuestionId(currId, appState.answers[currId]);
    if (nextId) {
      if (!path.includes(nextId)) {
        path.push(nextId);
        currId = nextId;
      } else {
        break; // prevent cycles
      }
    } else {
      break; // End of test
    }
  }

  // Set currentIndex to the last accessible question (the unanswered one, or the final one)
  if (currentIndex === -1 || currentIndex >= path.length) {
    currentIndex = path.length - 1;
  }

  // Ensure bounds
  currentIndex = Math.max(0, Math.min(currentIndex, path.length - 1));

  const questionId = path[currentIndex];
  const question = getQuestionById(questionId);

  // Check if test is completely finished (no next question returned AND current is answered)
  const isComplete = appState.answers[questionId] && getNextQuestionId(questionId, appState.answers[questionId]) === null;
  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / 40) * 100)); // approx 39-40 questions total

  const optionMarkup = question.options.map((option) => {
    const checkedAttribute = appState.answers[questionId] === option.id ? 'checked' : '';
    return `
      <label class="option-card">
        <input type="radio" name="${question.id}" value="${option.id}" ${checkedAttribute} />
        <span>${option.text}</span>
      </label>
    `;
  }).join('');

  rootElement.innerHTML = `
    <main class="screen screen--quiz">
      <section class="panel-card quiz-header-card">
        <p class="eyebrow">NBTI / 专业且毒舌的测试</p>
        <h2>先把题做完，再让结果骂你。</h2>
        
        <div class="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p class="progress-text" data-testid="quiz-progress">答题进度：已答 ${path.length - (appState.answers[questionId] ? 0 : 1)} 题 | 当前第 ${currentIndex + 1} 题</p>
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

    // Set answer
    const newAnswers = { ...appState.answers, [target.name]: target.value };
    
    // Crucial: Delete any answers for questions that fall off the new path if the user changed a branching answer.
    appState.setAnswers(newAnswers);

    // Provide visual feedback for auto-advance
    const optionGrid = formElement.querySelector('.option-grid');
    if (optionGrid) {
      optionGrid.style.pointerEvents = 'none'; // Lock inputs during delay
      optionGrid.style.opacity = '0.7';
    }

    if (nextButton) {
      nextButton.innerHTML = '正在跳转... ⏳';
    } else if (submitButton) {
      submitButton.innerHTML = '准备提胶... ⏳';
    }

    // Automatically transition to next question with a slight delay
    setTimeout(() => {
      // Because we re-calc path on render, we just need to advance currentIndex if not at end
      // Actually, since we added the new answer, the path length might have grown!
      currentIndex++; // Try to step forward
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
    currentIndex = -1; // reset for future plays
    
    // Purge orphaned answers from branches the user abandoned
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
    currentIndex = -1; // reset back
    navigateTo('/');
  });
}