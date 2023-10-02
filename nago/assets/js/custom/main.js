const pageADetails = {
  cntHTML: {
    divA: '<h1>Header hello</h1>',
    divB: '<h3>Short intro about this step....</h3>',
  },
};

const pageBDetails = {
  cntHTML: {
    divA: '<h1>Header hello</h1>',
    divB: '<h3>Short intro about this step....</h3>',
  },
  options: {
    dropListIn0: [
      {
        value: 'france',
        title: 'France',
      },
      {
        value: 'us',
        title: 'US',
      },
      {
        value: 'england',
        title: 'England',
      },
    ],
    dropListIn1: [
      {
        value: 'france1',
        title: 'France1',
      },
      {
        value: 'us1',
        title: 'US1',
      },
      {
        value: 'england1',
        title: 'England1',
      },
    ],
  },
};

const pageCDetails = {
  cntHTML: {
    divA: '<h1>Header hello</h1>',
    divB: '<h3>Short intro about this step....</h3>',
    divC: 'progress status',
    divD: 'Explanation X',
    divE: 'Explanation Y',
    divF: 'Explanation Z',
    divG: 'Explanation ZX',
  },
};

// main func
function renderView(divId, pageId, details = {}) {
  const targetDiv = document.getElementById(divId);

  // this to clear all the content of targeted div
  targetDiv.innerHTML = '';

  switch (pageId) {
    case 'pageA':
      const pageA = renderDynamicContentOfPageA({
        ...details,
        ...pageADetails,
      });

      targetDiv.appendChild(pageA);
      break;

    case 'pageB':
      const pageB = renderDynamicContentOfPageB({
        ...details,
        ...pageBDetails,
      });

      targetDiv.appendChild(pageB);
      break;

    case 'pageC':
      const pageC = renderDynamicContentOfPageC({
        ...details,
        ...pageCDetails,
      });

      targetDiv.appendChild(pageC);
      break;

    default:
      break;
  }
}

// for demo

document.getElementById('demo-page-A').addEventListener('click', () => {
  renderView('page-main', 'pageA', {});
  document
    .getElementById('pageA')
    .addEventListener('change', validatePageAForm);
});

document.getElementById('demo-page-B').addEventListener('click', () => {
  renderView('page-main', 'pageB', {});
});

document.getElementById('demo-page-C').addEventListener('click', () => {
  renderView('page-main', 'pageC', {});
});

// listener to validate the button

function validatePageAForm() {
  const uploadedFile = document.getElementById('upload-xls-file');
  let isValid = false;
  const selectedRadioButton = document.querySelector(
    'input[name="selector"]:checked'
  );

  if (selectedRadioButton && uploadedFile.files.length) {
    isValid = true;
  }
  console.log('uploadedFile', uploadedFile.value);
  if (isValid) {
    document.getElementById('buttB').removeAttribute('disabled');
  } else {
    document.getElementById('buttB').setAttribute('disabled', 'true');
  }
}
