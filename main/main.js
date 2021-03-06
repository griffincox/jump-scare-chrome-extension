window.addEventListener("load", function() {
  chrome.storage.sync.get({
    // default
    websites: 'www.facebook.com'
  }, function(items) {
    sites = cleanStoredSitesString(items.websites).split(',');
    triggerScare(sites)
  });
});

function triggerScare(sites) {
  if (sites.includes(location.host.replace('www.','')) && Math.random() < 0.5) {
    console.log("Scare incoming!")
    setTimeout(jumpScare(), randomTime())
  }
}

function jumpScare() {
  playAudio();
  fullScreenImage();
  addEscKeyListener();
}

function cleanStoredSitesString(rawStoredSitesString) {
  return rawStoredSitesString.replace(/\s/g, '').replace('www.','').replace('http://', '').replace('https://', '')
}

function randomTime() {
  Math.random() *  10000
}

function playAudio() {
  // Copyright Daniel Simion, used under Attribution 3.0
  audio = new Audio(chrome.runtime.getURL('sounds/tolling-bell_daniel-simion.mp3'));
  audio.play();
}

function fullScreenImage() {
  documentBody = document.body;
  imageNode = document.createElement("img");
  imageNode.setAttribute('src', randomScaryImageUrl());
  imageNode.setAttribute('id', 'scary-image');
  documentBody.appendChild(imageNode);
}

function randomScaryImageUrl() {
  numberOfScaryPictures = 5
  number = Math.floor(Math.random() * numberOfScaryPictures) + 1
  fileString = 'images/scary-picture-' + number + '.jpeg'
  return chrome.runtime.getURL(fileString)
}

function addEscKeyListener() {
  window.addEventListener('keydown', function(e) {
    if ((e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) && (e.target.nodeName == 'BODY')) {
      document.querySelector('#scary-image').remove();
      audio.pause();
      audio.currentTime = 0;
    }
  }, true);
}
