// Saves options to chrome.storage
function save_options() {
  var websites = document.getElementById('websites').value;
  chrome.storage.sync.set({
    websites: websites,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    websites: 'www.faceobook.com'
  }, function(items) {
    document.getElementById('websites').value = items.websites;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

    window.addEventListener('keydown', function(e) {
      if ((e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) && (e.target.nodeName == 'BODY')) {
        document.querySelector('#scary-image').remove();
        audio.pause();
        audio.currentTime = 0;
      }
    }, true);
