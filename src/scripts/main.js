'use strict';

const firstPromice = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.body.addEventListener(
    'click',
    (e) => {
      resolve('First promise was resolved');
      clearTimeout(timeoutId);
    },
    { once: true },
  );
});

firstPromice
  .then((successResults) => {
    createNotification(successResults, true);
  })
  .catch((errorResult) => {
    createNotification(errorResult, false);
  });

const secondPromice = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

secondPromice.then((successResults) => {
  createNotification(successResults, true);
});

const thirdPromice = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener(
    'click',
    () => {
      left = true;
      checkCondition();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      right = true;
      checkCondition();
    },
    { once: true },
  );

  function checkCondition() {
    if (left && right) {
      resolve('Third promise was resolved');
    }
  }
});

thirdPromice.then((successResults) => {
  createNotification(successResults, true);
});

function createNotification(message, success = true) {
  const notifications = document.querySelectorAll('[data-qa="notification"]');

  notifications.forEach((notification) => {
    notification.remove();
  });

  const divMessage = document.createElement('div');

  divMessage.setAttribute('data-qa', 'notification');
  divMessage.classList.add(success ? 'success' : 'error');
  divMessage.textContent = message;
  document.body.append(divMessage);
}
