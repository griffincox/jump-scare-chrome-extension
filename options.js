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
    console.log("saved settings")
  });
}

document.getElementById('save').addEventListener('click',
    save_options);
