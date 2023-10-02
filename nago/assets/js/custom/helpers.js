function setHTMLContent(divId, content) {
  // const parser = new DOMParser();

  // const cnt = parser.parseFromString(content, 'text/html');

  if (typeof divId === 'string') {
    document.getElementById(divId).innerHTML = content;
  } else {
    divId.innerHTML = content;
  }
}

function createElement(tagName, id, className) {
  const tag = document.createElement(tagName);

  if (id) {
    tag.id = id;
  }
  if (className) {
    tag.classList = className;
  }

  return tag;
}
