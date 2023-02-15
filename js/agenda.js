$(document).ready(function () {
  carregarSelect2();
  getUsuarios();
});
$("#formFiltroSelectUsuario").change(function () {
  /* initialize the calendar-----------------------------------------------------------------*/
  //Date for the calendar events (dummy data)
  var date = new Date();
  var d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();

  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendar.Draggable;

  var containerEl = $("#external-events")[0];
  var checkbox = $("#drop-remove")[0];
  var calendarEl = $("#calendar")[0];

  // initialize the external events
  // -----------------------------------------------------------------

  new Draggable(containerEl, {
    itemSelector: ".external-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        backgroundColor: window
          .getComputedStyle(eventEl, null)
          .getPropertyValue("background-color"),
        borderColor: window
          .getComputedStyle(eventEl, null)
          .getPropertyValue("background-color"),
        textColor: window
          .getComputedStyle(eventEl, null)
          .getPropertyValue("color"),
      };
    },
  });
    var calendar = new Calendar(calendarEl, {
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      themeSystem: "bootstrap",
      locales: "l57",
      //eventLimit: true,
      editable: true,
      navLinks: true,
      forceEventDuration: true,
      defaultTimedEventDuration: "01:00",
      droppable: true, // this allows things to be dropped onto the calendar !!!
      drop: function (info) {
        if (checkbox.checked) {
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
      },
      events: function (info, successCallback) {
        let usuario = $("#formFiltroSelectUsuario").val();
        startStr = conversaoDataString(info.startStr);
        endStr = conversaoDataString(info.endStr);
        var str = new Object();
        str.start = startStr;
        str.end = endStr;
        str.usuario = usuario;
        successCallback(getAgendamentoMensal(str));
      },
      eventReceive: function (event) {
        let usuario = $("#formFiltroSelectUsuario").val();
        var dado = {
          id: event.event.id,
          allDay: event.event.allDay,
          backgroundColor: event.event.backgroundColor,
          borderColor: event.event.borderColor,
          end: event.event.endStr,
          start: event.event.startStr,
          title: event.event.title,
          usuario: usuario,
        };
        insereEvento(dado, event.event);
      },
      eventDrop: function (event) {
        Swal.fire({
          title: 'Você tem certeza?',
          text: "Todos os Agendamento deste evento serão trocados!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim'
        }).then((result) => {
          if (result.value) {
            Swal.fire( 'Reagendado!','O Evento foi alterado com sucesso.','success');
            let usuario = $("#formFiltroSelectUsuario").val();
            let periodo = $("#periodo").val();
            let numeroAtendimentos = $("#numeroAtendimentos").val();
            var dado = {
              id: event.event.id,
              allDay: event.event.allDay,
              backgroundColor: event.event.backgroundColor,
              borderColor: event.event.borderColor,
              end: event.event.endStr,
              start: event.event.startStr,
              title: event.event.title,
              usuario: usuario,
              periodo: periodo,
              numeroAtendimentos: numeroAtendimentos
            };
            redefinirEvento(dado);
          }else{
            Swal.fire( 'Acão Cancelada!','O Evento não foi alterado.','error');
            event.revert();
          }
        })
      },
      eventResize: function (event) {
        let usuario = $("#formFiltroSelectUsuario").val();
        let periodo = $("#periodo").val();
        let numeroAtendimentos = $("#numeroAtendimentos").val();
        var dado = {
          id: event.event.id,
          allDay: event.event.allDay,
          backgroundColor: event.event.backgroundColor,
          borderColor: event.event.borderColor,
          end: event.event.endStr,
          start: event.event.startStr,
          title: event.event.title,
          usuario: usuario,
          periodo: periodo,
          numeroAtendimentos: numeroAtendimentos
        };
        redefinirEvento(dado);
      },
      eventClick: function (event) {
        allDayFormChange(event.event);
        $("#divStart").attr("class", "col-5");
        $("#divEnd").attr("class", "col-5");
        $("#title").val(event.event.title);
        $("#color").val(rgb2hex(event.event.backgroundColor));
        $("#allDay").prop("checked", event.event.allDay);
        $("#idEvento").val(event.event.id);
        buscaEventoId(event.event.id);
        $("#calendarModal").modal();
      },
    });
    calendar.render();
    $("#RemoverEvento").click(function () {
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Não será possivel reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
          Swal.fire( 'Reagendado!','O Evento foi alterado com sucesso.','success');
          id = $("#idEvento").val();
          var event = calendar.getEventById(id);
          event.remove(id);
          removerEvento(id);
          $("#calendarModal").modal("hide");
          redefinirEvento(dado);
        }else{
          Swal.fire( 'Acão Cancelada!','O Evento não foi alterado.','error');
          event.revert();
        }
      })
    });
    $("#alterarEvento").click(function () {
      var novosDados = new Object();
      novosDados.id = $("#idEvento").val();
      novosDados.start = $("#start").val();
      novosDados.end = $("#end").val();
      novosDados.allDay = $("#allDay").is(":checked");
      novosDados.title = $("#title").val();
      var x = document.getElementById("color");
      var currentVal = x.value;
      novosDados.color = hex2rgb(currentVal);
      novosDados.usuario = $("#formFiltroSelectUsuario").val();
      novosDados.periodo = $("#periodo").val();
      novosDados.numeroAtendimentos = $("#numeroAtendimentos").val();

      var event = calendar.getEventById(novosDados.id);
      event.setStart(novosDados.start);
      event.setEnd(novosDados.end);
      event.setProp("title", novosDados.title);
      event.setProp("color", novosDados.color);

      msn("success", "Evento alterado com sucesso!");

      atualizaEvento(novosDados);
      $("#calendarModal").modal("hide");
    });
    $("#allDay").change(function () {
      var id = $("#idEvento").val();
      var allDay = $("#allDay").is(":checked");
      var event = calendar.getEventById(id);
      event.setAllDay(allDay);
      allDayFormChange(event);
    });
  });

