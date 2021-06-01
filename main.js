var prediction1="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="final" src="'+data_uri+'"/>';
    });
}
  console.log(ml5.version);
  var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IGZvUeqAX/model.json",loaded);
  function loaded(){
      console.log("model has been loaded")
  }
  function speak(){
    var synph=window.speechSynthesis;
    var speak="The Prediction Is"+prediction1;
    var utterthis=new SpeechSynthesisUtterance(speak);
    synph.speak(utterthis);
    }
    function check(){
     var store=document.getElementById("final");
     classifier.classify(store, gotresult);
    }
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_hand_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if(results[0].label=="Thumbs down"){
            document.getElementById("update_hand").innerHTML="&#128076;";
        }
        if(results[0].label=="Peace"){
          document.getElementById("update_hand").innerHTML="&#128077;";
      }
      if(results[0].label=="Amazing"){
          document.getElementById("update_hand").innerHTML="&#128078;";
      }
    }
 
}