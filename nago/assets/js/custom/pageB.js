const pageBContent = [
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
    type: 'dropdown',
    id: 'dropListA',
    content: '',
    options: [
      {
        value: 'dragon',
        title: 'Dragon',
      },
      {
        value: 'princess',
        title: 'Princess',
      },
    ],
  },
  {
    type: 'dynamic-dark-region',
    id: 'dynamic-dark-region',
  },
  {
    type: 'button-submit',
    id: 'buttA',
    content: 'Continue',
    options: [],
  },
];

function renderDynamicContentOfPageB(details) {
  const pageB = createElement('div', 'pageB');

  pageBContent.forEach((content) => {
    if (content.type == 'text') {
      const div = createElement('div', content.id);
      setHTMLContent(div, details.cntHTML[content.id]);
      pageB.appendChild(div);
    } else if (content.type === 'dropdown') {
      const div = createElement('div', '', 'form-group');

      const innerHTML = `
      <select id="${content.id}" class="${content.id}">
        <option>Select</option>
      </select>
    `;

      setHTMLContent(div, innerHTML);

      // wait for element appended to DOM then assign the options value
      setTimeout(() => {
        $(`#${content.id}`).select2({
          placeholder: 'Select',
          data: content.options.map((opt) => ({
            id: opt.id || opt.value,
            text: opt.text || opt.title,
          })),
        });
      }, 150);
      pageB.appendChild(div);
    } else if (content.type === 'dynamic-dark-region') {
      const div = createElement('div', '', 'form-group');

      let innerHTML = '';
      Object.entries(details.options || {}).map(([key, options], index) => {
        innerHTML += `
          <div class="form-group">
            <div class="divInLabel">Column ${index + 1}</div>
            <select id="${key}" class="dropListInSelect">
              <option>Select</option>
            </select>
          </div>
        `;

        console.log('${key}${index}', `${key}${index}`);
        console.log('$(`#${key}${index}`)', $(`#${key}`));

        // wait for element appended to DOM then assign the options value
        setTimeout(() => {
          $(`#${key}`).select2({
            placeholder: 'Select',
            data: options.map((opt) => ({
              id: opt.id || opt.value,
              text: opt.text || opt.title,
            })),
          });
        }, 150);
      });

      const section = `
        <section class="${content.id}" id="${content.id}">
        ${innerHTML}
        </section>
      `;

      setHTMLContent(div, section);
      pageB.appendChild(div);
    } else if (content.type === 'button-submit') {
      const div = createElement('div', '', 'form-group');
      const innerHTML = `
      <button id="${content.id}" class="btn btn-primary btn-block border-radius-round">${content.content}</button>
      `;

      setHTMLContent(div, innerHTML);
      attachEventForOnClickSubmitPageB(div, content.id);
      pageB.appendChild(div);
    }
  });

  return pageB;
}

function attachEventForOnClickSubmitPageB(parentDiv, id) {
  parentDiv.querySelector(`#${id}`).addEventListener('click', () => {
    console.log('BUtton continue of PAGE B is clicked');
  });
}
