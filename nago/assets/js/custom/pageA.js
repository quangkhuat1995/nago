const pageAContent = [
  {
    type: 'text',
    id: 'divA',
    content: '',
    options: [],
  },
  {
    type: 'text',
    id: 'divB',
    content: '',
    options: [],
  },
  {
    type: 'radio',
    id: 'radio',
    content: '',
    options: [
      {
        value: 'dragon',
        title: 'Dragon',
        text: 'I want to train a dragon',
      },
      {
        value: 'princess',
        title: 'Princess',
        text: 'I want to be a princess',
      },
    ],
  },
  {
    type: 'button-upload',
    id: 'buttA',
    content: 'Upload XLS',
    options: [],
  },
  {
    type: 'button-submit',
    id: 'buttB',
    content: 'Continue',
    options: [],
  },
];

function renderDynamicContentOfPageA(details) {
  const pageA = createElement('div', 'pageA');

  pageAContent.forEach((content) => {
    if (content.type == 'text') {
      const div = createElement('div', content.id);
      setHTMLContent(div, details.cntHTML[content.id]);
      pageA.appendChild(div);
    } else if (content.type === 'radio') {
      const div = createElement('div', content.id);

      let innerHTML = '';
      content.options.forEach((opt) => {
        innerHTML += `
        <div class="form-group">
        <div class="form-check p-0 m-t-10">
          <input hidden class="form-check-input custom-radio" type="radio" name="selector" id="${opt.value}" value="${opt.value}">
          <label class="form-check-label selector" for="${opt.value}">
            <img class="selector-img m-r-10" />
            <div class="selector-content">
              <h3 class="selector-content-title m-b-10">${opt.title}</h3>
              <p class="selector-content-text">${opt.text}</p>
            </div>
          </label>
        </div>
      </div>
        `;
      });

      setHTMLContent(div, innerHTML);
      pageA.appendChild(div);
    } else if (content.type === 'button-upload') {
      const div = createElement('div', '', 'form-group');
      const innerHTML = `
        <button id="${content.id}" class="btn btn-outline-primary btn-block border-radius-round upload-xls-btn">${content.content}</button>
        <input hidden type="file" class="form-control-file" id="upload-xls-file">
        <div id="divC" class="upload-xls-file-name m-t-b-10"></div>
      `;

      setHTMLContent(div, innerHTML);
      attachEventsForUploadButtonPageA(div);
      pageA.appendChild(div);
    } else if (content.type === 'button-submit') {
      const div = createElement('div', '', 'form-group');
      const innerHTML = `
        <button id="${content.id}" class="btn btn-primary btn-block border-radius-round" disabled>${content.content}</button>
      `;
      setHTMLContent(div, innerHTML);
      attachEventForOnClickSubmitPageA(div, content.id);

      pageA.appendChild(div);
    }
  });

  return pageA;
}

function attachEventsForUploadButtonPageA(parentDiv) {
  console.log('parentDiv', parentDiv);
  // Step 1: Get references to the elements
  const buttA = parentDiv.querySelector('#buttA');
  const uploadXLSFile = parentDiv.querySelector('#upload-xls-file');
  const divC = parentDiv.querySelector('#divC');

  // Step 2: Add an event listener to the buttA button
  buttA.addEventListener('click', () => {
    // Trigger a click event on the file input
    uploadXLSFile.click();
  });

  // Step 3: Add an event listener to the file input
  uploadXLSFile.addEventListener('change', () => {
    // Get the selected file from the input
    const selectedFile = uploadXLSFile.files[0];

    // Check if a file was selected
    if (selectedFile) {
      // Display the file name in divC
      divC.textContent = selectedFile.name;
    } else {
      // If no file was selected, clear the divC content
      divC.textContent = '';
    }
  });
}

function attachEventForOnClickSubmitPageA(parentDiv, id) {
  parentDiv.querySelector(`#${id}`).addEventListener('click', () => {
    console.log('BUtton continue of PAGE A is clicked');
  });
}
