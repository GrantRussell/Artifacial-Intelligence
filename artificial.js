// Imports the Google Cloud client library


var masterFunction = (fileName, urlFunction) => {
const Vision = require('@google-cloud/vision');
// Creates a client

const vision = new Vision();

const fs = require('fs');

const replaceExt = require('replace-ext');

const { Pool, Client } = require('pg')

var url;

const pool = new Pool({
  user: 'aojaxubs',
  host: 'elmer.db.elephantsql.com',
  database: 'aojaxubs',
  password: 'mYFZD9-Nr7QqLiU4lQ-qUTzoS5yux64U',
  port: 5432,
})

const client = new Client({
  user: 'aojaxubs',
  host: 'elmer.db.elephantsql.com',
  database: 'aojaxubs',
  password: 'mYFZD9-Nr7QqLiU4lQ-qUTzoS5yux64U',
  port: 5432,
})

 class Emotion{
   constructor(likeliness){
     this.likeliness = likeliness;
   }
   getQuery(){
     //
   }
   modifyLikeliness(num){
     this.likeliness = this.likeliness + num;
   }
 }

 class Happy extends Emotion{
   getQuery(){
     return "select * from media m join emotion e on m.emotion_id = e.emotion_id where e.emotion = 'happy'";
   }
   getTitle(){
     return " happy as (";
   }
 }

 class Sad extends Emotion{
   getQuery(){
     return "select * from media m join emotion e on m.emotion_id = e.emotion_id where e.emotion = 'sad'";
   }
   getTitle(){
     return " sad as (";
   }
 }

 class Surprised extends Emotion{
   getQuery(){
     return "select * from media m join emotion e on m.emotion_id = e.emotion_id where e.emotion = 'surprised'";
   }
   getTitle(){
     return " surprised as (";
   }
 }

 class Angry extends Emotion{
   getQuery(){
     return "select * from media m join emotion e on m.emotion_id = e.emotion_id where e.emotion = 'angry'";
   }
   getTitle(){
     return " angry as ("
   }
 }

 function convertLikelinessToInt(likeliness){
   if(likeliness === "VERY_LIKELY"){
     return 4;
   }
   else if(likeliness === "LIKELY"){
     return 3;
   }
   else if(likeliness === "UNLIKELY"){
     return 2;
   }
   else if(likeliness === "VERY_UNLIKELY"){
     return 1;
   }
 }

var happy = new Happy(0);
var sad = new Sad(0);
var angry = new Angry(0);
var surprised = new Surprised(0);
var numFaces = 0;
var emotions = [happy, sad, angry, surprised];

vision.faceDetection({ source: { filename: fileName } })
  .then((results) => {
    const faces = results[0].faceAnnotations;

    faces.forEach((face, i) => {
      happy.modifyLikeliness(convertLikelinessToInt(face.joyLikelihood));
      sad.modifyLikeliness(convertLikelinessToInt(face.sorrowLikelihood));
      surprised.modifyLikeliness(convertLikelinessToInt(face.surpriseLikelihood));
      angry.modifyLikeliness(convertLikelinessToInt(face.angerLikelihood));
      numFaces+=1;
    });
    //console.log(happy.likeliness);
    //console.log(sad.likeliness);
    //console.log(angry.likeliness);
    //console.log(surprised.likeliness);
    var myQuery = "WITH";
    emotions.forEach((emotion) => {
        myQuery = myQuery.concat(emotion.getTitle());
        myQuery = myQuery.concat(emotion.getQuery());
        if(emotion.likeliness < 3){
          myQuery = myQuery.concat(" AND m.media_id = -1");
        }
        myQuery = myQuery.concat("), ");
    });
    myQuery = myQuery.concat("emotion_media as (select * from happy union all select * from surprised union all select * from angry union all select * from sad) select * from emotion_media order by random() limit 1;");
    //console.log(myQuery);
    client.connect()
      client.query(myQuery, (err, res) => {
        if(!err){
          url = res.rows[0].url;
          urlFunction(url);
        }
        else{
          console.log("Error in retrieving URL.");
        }
        //console.log(url);
        client.end();
      })

    // console.log('Faces:');
    // faces.forEach((face, i) => {
    //   console.log(`  Face #${i + 1}:`);
    //   console.log(`    Joy: ${face.joyLikelihood}`);
    //   console.log(`    Anger: ${face.angerLikelihood}`);
    //   console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    //   console.log(`    Surprise: ${face.surpriseLikelihood}`);
    // });

    var myFunction = function(){
      console.log("Test module");
    };

  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
}
  module.exports = {
    masterFunction
};
