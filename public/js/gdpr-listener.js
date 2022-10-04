
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
  var element = document.getElementById(id);
  element.innerHTML = '';
  var content = document.createElement('a');
  var text = (status) ? 'enabled' : 'disabled';
  content.setAttribute('name', id);
  content.innerHTML = id + ' ' + text;
  let options = (typeof services !== 'object')
    ? {detail: {services: {}, groups: {}}} : services;
  options.detail.services[id] = !status;
  attachEvent(content, options)
  element.appendChild(content)
}

var actionLinks = {
  enableAll: {detail: { all: true }},
  disableAll: {detail: { all: false }},
  enableAnalytic: {detail: {groups: { analytic: true }}},
  disableAnalytic: {detail: {groups: { analytic: false }}}
}

for (var id in actionLinks) {
  var link = document.getElementById(id);
  if (link) {
    attachEvent(link, actionLinks[id]);
  }
}

var dispatcher = {
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
  var services = (typeof event.detail.services === 'object') ? event.detail.services : {};
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
