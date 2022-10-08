

//function declaration
function createTimerow(time, eventName, index) {
  // save button fm html <a class="fa fa-save" style="color: black" href="/"></a>
  var timerow = $("<tr id='timerow-"+index+"'>") // element
  var saveButton = $("<div id='am1'>")
  var saveButtonLink = $(" <a class='fa fa-save' style='color: black' href='#'></a>")
  var timediv = $("<div id='am2'>")
  var eventNameDiv = $("<div id='am3'>")
   if (index > 3 ) {
    eventNameDiv.addClass("evening " )
   }
   if (index < 3 ) {
    eventNameDiv.addClass("morning")
   }
   eventNameDiv.on("click", function() {
     // call back
    var textInput = $("<input type='text' id='event-"+index+"'/>")
    textInput.attr("value", eventName)
     $(this).text("")
    $(this).append(textInput)

   }) 
   saveButtonLink.on("click", function() {
     let eventData = localStorage.getItem("eventData")
     eventData = JSON.parse(eventData)
     // reassign
     const eventTextInput = $("#event-"+index)
     eventData[time] = eventTextInput.val()
     // restingy - save to LS
     localStorage.setItem("eventData", JSON.stringify(eventData))
     window.location.reload() 
   })

   saveButton.append(saveButtonLink)
   
   timerow.addClass("timerow")
   saveButton.addClass("save-button")
   timediv.addClass("time")
   eventNameDiv.addClass("event-name")
   // add text to an element
   timediv.text(time)
   eventNameDiv.text(eventName)
   timerow.append(saveButton)
   timerow.append(timediv)
   timerow.append(eventNameDiv)

   return timerow;
}


$(document).ready(function() {

  let eventData = localStorage.getItem("eventData")
  if(!eventData ) {
    var defaulteventData = {
      "9:00am": "morning",
      "10:00am": "morning", 
      "11:00am": "morning",
      "12:00pm": "afternoon",
      "1:00pm": "evening",
      "2:00pm": "evening",
      "3:00pm": "evening",
      "4:00pm": "evening",
      "5:00pm": "evening",
    }
    localStorage.setItem("eventData", JSON.stringify(defaulteventData) )
    eventData =defaulteventData
  }else{
   eventData = JSON.parse(eventData) // convert to an object
  }
  var timetable = $("#timetable")  
  let i = 0 
  // Loop
   for (let time of Object.keys(eventData)) {
     const timerow =createTimerow(time, eventData[time], i )
     timetable.append(timerow)
     i += 1 
  }


});


