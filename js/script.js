$(document).ready(function(){

  var isRandom = false;
  var isGradual = false;
  var borderToggle= false;
  var howMany = 16;
  makeGrid(howMany);
  draw();

    /*================Buttons==================*/
  
  //New Grid Button
  $('#new').click(function(){
    howMany = prompt("How many squares per side?");
    if(howMany>= 1 && howMany<=100){
      $('#grid').empty();
      makeGrid(howMany);
      draw();
    }
    else{
      alert("Square number must be from 1-100");
  }
  });
  
    //Clear Button
  $('#clear').click(function(){
      $('.block').each(function(){
        $(this).removeClass('draw');
        $(this).css('background-color', 'white');
        $(this).css('opacity', 1.0);
    })
  });
  
  
  /*Border-Toggle.  This code was unfortunately made before I knew about the 'outline'property*/
  $('#border').click(function(){
    var findBlockSize = findSizes(howMany);
    var originalValue = findBlockSize;
    var blockSize = findBlockSize[0];
    borderToggle = !borderToggle;
    if(borderToggle){
      $('.block').width(blockSize-2);
      $('.block').height(blockSize-2);
      $('.block').css('border-style', 'solid');

    }
    else{
      $('.block').css('border-style', 'none');
      $('.block').width(blockSize);
      $('.block').height(blockSize);
    }
  });
  
  //Color Radio Button  
  $('#color').click(function(){
       isRandom = true;
       isGradual = false;
  });
  
  //Default Radio Button
  $('#default').click(function(){
       isRandom = false;
       isGradual = false;
  });
  
  //Gradual Radio Button
  $('#gradual').click(function(){
    isRandom = false;
    isGradual=true;
  });

  /*=================Drawing Related Functions==============*/
  //Calculate Square Sizes
  function findSizes(x){
    var gridWidth = 600;
    var sLength = gridWidth/x;
    var totalSquares = x*x;
    var sLength = gridWidth/x;
    return [sLength, totalSquares];
  }

  function makeGrid(x){
    var sizes = findSizes(x);
    var totalSquares = sizes[1];
    var sLength = sizes[0];
    var addText="";
    for(var i=0; i<totalSquares; i++) {
       addText+="<div class='block'></div>";
       if((i+1)%x===0){
        addText+="<div class='clear'></div>";
       }
      }
    $('#grid').append(addText);
    $('div.block').width(sLength);
    $('div.block').height(sLength);
  }

/*SKetch Effects Functions*/
  //Get Random Color
  function getRandomColor(){
    var red = (Math.floor(Math.random()*256));
    var green = (Math.floor(Math.random()*256));
    var blue = (Math.floor(Math.random()*256));
    var rgb = 'rgb('+ red + ',' + green + ',' + blue+')';
    return rgb;
  }
  
  //Draw Squares
  function draw(){
    $('.block').hover(
      function(){
       if(isRandom){
          $(this).css('background-color', getRandomColor());
          $(this).css('opacity', '1.0');
       }
       else if(isGradual){
          $(this).css('opacity', $(this).css('opacity')*0.90);
        
       }
       else{
        $(this).css('background-color', 'black');
        $(this).css('opacity', '1.0');
       }
      }//closes hover parameter 1 function
    );//closes hover
  }//closes draw function
});//Closes ready