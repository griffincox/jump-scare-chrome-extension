window.addEventListener("load", function() {
  chrome.storage.sync.get({
    // default
    websites: 'www.facebook.com'
  }, function(items) {
    sites = items.websites.replace(/\s/g, '').split(',');
    triggerScare(sites)
  });
});

function triggerScare(sites) {
  if (Math.random() < 0.5) {
    if (sites.includes(window.location.hostname)) {
      setTimeout(jumpScare(), randomTime())
    }
  }
}

function jumpScare() {
  documentBody = document.body;
  audio = new Audio('http://soundbible.com/mp3/tolling-bell_daniel-simion.mp3');
  audio.play();
  imageNode = document.createElement("img");
  imageNode.setAttribute('src', 'http://www.scaryforkids.com/pics/scary-pictures.jpg');
  imageNode.setAttribute('id', 'scary-image');
  documentBody.appendChild(imageNode);

  window.addEventListener('keydown', function(e) {
    if ((e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) && (e.target.nodeName == 'BODY')) {
      document.querySelector('#scary-image').remove();
      audio.pause();
      audio.currentTime = 0;
    }
  }, true);
}

function randomTime() {
  Math.random() *  10000
}
