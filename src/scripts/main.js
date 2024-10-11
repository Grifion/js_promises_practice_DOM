'use strict';

Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.body.addEventListener(
    'click',
    () => resolve('First promise was resolved'),
    clearTimeout(timeoutId),
    { once: true },
  );
})
  .then((successResults) => createNotification(successResults, true))
  .catch((errorResult) => createNotification(errorResult, false));

Promise((resolve) => {
  document.addEventListener('click', resolve('Second promise was resolved'));

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
}).then((successResults) => createNotification(successResults, true));

Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => (left = true), checkCondition());

  document.addEventListener(
    'contextmenu',
    () => (right = true),
    checkCondition(),
  );

  function checkCondition() {
    if (left && right) {
      resolve('Third promise was resolved');
    }
  }
}).then((successResults) => createNotification(successResults, true));

function createNotification(message, success = true) {
  const divMessage = document.createElement('div');

  divMessage.setAttribute('data-qa', 'notification');
  divMessage.classList.add(success ? 'success' : 'error');
  divMessage.textContent = message;
  document.body.append(divMessage);
}
