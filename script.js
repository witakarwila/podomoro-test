var modelViewer = document.querySelector('model-viewer');

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

// Load the model using a secure fetch request
fetch('assets/azalea.glb')
  .then(response => response.blob())
  .then(blob => {
    // Create a URL object from the Blob
    const modelBlobUrl = URL.createObjectURL(blob);

    // Set the model source using the Blob URL
    // modelViewer.src = modelBlobUrl;
    onloadModelViewer(modelBlobUrl)
  })
  .catch(error => {
    console.error('Error loading model:', error);
  });

// fetch('assets/azalea.glb')
//     .then(response => response.blob())
//     .then(blob => {
//       fileToBase64(blob, function(base64) {
//         onloadModelViewer()
//       });
//     })
//     .catch(error => console.error('Error:', error));

// function fileToBase64(file, callback) {
//   var reader = new FileReader();
//   reader.onload = function(event) {
//     callback(event.target.result);
//   };
//   reader.readAsDataURL(file);
// }

const onloadModelViewer = (blobFile) => {
  var startTime = Date.now();
  var endTime;
  document.querySelector('model-viewer').addEventListener('load', () => {
    endTime = Date.now();

    console.log(endTime - startTime);
  });
  
  document.querySelector('model-viewer').setAttribute('src', blobFile);
  document.querySelector('model-viewer').addEventListener('progress', onProgress);
  // document.querySelector('model-viewer').scale = `${0.1} ${0.1} ${0.1}`;

}

// modelViewer.addEventListener('camera-change', (event) => {
//   console.log(event);
// });

document.querySelector('#ar-button').addEventListener('click', handleARButtonClick);
