// Get the HTML body element
var body = document.querySelector('body');
let go = true;
let firstPass = true;

// Add a click event listener to the body
body.addEventListener('click', function (event) {
  go = !go;
  if(go){nextSlide();} // restart animation
});

/* animation shorthand: name duration timing function delay iterations direction  */

var images = [
  {
    name:'Fox',
    src: 'https://preview.redd.it/htvmdql30qva1.jpg?width=640&crop=smart&auto=webp&s=6493f0d4cb37ddfe5f2cb87a187c8d551db1c7f8',
    animation: 'slide 10s linear 0s 1 forwards',
    beginNext: 9000 
  },
  {
    name:'Room',
    src: 'https://a0.muscache.com/im/pictures/eaf2d02a-3477-4c4b-b76a-39d02945604f.jpg?ROOM=0&im_w=1200',
    animation: 'spin 10s linear 0s 1 forwards',
    beginNext: 9000
  },
  {
    name:'Book',
    src: 'https://api.free.vote/images/20231102-6A97.JPG?BOOK=0',
    animation: 'slide 10s linear 0s 1 forwards',
    beginNext: 9000
  },
  {
    src: 'https://a0.muscache.com/im/pictures/360b770e-b473-4e14-ac4f-f9e63e3a9306.jpg?im_w=1200',
    animation: 'spin 10s linear 0s 1 forwards',
    beginNext: 9000
  },
  {
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    animation: 'grow 10s linear 0s 1 forwards',
    beginNext: 9000
  }

];

// Starting condition - last image in array, alternative image B
let currentImageId = 'imgB'; 
let currentBackgroundId='imgBBackground';
let imageAnimationIndex = images.length - 1;

function nextSlide() {

  // Current Image will be send backwards and become the old
  let currentImage = document.getElementById(currentImageId);
  let currentBackground = document.getElementById(currentBackgroundId);

  // Swap the currentImageId to get newCurrentImage
  if (currentImageId == 'imgA') {
    currentImageId = 'imgB';
    currentBackgroundId='imgBBackground';
  } else {
    currentImageId = 'imgA';
    currentBackgroundId='imgABackground';
  }

  // New image is the active incoming image and will be brought forwards along with  background
  let newImage = document.getElementById(currentImageId);
  let newBackground = document.getElementById(currentBackgroundId);

  // Update image animation index to get new src and animation from images array
  imageAnimationIndex = (imageAnimationIndex + 1) % images.length;
  
  let imageData = images[imageAnimationIndex];
  newImage.src = imageData.src;
  newBackground.src = imageData.src;

  // Toggle new and background image zOrder
  currentImage.classList.toggle("zzTop");
  currentImage.classList.toggle("zzBottom"); 

  newImage.classList.toggle("zzTop"); 
  newImage.classList.toggle("zzBottom"); 

  // The current background src does not change - we just fade out
  newBackground.classList.toggle('fadeIn');
  newBackground.classList.toggle('fadeOut');

  currentBackground.classList.toggle('fadeIn');
  currentBackground.classList.toggle('fadeOut');

  // Ensure change of animation to trigger animation restart if identical to previous
  newImage.style.animation = 'dummy 60s linear 0s 1 forwards';
  setTimeout(() => {
    if(firstPass){
        currentImage.classList.remove('hidden'); 
        firstPass=false;
    }
    
    newImage.style.animation = imageData.animation;      
  }, 50);
  
//   console.log('Begin', currentImageIndex, imageData.name, newBackground.classList, currentBackground.classList);
  

  // Stopped on body click
  if (go) {
    setTimeout(nextSlide, imageData.beginNext);
  }
}

// Start the slideshow
nextSlide();
