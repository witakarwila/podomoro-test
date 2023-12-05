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
<<<<<<< HEAD
document.querySelector('model-viewer').addEventListener('progress', onProgress);
=======

const handleARButtonClick = () => {
  if (document.querySelector('model-viewer').canActivateAR) {
    document.querySelector('model-viewer').activateAR();
  } else {
    console.error('AR mode is not supported.');
    alert('AR mode is not supported on your device');
  }
};

document.querySelector('model-viewer').addEventListener('progress', onProgress);
document.querySelector('#ar-button').addEventListener('click', handleARButtonClick);
>>>>>>> 3cc2cc1 (button ar)
