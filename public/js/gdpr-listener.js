
document.cookiesjsr = {
  apiUrl: '',
  configQuery: '/cookiesjsr/services.json'
}

function attachEvent(element, options) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('cookiesjsrSetService', options))
  });
}

function getLabel(id, status, services) {
  let element = document.getElementById(id);
  element.innerHTML = '';
  let content = document.createElement('a');
  let text = (status) ? 'ACTIVE' : 'disabled';
  content.setAttribute('name', id);
  content.innerHTML = id + ' ' + text;
  let options = (typeof services !== 'object')
    ? {detail: {services: {}, groups: {}}} : services;
  options.detail.services[id] = !status;
  attachEvent(content, options)
  element.appendChild(content)
}

let actionLinks = {
  enableAll: {detail: { all: true }},
  disableAll: {detail: { all: false }},
  enableAnalytic: {detail: {groups: { tracking: true }}},
  disableAnalytic: {detail: {groups: { tracking: false }}}
}

for (let id in actionLinks) {
  let link = document.getElementById(id);
  if (link) {
    attachEvent(link, actionLinks[id]);
  }
}

let dispatcher = {
  gtag: {
    activate: function() {
      getLabel('gtag', true)
    },
    fallback: function() {
      getLabel('gtag', false)
    },
  },
  analytics: {
    activate: function() {
      getLabel('analytics', true);
    },
    fallback: function() {
      getLabel('analytics', false);
    },
  },
  youtube: {
    activate: function() {
      getLabel('youtube', true);
    },
    fallback: function() {
      getLabel('youtube', false);
    },
  },
  facebook: {
    activate: function() {
      getLabel('facebook', true);
    },
    fallback: function() {
      getLabel('facebook', false);
    },
  },
}


document.addEventListener('cookiesjsrUserConsent', function(event) {
  let services = (typeof event.detail.services === 'object') ? event.detail.services : {};
  for (let sid in services) {
    if(typeof dispatcher[sid] === 'object') {
      if(services[sid] === true && typeof dispatcher[sid].activate === 'function') {
        dispatcher[sid].activate();
      } else if(typeof dispatcher[sid].fallback === 'function') {
        dispatcher[sid].fallback();
      }
    } else {
      console.log('No object for ' + sid);
    }
  }
});
