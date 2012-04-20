ston = function(str, zeroBased)
{
  var array = [];
  var lowerCase = str.toLowerCase();
  for (var i = 0; i < str.length; i++)
  {
    array.push(str.charCodeAt(i) - 97 + (zeroBased ? 0 : 1));
  }
  return array;
}

ntos = function(array, zeroBased)
{
  return array.map(function(number)
  {
    if (number < (zeroBased ? 0 : 1)) number += 26; // Modulo can give negative results
    return String.fromCharCode((number - (zeroBased ? 0 : 1)) % 26 + 97);
  }).join("");
}

sadd = function(string1, string2, zeroBased)
{
  var array1 = ston(string1, zeroBased);
  var array2 = ston(string2, zeroBased);
  var array = [];
  for (var i = 0; i < array1.length; i++)
  {
    array.push(array1[i] + array2[i % array2.length]);
  }
  return ntos(array);
}

ssub = function(string1, string2, zeroBased)
{
  var array1 = ston(string1, zeroBased);
  var array2 = ston(string2, zeroBased);
  var array = [];
  for (var i = 0; i < array1.length; i++)
  {
    array.push(array1[i] - array2[i % array2.length]);
  }
  return ntos(array);
}

strings = [];

clearData = function()
{
  strings = [];
  expressions = [];
  variables = {};
  localStorage.clear();
}

saveString = function(str)
{
  if (strings.indexOf(str) < 0)
  {
    strings.push(str);
    localStorage.setItem('strings', JSON.stringify(strings));
  }
}

variables = {};

saveVariable = function(variable, value)
{
  window[variable] = value;
  variables[variable] = value;
  /**
  if (variables.hasOwnProperty(variable))
  {
    
  }
  else
  {
    Object.defineProperty(variables, variable, { enumerable: true, "value" : value, writable: true });
  }
  **/
  localStorage.setItem('variables', JSON.stringify(variables));
}

expressions = [];

saveExpression = function(expression)
{
  expressions.push(expression);
  localStorage.setItem('expressions', JSON.stringify(expressions));
}

evaluate = function(expression)
{
  var assignmentMatch = /^(\w+)\s*[\+\-\/\*]?\s*=(.*)$/;
  var variable = null;
  var m = expression.match(assignmentMatch);
  if (m)
  {
    variable = m[1];
    ans = eval(m[2]);
    saveVariable(variable, ans);
  }
  else
  {
    ans = eval(expression);
  }
  saveExpression(expression);
  if (typeof ans == "string")
  {
    saveString(ans);
  }
  return [ ans, variable ];
}

renderValue = function(value)
{
  return value;
}

loadFromStorage = function()
{
  var ss = localStorage.getItem("strings");
  if (ss)
  {
    strings = JSON.parse(ss);
  }

  var vs = localStorage.getItem("variables");
  if (vs)
  {
    variables = JSON.parse(vs);
    $.extend(window, variables);
  }

  var es = localStorage.getItem("expressions");
  if (es)
  {
    expressions = JSON.parse(es);
  }
}

$(function()
{
  var $jsForm = $("#js-form");

  $(".js-input").live("dblclick", function()
  {
    var $this = $(this);
    var value = $(this).val();
    var $textArea = $("<textArea class='js-input'>");
    $textArea.text(value);
    $this.replaceWith($textArea);
  });

  $jsForm.submit(function()
  {
    var $jsInput = $jsForm.find("input.js-input");
    try
    {
      var expression = $jsInput.val();
      var response = evaluate(expression);

      var $response = $("<div class='js-response'>");
      var $responseInput = $("<div class='js-in'></div>");
      $responseInput.append($jsInput.val()).appendTo($response);
      var $responseOutput = $("<div class='js-out'>");
      $responseOutput.text(renderValue(response[0]));
      if (response[1])
      {
        $responseOutput.prepend("<span class='variable'>" + response[1] + " = </span>");
      }
      else
      {
        $responseOutput.prepend("&gt;&gt;&nbsp;");
      }
      $responseOutput.appendTo($response);
      $("#js-responses").append($response);
      $jsInput.remove();
      $newInput = $("<input type='text' class='js-input'/>");
      $jsForm.prepend($newInput);
      $newInput.trigger("create").focus();
    }
    catch(err)
    {
      alert("Chyba javascriptu\n" + err );
    }
    return false;
  });

  $("#caesar-plus").click(function() {
    var text1 = $("#caesar-text1").val();
    var text2 = $("#caesar-text2").val();
    caesar = sadd(text1, text2);
    $("#caesar-result").text(caesar);

    saveString(text1);
    saveString(text2);
    saveString(caesar);
  });

  $("#caesar-minus").click(function() {
    var text1 = $("#caesar-text1").val();
    var text2 = $("#caesar-text2").val();
    caesar = ssub(text1, text2);
    $("#caesar-result").text(caesar);

    saveString(text1);
    saveString(text2);
    saveString(caesar);
  });

  var refreshStringPage = function()
  {
    $content = $("#strings .ui-content");
    $content.text("");
    strings.forEach(function(s) {
      $s = $("<div class='string'>");
      $s.text(s);
      $content.append($s);
    });
  }

  $("#js-clear-page").click(function() {
    $("#js-responses").empty();
  });

  $("#js-clear-all").click(function(){
    clearData();
    $("#js-responses").empty();
  });

  $(".string-input").bind("swipe dblclick", function() {
    var $this = $(this);
    $.mobile.changePage("#strings", {role: "dialog"});
    refreshStringPage();
    $("#strings .string").click(function()
    {
      $this.val($(this).text());
      $('.ui-dialog').dialog('close');
    });
    $("#strings").trigger("create");
    
  });
  loadFromStorage();
});