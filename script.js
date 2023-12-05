
// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

const handleARButtonClick = () => {
  if (document.querySelector('model-viewer').canActivateAR) {
    document.querySelector('model-viewer').activateAR();
  } else {
    console.error('AR mode is not supported.');
    alert('AR mode is not supported on your device');
  }
};

fetch('assets/azalea.glb')
    .then(response => response.blob())
    .then(blob => {
      fileToBase64(blob, function(base64) {
        document.querySelector('model-viewer').setAttribute('src', base64);
        document.querySelector('model-viewer').addEventListener('progress', onProgress);
      });
    })
    .catch(error => console.error('Error:', error));

function fileToBase64(file, callback) {
  var reader = new FileReader();
  reader.onload = function(event) {
    callback(event.target.result);
  };
  reader.readAsDataURL(file);
}



document.querySelector('#ar-button').addEventListener('click', handleARButtonClick);
