$(document).ready(function () {
  loadTasks();

  $(".tdl-new").keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault();
      var inputValue = $(this).val().trim();
      if (inputValue !== "") {
        $(".tdl-content ul").append(
          "<li><label><input type='checkbox'><i></i><span>" +
            inputValue +
            "</span><a href='#'></a></label></li>"
        );
        $(this).val("");
        saveTasks();
      }
    }
  });

  $(".tdl-content").on("click", "a", function () {
    var li = $(this).parent().parent("li");
    li.addClass("remove")
      .stop()
      .delay(100)
      .slideUp("fast", function () {
        li.remove();
        saveTasks();
      });
    return false;
  });

  $(".tdl-content").on("change", "input[type='checkbox']", function () {
    saveTasks();
  });

  function saveTasks() {
    var tasks = [];
    $(".tdl-content ul li").each(function () {
      var task = {
        text: $(this).find("span").text(),
        checked: $(this).find("input[type='checkbox']").prop("checked"),
      };
      tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      var tasks = JSON.parse(storedTasks);
      $.each(tasks, function (index, task) {
        var checkedAttribute = task.checked ? "checked='checked'" : "";
        var listItem =
          "<li><label><input type='checkbox' " +
          checkedAttribute +
          "><i></i><span>" +
          task.text +
          "</span><a href='#'></a></label></li>";
        $(".tdl-content ul").append(listItem);
      });
    }
  }
});
