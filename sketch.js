let mobilenet;
let classifier;
let video;
let guess;

function setup(){
  createCanvas(640,650);
  background(0);
  video=createCapture(VIDEO);
  video.hide();
  mobilenet=ml5.featureExtractor('MobileNet',()=>console.log('Model has been loaded.'));
  classifier=mobilenet.classification(video,()=> console.log('video has been loaded.'));
}

//called by button when adding images with label to classifier
function addClassImg(label){
  classifier.addImage(label);
  console.log(label+' image added');
}

//called after images added to classifier and when training is started by user
//(classifier.train is called in HTML)
//loss is amount of error when training on images
function whileTraining(loss){
  if(!loss){
    console.log('training is complete.');
    classifier.classify(prediction);
  }
}

function prediction(err,result){
  if(err){
    console.log(err);
  }
  else{
    guess=result;
    //rerun classification continously if no errors
    classifier.classify(prediction);
  }
}

function draw(){
  background(0);
  image(video,0,0);
  fill(255);
  textSize(32);
  if(guess){
    text(guess,10,height-60);
  }
}
