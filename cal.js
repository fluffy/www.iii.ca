


$(document).ready(function() {


    $( "#accordion" ).accordion();


   var $calendar = $('#calendar');
   var id = 10;

   $calendar.weekCalendar({
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
       dateFormat: "z",
       useShortDayNames: false,
      firstDayOfWeek : 7,
       buttons : false,
      businessHours :{start: 9, end: 21, limitDisplay: true },
      daysToShow : 7,
      height : function($calendar) {
         return $(window).height() - $("h1").outerHeight() - 1;
      },
      eventRender : function(calEvent, $event) {
      },
      draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {
      },
      eventDrop : function(calEvent, $event) {
      },
      eventResize : function(calEvent, $event) {
      },
      eventClick : function(calEvent, $event) {
       $( "#accordion" ).accordion( "activate" , calEvent.classNum-1 )
      },
      eventMouseover : function(calEvent, $event) {
       },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {
         callback(getEventData());
      }
   });

   function resetForm($dialogContent) {
      $dialogContent.find("input").val("");
      $dialogContent.find("textarea").val("");
   }

   function getEventData() {
       var date = new Date();
       var year = date.getFullYear();
       var month =date.getMonth();
       var day = date.getDate() - date.getDay(); // make the start of week

      return {
         events : [
            {
               "id":1,
               "start": new Date(year, month, day, 12),
               "end": new Date(year, month, day, 13, 30),
                "title":"3/4 Funk",
                "classNum":1
            },
            {
               "id":2,
               "start": new Date(year, month, day, 14),
               "end": new Date(year, month, day, 14, 45),
                "title":"Hip-hop Intro",
                "body":"yada yada",
                "classNum":2
            },
            {
               "id":3,
               "start": new Date(year, month, day + 1, 17),
               "end": new Date(year, month, day + 1, 17, 45),
               "title":"Power Moves",
                "classNum":3
            },
            {
               "id":4,
                "start": new Date(year, month, day + 2, 9, 30),
               "end": new Date(year, month, day +2, 10, 30),
               "title":"Locking",
                "classNum":4
            },
            {
               "id":5,
               "start": new Date(year, month, day + 1, 14),
               "end": new Date(year, month, day + 1, 15),
               "title":"Popping",
                "classNum":5
            },
            {
               "id":6,
               "start": new Date(year, month, day, 10),
               "end": new Date(year, month, day, 11),
               "title":"Breaking",
                readOnly : true,
                "classNum":6
            },

            {
               "id":7,
               "start": new Date(year, month, day+3, 12),
               "end": new Date(year, month, day+3, 13, 30),
                "title":"3/4 Funk",
                "classNum":1
            },
            {
               "id":8,
               "start": new Date(year, month, day+4, 11),
               "end": new Date(year, month, day+4, 11, 45),
                "title":"Hip-hop Intro",
                "body":"yada yada",
                "classNum":2
            },
            {
               "id":9,
               "start": new Date(year, month, day + 5, 17),
               "end": new Date(year, month, day + 5, 17, 45),
               "title":"Power Moves",
                "classNum":3
            },
            {
               "id":10,
                "start": new Date(year, month, day + 6, 9,30),
               "end": new Date(year, month, day +6, 10, 30),
               "title":"Locking",
                "classNum":4
            },
            {
               "id":11,
               "start": new Date(year, month, day + 4, 14),
               "end": new Date(year, month, day + 4, 15),
               "title":"Popping",
                "classNum":5
            },
            {
               "id":12,
               "start": new Date(year, month, day+5, 10),
               "end": new Date(year, month, day+5, 11),
               "title":"Breaking",
                readOnly : true,
                "classNum":6
            }

         ]
      };
   }


   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

      for (var i = 0; i < timeslotTimes.length; i++) {
         var startTime = timeslotTimes[i].start;
         var endTime = timeslotTimes[i].end;
         var startSelected = "";
         if (startTime.getTime() === calEvent.start.getTime()) {
            startSelected = "selected=\"selected\"";
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }
         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

      }
      $endTimeOptions = $endTimeField.find("option");
      $startTimeField.trigger("change");
   }

   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");

   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
      var startTime = $(this).find(":selected").val();
      var currentEndTime = $endTimeField.find("option:selected").val();
      $endTimeField.html(
            $endTimeOptions.filter(function() {
               return startTime < $(this).val();
            })
            );

      var endTimeSelected = false;
      $endTimeField.find("option").each(function() {
         if ($(this).val() === currentEndTime) {
            $(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         $endTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });


   var $about = $("#about");

   $("#about_button").click(function() {
      $about.dialog({
         title: "About this calendar demo",
         width: 600,
         close: function() {
            $about.dialog("destroy");
            $about.hide();
         },
         buttons: {
            close : function() {
               $about.dialog("close");
            }
         }
      }).show();
   });


});
