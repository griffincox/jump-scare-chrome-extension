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
  if (sites.includes(window.location.hostname) && Math.random() < 0.5) {
    console.log("scare incoming!")
    setTimeout(jumpScare(), randomTime())
  }
}

function jumpScare() {
  documentBody = document.body;
  // Copyright Daniel Simion, used under Attribution 3.0
  audio = new Audio(chrome.runtime.getURL('sounds/tolling-bell_daniel-simion.mp3'));
  audio.play();
  imageNode = document.createElement("img");
  imageNode.setAttribute('src', randomScaryImageUrl());
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

function randomScaryImageUrl() {
  numberOfScaryPictures = 5
  number = Math.floor(Math.random() * numberOfScaryPictures) + 1
  fileString = 'images/scary-picture-' + number + '.jpeg'
  return chrome.runtime.getURL(fileString)
}
