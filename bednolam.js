ston = function(str, zeroBased)
{
  var array = [];
  var lowerCase = str.toLowerCase();
  for (var i = 0; i < lowerCase.length; i++)
  {
    var fromA = lowerCase.charCodeAt(i) - 97;
    if (fromA >= 26 || fromA < 0)
    {
      array.push(undefined);
    }
    else
    {
      array.push( fromA + (zeroBased ? 0 : 1));
    }
  }
  return array;
}

ntos = function(array, zeroBased)
{
  return array.map(function(number)
  {
    if (number === undefined)
    {
      return "?";
    }
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
    if (array1[i] === undefined || array2[i % array2.length] === undefined)
    {
      array.push(undefined);
    }
    else
    {
      array.push(array1[i] + array2[i % array2.length]);
    }
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
    if (array1[i] === undefined || array2[i % array2.length] === undefined)
    {
      array.push(undefined);
    }
    else
    {
      array.push(array1[i] - array2[i % array2.length]);
    }
  }
  return ntos(array);
}

freqa = function(str)
{
  freqs = {};
  for (var i = 0; i < str.length; i++)
  {
    if (freqs[str.charAt(i)])
    {
      freqs[str.charAt(i)]++;
    }
    else
    {
      freqs[str.charAt(i)] = 1;
    }
  }
  sortedFreqs = {};
  Object.getOwnPropertyNames(freqs).sort().forEach(function(key)
  {
    sortedFreqs[key] = freqs[key];
  });

  return sortedFreqs;
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
    if (window.localStorage && window.JSON) localStorage.setItem('strings', JSON.stringify(strings));
  }
}

variables = {};

saveVariable = function(variable, value)
{
  if (window[variable] === undefined)
  {
    window[variable] = value;
  }
  // window[variable] = value;
  variables[variable] = value;
  if (window.localStorage && window.JSON) localStorage.setItem('variables', JSON.stringify(variables));
}

expressions = [];

saveExpression = function(expression)
{
  expressions.push(expression);
  if (window.localStorage && window.JSON) localStorage.setItem('expressions', JSON.stringify(expressions));
}

evaluate = function(expression)
{
  var assignmentMatch = /^(\w+)\s*[\+\-\/\*]?\s*=(.*)$/;
  var variable = null;
  var m = expression.match(assignmentMatch);
  if (m)
  {
    variable = m[1];
    eval(expression);
    if (eval("typeof " + variable) != "function")
    {
      saveVariable(variable, ans);
    }
    ans = window[variable];
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
  if ($.isArray(value))
  {
    return "Array [" + value + "]";
  }
  else if (typeof value == "object")
  {
    str = "[Object]\n";
    for (key in value )
    {
      str += "  + " + key + ": " + renderValue(value[key]) + "\n";
    }
    return str;
  }
  else
  {
    return value;
  }
}

loadFromStorage = function()
{
  if (window.localStorage && window.JSON)
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
}

$(function()
{
  var $jsForm = $("#js-form");

  $(".js-input").bind("swipeleft", function()
  {
    $(this).siblings().val($(this).text());
    $(this).siblings().text($(this).val());
    $(this).siblings().show();
    $(this).hide();
  });

  $jsForm.submit(function()
  {
    var $jsInput = $jsForm.find(".js-input:visible");
    try
    {
      var expression = $jsInput.val();
      if (!expression) expression = $jsInput.text();
      var response = evaluate(expression);

      var $response = $("<div class='js-response'>");
      var $responseInput = $("<pre class='js-in'></div>");
      $responseInput.append($jsInput.val()).appendTo($response);
      var $responseOutput = $("<pre class='js-out'>");
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
      $jsInput.parent().children().val("").text("");
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
    saveVariable("caesar", caesar);

    saveString(text1);
    saveString(text2);
    saveString(caesar);
  });

  $("#caesar-minus").click(function() {
    var text1 = $("#caesar-text1").val();
    var text2 = $("#caesar-text2").val();
    caesar = ssub(text1, text2);
    $("#caesar-result").text(caesar);
    saveVariable("caesar", caesar);

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

  var refreshJsHistoryPage = function()
  {
    $content = $("#js-history .ui-content");
    $content.text("");
    expressions.forEach(function(e) {
      $e = $("<div class='string'>");
      $e.text(e);
      $content.append($e);
    })
  }

  $("#js-clear-page").click(function() {
    $("#js-responses").empty();
  });

  $("#js-clear-all").click(function(){
    clearData();
    $("#js-responses").empty();
  });

  $(".string-input").bind("swiperight dblclick", function() {
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

  $(".js-input").bind("swiperight dblclick", function() {
    var $this = $(this);
    $.mobile.changePage("#js-history", {role: "dialog"});
    refreshJsHistoryPage();
    $("#js-history .string").click(function()
    {
      $this.val($(this).text());
      $('.ui-dialog').dialog('close');
    });
    $("#js-history").trigger("create");
  });

  $("#freq-button").click(function() {
    var $table = $("#freq-result");
    $table.empty();
    var text = $("#freq-text").val();
    var fr = freqa(text);
    for (var index in fr)
    {
      $tr = $("<tr>");
      $tr.append( $("<td>" + index + "</td>"));
      $tr.append( $("<td>" + fr[index] + "</td>"));
      $table.append($tr);
    }
    saveVariable("freq", fr);
    saveString(text);
  });

  loadFromStorage();
});