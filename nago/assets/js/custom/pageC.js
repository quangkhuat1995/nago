function initRoundChart(id, value, label) {
  var colors = {
    primary: $('.colors .bg-primary').css('background-color'),
    primaryLight: $('.colors .bg-primary-bright').css('background-color'),
    secondary: $('.colors .bg-secondary').css('background-color'),
    secondaryLight: $('.colors .bg-secondary-bright').css('background-color'),
    info: $('.colors .bg-info').css('background-color'),
    infoLight: $('.colors .bg-info-bright').css('background-color'),
    success: $('.colors .bg-success').css('background-color'),
    successLight: $('.colors .bg-success-bright').css('background-color'),
    danger: $('.colors .bg-danger').css('background-color'),
    dangerLight: $('.colors .bg-danger-bright').css('background-color'),
    warning: $('.colors .bg-warning').css('background-color'),
    warningLight: $('.colors .bg-warning-bright').css('background-color'),
  };

  var valueFontColor = 'black';

  if ($('body').hasClass('dark')) {
    valueFontColor = 'white';
  }

  function init() {
    new JustGage({
      id,
      value,
      min: 0,
      max: 100,
      counter: true,
      donut: true,
      gaugeWidthScale: 0.3,
      valueFontColor: valueFontColor,
      levelColors: [colors.primary],
      label,
    });

    // Delete the extra added element when the page is resized.
    $(`#${id} > svg + svg`).remove();
  }

  init();

  $(window).on('resize', function () {
    init();
  });
}

const pageCContent = [
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
    type: 'progress-line',
    id: 'progressB',
    content: '',
    data: {
      value: 90,
    },
  },
  {
    type: 'text',
    id: 'divC',
    className: 'text-center',
    content: '',
    options: [],
  },
  {
    type: 'text',
    id: 'divD',
    className: 'text-center',
    content: '',
    options: [],
  },
  {
    type: 'progress-round',
    id: 'progressRound',
    content: '',
    data: {
      value: 90,
      label: 'Breathing Fire',
    },
  },
  {
    type: 'text',
    id: 'divE',
    content: '',
    options: [],
  },
  {
    type: 'button',
    id: 'buttA',
    content: 'Button Opt A',
    options: [],
  },
  {
    type: 'text',
    id: 'divF',
    content: '',
    options: [],
  },
  {
    type: 'button',
    id: 'buttB',
    content: 'Button Opt B',
    options: [],
  },
  {
    type: 'text',
    id: 'divG',
    content: '',
    options: [],
  },
];

function renderDynamicContentOfPageC(details) {
  const pageC = createElement('div', 'pageC');

  pageCContent.forEach((content) => {
    if (content.type == 'text') {
      const div = createElement('div', content.id, content.className);
      setHTMLContent(div, details.cntHTML[content.id]);
      pageC.appendChild(div);

      // setHTMLContent('divB', details.cntHTML.divB);
    } else if (content.type === 'button') {
      const div = createElement('div', '', 'form-group');
      const innerHTML = `
        <button id="${content.id}" class="btn btn-primary btn-block border-radius-round">${content.content}</button>
      `;

      setHTMLContent(div, innerHTML);
      pageC.appendChild(div);
    } else if (content.type === 'progress-line') {
      const div = createElement('div', content.id, 'progress mb-3');

      div.style.height = '10px';

      const innerHTML = `
      <div style="width:${content.data.value}%" class="progress-bar w-${content.data.value} bg-info-gradient" role="progressbar"></div>
      `;

      setHTMLContent(div, innerHTML);
      pageC.appendChild(div);
    } else if (content.type === 'progress-round') {
      // setHTMLContent(content.id, content.content);
      const div = createElement('div', content.id);

      div.style.height = '150px';

      initRoundChart(content.id, content.data.value, content.data.label);
      pageC.appendChild(div);
    }
  });

  return pageC;
}
