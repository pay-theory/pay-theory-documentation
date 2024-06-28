const API_KEY = 'API_KEY';
const AMOUNT = 100;
const PAYOR_INFO = {
  first_name: 'User',
  last_name: 'Name',
};
const TRANSACTING_PARAMETERS = {
  amount: AMOUNT,
  payorInfo: PAYOR_INFO,
};

paytheory.errorObserver(e => console.log(e, 'error'));
paytheory.stateObserver(e => console.log(e, 'state'));
paytheory.validObserver(e => console.log(e, 'valid'));

paytheory.payTheoryFields({
  apiKey: API_KEY,
});

const paymentButton = document.getElementById('initiate-payment');
paymentButton.addEventListener('click', e => {
  e.preventDefault();
  paytheory
    .transact(TRANSACTING_PARAMETERS)
    .then(result => {
      const statusContainer = document.getElementById('result-text');
      if (result.type === 'SUCCESS') {
        statusContainer.innerHTML = JSON.stringify(result.body);
      } else if (result.type === 'FAILURE') {
        statusContainer.innerHTML = `Payment Failed: ${result.body.reason.failure_text}`;
      } else if (result.type === 'ERROR') {
        statusContainer.innerHTML = `Payment Error: ${result.error}`;
      }
    })
    .catch(e => {
      const statusContainer = document.getElementById('result-text');
      statusContainer.innerHTML = JSON.stringify(e);
    });
});