function getAgendamentoMensal(dado) {
  eventos = [];
  $.ajax({
    url: "acoes/agenda/buscaMesStartEnd.php",
    method: "POST",
    dataType: "json",
    async: false,
    data: dado,
  })
    .done(function (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].allDay == 0) {
          result[i].allDay = null;
        }
        eventos.push(result[i]);
      }
      msn("success", "Agenda Carregada com sucesso!");
    })
    .fail(function () {
      // $(location).attr('href', 'index.html');
    })
    .always(function () {
      $("#carregando").hide();
    });
  return eventos;
}
function removerEvento(id) {
  $.ajax({
    url: "acoes/agenda/removerEvento.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#calendarModal").modal("hide");
    })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
}
function atualizaEvento(dado) {
  $.ajax({
    url: "acoes/agenda/atualizaEvento.php",
    method: "POST",
    data: dado,
    dataType: "json",
  })
    .done(function (result) { })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
}
function allDayFormChange(event) {
  if (event.allDay == true) {
    $("#start").attr("type", "date");
    $("#end").attr("type", "date");
    $("#start").val(event.startStr);
    $("#end").val(event.endStr);
    $("#agendamento").removeClass("d-none");
  } else {
    $("#start").attr("type", "datetime-local");
    $("#end").attr("type", "datetime-local");
    $("#start").val(conversaoDataString(event.startStr));
    $("#end").val(conversaoDataString(event.endStr));
    $("#agendamento").addClass("d-none");
  }
}
var currColor = "#3c8dbc"; //Red by default
$("#color-chooser > li > a").click(function (e) {
  e.preventDefault();
  // Save color
  currColor = $(this).css("color");
  // Add color effect to button
  $("#add-new-event").css({
    "background-color": currColor,
    "border-color": currColor,
  });
});
function insereEvento(dado, event) {
  $.ajax({
    url: "acoes/agenda/insereEvento.php",
    method: "POST",
    data: dado,
    dataType: "json",
  })
    .done(function (result) {
      event.setProp("id", result.id);
    })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      //setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
}
function redefinirEvento(dado) {
  $.ajax({
    url: "acoes/agenda/redefinirEvento.php",
    method: "POST",
    data: dado,
    dataType: "json",
  })
    .done(function (result) { })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
}
function alterarEvento(dado) {
  $.ajax({
    url: "acoes/agenda/redefinirEvento.php",
    method: "POST",
    data: dado,
    dataType: "json",
  })
    .done(function (result) { })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
}
function buscaEventoId(id) {
  $.ajax({
    url: "acoes/agenda/buscaEventoId.php?id=" + id,
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      $("#numeroAtendimentos").val(result[0].numeroAtendimentos);
      $("#periodo").val(result[0].periodo);
    })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      // setTimeout(() => {  window.location.href = "index.html" }, 1000);
    });
}
function getUsuarios() {
  $.ajax({
    url: "acoes/usuario/listarNomeAtendimento.php",
    method: "GET",
    dataType: "json",
  })
    .done(function (result) {
      if (result.codigo == 0) {
        msn("error", result.mensagem);
      } else {
        preenchimentoSelectUsuario(result);
        //$("#formFiltroSelectUsuario").val(user);
      }
    })
    .fail(function () {
      msn("error", "Sua sessão expirou");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    })
    .always(function () {
      $("#carregando").hide();
    });
}
function preenchimentoSelectUsuario(result) {
  $("#encaminharResponsavel").empty();
  $("#formFiltroSelectUsuario").prepend("<option></option>");

  for (var i = 0; i < result.length; i++) {
    $("#formFiltroSelectUsuario").prepend(
      "<option value=" + result[i].CPF + "> " + result[i].nome + "</option>"
    );
  }
}
function ini_events(ele) {
  ele.each(function () {
    // create an Event Object (https://fullcalendar.io/docs/event-object)
    // it doesn't need to have a start or end
    var eventObject = {
      title: $.trim($(this).text()), // use the element's text as the event title
    };

    // store the Event Object in the DOM element so we can get to it later
    $(this).data("eventObject", eventObject);

    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 1070,
      revert: true, // will cause the event to go back to its
      revertDuration: 0, //  original position after the drag
    });
  });
}

ini_events($("#external-events div.external-event"));
$("#add-new-event").click(function (e) {
  e.preventDefault();
  // Get value and make sure it is not null
  var val = $("#new-event").val();
  if (val.length == 0) {
    return;
  }
  // Create events
  var event = $("<div />");
  event
    .css({
      "background-color": currColor,
      "border-color": currColor,
      color: "#fff",
    })
    .addClass("external-event");
  event.text(val);
  $("#external-events").prepend(event);

  // Add draggable funtionality
  ini_events(event);

  // Remove event from text input
  $("#new-event").val("");
});