$(document).ready(function() {
  let btnMain = [
    "Wes Anderson",
    "Futurama",
    "Mr. Show",
    "Brooklyn 99",
    "Arrested Development"
  ];


  function displayGifs() {
    var button = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=y7uPzri5c7WZvTF0xZxARsWQDOaUFP0g&rating=pg&limit=10";
    
    console.log("queryURL: ", queryURL);

    $.get(queryURL).then(function (response) {
      let buttonResults = response.data;
      console.log("Button Results: ", buttonResults)

      for (var i = 0; i < buttonResults.length; i++) {
        // variables to store data of still and moving gifs
        let gifStill = buttonResults[i].images.fixed_height_small_still.url;
        let gifMoving = buttonResults[i].images.fixed_height_small.url;

        // create div to hold the gifs
        let gifDiv = $("<div>").addClass("gif-holder");

        // create img variable
        let gif = $("<img>");
        gif.attr("src", gifStill);
        gif.attr("gif-still", gifStill); // sets the gif data to be still
        gif.attr("state", "still"); // adds attribute state of still
        gif.attr("gif-animated", gifMoving); // sets the gif data to become animated
        gif.addClass("gif");

        // create variable to store fetched rating of gif
        let rating = buttonResults[i].rating;
        let printedRating = $("<p>").text("Rating: " + rating);

        // // event listener for clicking of gif to animate
        $(gif).on("click", function() {
          let state = $(this).attr("state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("gif-animated"));
            $(this).attr("state", "gif-animated");
          } else if (state === "gif-animated") {
            $(this).attr("src", $(this).attr("gif-still"));
            $(this).attr("state", "still");
          }
        }); // ENDS click fn

        // Add the gif and rating to the HTML div
        gifDiv.append(gif);
        console.log("append this gif: ", gif);
        gifDiv.append(printedRating);
        $(".gif-load").prepend(gifDiv);
        
      } // ENDS for loop
    }); // ENDS done.fn(response);
  } // ENDS displayGifs()--------------------------------------------------------------END DISPLAY GIF FN-------------------------------------------------------------

  // rendering gif topic buttons
  function topicBtns() {

    $(".gif-btn-area").empty();
    //  for loop to create buttons, give class/attr/text and dynamically print to DOM
    for (let i = 0; i < btnMain.length; i++) {
      var a = $("<button>");
      $(a).addClass("btn btn-outline-info gif-btn");
      $(a).attr("data-name", btnMain[i]);
      $(a).text(btnMain[i]);
      $(".gif-btn-area").append(a);
    } // ENDS for loop
  } // ENDS topicBtns fn


  // target input field
  $("#gif-search").click(function(){
    $(this).val('');
  }); // ENDS input field click fn

  $(".add-gif").on("click", function(e){
    e.preventDefault();
    var buttonNew = $("#gif-search").val().trim();
    if(buttonNew.length === 0){
      alert("Please type search term(s) in order to add new gifs.")
      return false;
    } // ENDS if statement for empty search field
    
    btnMain.push(buttonNew); // adds new search query to button name array
    topicBtns(); // calls on function again to allow new button to be printed

  });
  topicBtns(); // prints buttons to DOM

  $(document).on("click", ".gif-btn", displayGifs); // prints topic-specific gif to DOM when related button is clicked
  
}); // ENDS doc ready
