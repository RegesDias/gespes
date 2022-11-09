$(document).ready(function(){
  

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d    = date.getDate(),
        m    = date.getMonth(),
        y    = date.getFullYear()

    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendar.Draggable;

    var containerEl = $('#external-events')[0];
    var checkbox = $('#drop-remove')[0];
    var calendarEl = $('#calendar')[0];

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
      itemSelector: '.external-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
          borderColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
          textColor: window.getComputedStyle( eventEl ,null).getPropertyValue('color'),
        };
      }
    });

  function getAgendamentoMensal(date) {
      $('#carregando').show();
      if(date == '') {
        date = dataPrimeiroDiaDoMes('us','-');
      }
      $.ajax({
          url: 'acoes/agenda/buscaMes.php?date='+date,
          method: 'GET',
          dataType: 'json'
      }).done(function(result){
          for (var i = 0; i < result.length; i++) {
            calendar.addEvent(
              result[i]
            );
          }
          msn('success','Agenda Carregada com sucesso!');
      }).fail(function() {
         // $(location).attr('href', 'index.html');
      }).always(function() {
          $('#carregando').hide();
      });
  };
  getAgendamentoMensal(dataPrimeiroDiaDoMes('us','-'));

    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left  : 'prev,next today',
        center: 'title',
        right : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      themeSystem: 'bootstrap',
      locales: 'l57',
      //eventLimit: true,
      editable  : true,
      droppable : true, // this allows things to be dropped onto the calendar !!!
      drop      : function(info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox.checked) {
          // if so, remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
      eventReceive: function(event) {
        //console.log(event.event);
        console.log('id '+event.event.id);
        console.log('allDay '+event.event.allDay);
        console.log('backgroundColor '+event.event.backgroundColor);
        console.log('borderColor '+event.event.borderColor);
        console.log('endStr '+event.event.endStr);
        console.log('startStr '+event.event.startStr);
        console.log('title '+ event.event.title);
      },
      eventDrop:function(event) {
        console.log('id '+event.event.id);
        console.log('allDay '+event.event.allDay);
        console.log('backgroundColor '+event.event.backgroundColor);
        console.log('borderColor '+event.event.borderColor);
        console.log('endStr '+event.event.endStr);
        console.log('startStr '+event.event.startStr);
        console.log('title '+ event.event.title);
      },
      eventResize:function(event) {
        console.log('id '+event.event.id);
        console.log('allDay '+event.event.allDay);
        console.log('backgroundColor '+event.event.backgroundColor);
        console.log('borderColor '+event.event.borderColor);
        console.log('endStr '+event.event.endStr);
        console.log('startStr '+event.event.startStr);
        console.log('title '+ event.event.title);
      },
      eventClick:  function(event) {
        $('#divStart').attr('class', 'col-5');
        $('#divEnd').attr('class', 'col-5');
        $('#title').val(event.event.title);
        $('#start').attr('type', 'datetime-local');
        $('#start').val(conversaoDataString(event.event.startStr));
        $('#end').val(conversaoDataString(event.event.endStr));
        $('#color').val(event.event.backgroundColor);
        $('#allDay').prop('checked', event.event.allDay);
        if(event.event.allDay == true){
          $('#start').attr('type', 'date');
          $('#start').val(event.event.startStr);
          $('#divStart').attr('class', 'col-10');
          $('#divEnd').attr('class', 'd-none');
        }
        $('#calendarModal').modal();
      },
      dateClick:function(event) {

        $(this).css('background-color', 'red');
    
      }
    });
    calendar.render();
  });
  var currColor = '#3c8dbc' //Red by default
  $('#color-chooser > li > a').click(function (e) {
    e.preventDefault()
    // Save color
    currColor = $(this).css('color')
    // Add color effect to button
    $('#add-new-event').css({
      'background-color': currColor,
      'border-color'    : currColor
    })
  })

  function ini_events(ele) {
      ele.each(function () {
      // create an Event Object (https://fullcalendar.io/docs/event-object)
      // it doesn't need to have a start or end
      var eventObject = {
        title: $.trim($(this).text()) // use the element's text as the event title
      }

      // store the Event Object in the DOM element so we can get to it later
      $(this).data('eventObject', eventObject)

      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex        : 1070,
        revert        : true, // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      })
    })
  }

  ini_events($('#external-events div.external-event'));
  $('#add-new-event').click(function (e) {
    e.preventDefault()
    // Get value and make sure it is not null
    var val = $('#new-event').val()
    if (val.length == 0) {
      return
    }
    // Create events
    var event = $('<div />')
    event.css({
      'background-color': currColor,
      'border-color'    : currColor,
      'color'           : '#fff'
    }).addClass('external-event')
    event.text(val)
    $('#external-events').prepend(event)

    // Add draggable funtionality
    ini_events(event)

    // Remove event from text input
    $('#new-event').val('')
  });
