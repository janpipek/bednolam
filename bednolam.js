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

freqa = function(str, orderByFreq, LowCase)
{
  if (LowCase) 
  {
    str = str.toLowerCase();
  }
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
  if (orderByFreq) 
  {
    Object.getOwnPropertyNames(freqs).sort(function(key1, key2) { return freqs[key2] - freqs[key1]; }).forEach(function(key)
    {
      sortedFreqs[key] = freqs[key];
    });
  }
  else
  {
    Object.getOwnPropertyNames(freqs).sort().forEach(function(key)
    {
      sortedFreqs[key] = freqs[key];
    });    
  }

  return sortedFreqs;
}

checks2numbr = function(checks) {
  var i = 0;
  var num = 0;
  for (i = 0; i < 6; i++) {
    num  = num * 10 + checks[i];
  }
  return num;
}

getbraille = function(checks) {
  var number = checks2numbr(checks);
  switch (number) {
    case 100000 : return "A"; break;
    case 110000 : return "B"; break;
    case 100100 : return "C"; break;
    case 100110 : return "D"; break;
    case 100010 : return "E"; break;
    case 110100 : return "F"; break;
    case 110110 : return "G"; break;
    case 110010 : return "H"; break;
    case 010100 : return "I"; break;
    case 010110 : return "J"; break;
    case 101000 : return "K"; break;
    case 111000 : return "L"; break;
    case 101100 : return "M"; break;
    case 101110 : return "N"; break;
    case 101010 : return "O"; break;
    case 111100 : return "P"; break;
    case 111110 : return "Q"; break;
    case 111010 : return "R"; break;
    case 011100 : return "S"; break;
    case 011110 : return "T"; break;
    case 101001 : return "U"; break;
    case 111001 : return "V"; break;
    case 111011 : return "W"; break;
    case 101101 : return "X"; break;
    case 101111 : return "Y"; break;
    case 101011 : return "Z"; break;
    default: return "NaC";
  }
}

checks2numflg = function(checks) {
  var i = 0;
  var num = 0;
  for (i = 0; i < 8; i++) {
    if (checks[i] == true) {
      num = 10 * num + i + 1;
    }
  }
  return num;
}

getflag = function(checks) {
  var number = checks2numflg(checks);
  switch (number) {
    case 18 : return "A"; break;
    case 28 : return "B"; break;
    case 38 : return "C"; break;
    case 48 : return "D"; break;
    case 58 : return "E"; break;
    case 68 : return "F"; break;
    case 78 : return "G"; break;
    case 12 : return "H"; break;
    case 13 : return "I"; break;
    case 46 : return "J"; break;
    case 14 : return "K"; break;
    case 15 : return "L"; break;
    case 16 : return "M"; break;
    case 17 : return "N"; break;
    case 23 : return "O"; break;
    case 24 : return "P"; break;
    case 25 : return "Q"; break;
    case 26 : return "R"; break;
    case 27 : return "S"; break;
    case 34 : return "T"; break;
    case 35 : return "U"; break;
    case 47 : return "V"; break;
    case 56 : return "W"; break;
    case 57 : return "X"; break;
    case 36 : return "Y"; break;
    case 67 : return "Z"; break;
    default: return "NaC";
  }
}

AnalyzFreq = function(str, LowCase)
{
  if (LowCase) 
  {
    str = str.toLowerCase();
  }
  freqs = {};
  for (var i = 0; i < str.length; i++)
  {
    if (IsCharOrNum(str,i)) {
      if (freqs[str.charAt(i)])
      {
	freqs[str.charAt(i)]++;
      }
      else
      {
	freqs[str.charAt(i)] = 1;
      }
    }
  }
  sortedFreqs = {};
  Object.getOwnPropertyNames(freqs).sort(function(key1, key2) { return freqs[key2] - freqs[key1]; }).forEach(function(key)
  {
    sortedFreqs[key] = freqs[key];
  });
  return sortedFreqs;
}

IsCharOrNum = function(str, j) {
    var result = false;
    if (47 < str.charCodeAt(j) && str.charCodeAt(j) < 58) {
      result = true;
    } else if (64 < str.charCodeAt(j) && str.charCodeAt(j) < 91) {
      result = true;
    } else if (96 < str.charCodeAt(j) && str.charCodeAt(j) < 123) {
      result = true;
    }  
    return result;
}

IsChar = function(str, j) {
    var result = false;
    if (64 < str.charCodeAt(j) && str.charCodeAt(j) < 91) {
      result = true;
    } else if (96 < str.charCodeAt(j) && str.charCodeAt(j) < 123) {
      result = true;
    }  
    return result;
}


AnalyzCharsAndNum = function(str) {
  str = str.toLowerCase();
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (IsCharOrNum(str,i)) {
      count ++;
    }
  }
  return count;
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
    ans = window[variable];
    if (eval("typeof " + variable) != "function")
    {
      saveVariable(variable, ans);
    }
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
    var byFreq = $("#freq-by-freq")[0].checked;
    var LowCase = $("#freq-low-case")[0].checked;
    var fr = freqa(text, byFreq, LowCase);
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
  
  $("#braille-trans-button").click(function() {
      var checks = new Array(6);
      checks[0] = $("#braille-trans-1")[0].checked;
      checks[1] = $("#braille-trans-2")[0].checked;
      checks[2] = $("#braille-tmášrans-3")[0].checked;
      checks[3] = $("#braille-trans-4")[0].checked;
      checks[4] = $("#braille-trans-5")[0].checked;
      checks[5] = $("#braille-trans-6")[0].checked;
      var znak = getbraille(checks);
      if (znak == "NaC") {
	$("#braille-trans-text").text("Neznámý znak");
      } else {
	$("#braille-trans-text").text(znak);
	if( $("#braille-trans-result").text() == "Tajenka") {
	    $("#braille-trans-result").empty();
	}
	$("#braille-trans-result").append(znak);
	var tajenka = $("#braille-trans-result").text();
	saveVariable("strbr", tajenka);
	saveString(tajenka);
      }
  });
  
  $("#flag-trans-button").click(function() {
      var checks = new Array(8);
      checks[0] = $("#flag-trans-1")[0].checked;
      checks[1] = $("#flag-trans-2")[0].checked;
      checks[2] = $("#flag-trans-3")[0].checked;
      checks[3] = $("#flag-trans-4")[0].checked;
      checks[4] = $("#flag-trans-5")[0].checked;
      checks[5] = $("#flag-trans-6")[0].checked;
      checks[6] = $("#flag-trans-7")[0].checked;
      checks[7] = $("#flag-trans-8")[0].checked;
      var znak = getflag(checks);
      if (znak == "NaC") {
	$("#flag-trans-text").text("Neznámý znak");
      } else {
	$("#flag-trans-text").text(znak);
	if( $("#flag-trans-result").text() == "Tajenka") {
	    $("#flag-trans-result").empty();
	}
	$("#flag-trans-result").append(znak);
	var tajenka = $("#flag-trans-result").text();
	saveVariable("strflg", tajenka);
	saveString(tajenka);
      }
  });

  $("#analyz-button").click(function() {
    var $table1 = $("#analyz-basic-result-table");
    $table1.empty();
    var $table2 = $("#analyz-freq-result-table");
    $table2.empty();
    var text = $("#analyz-text").val();
    var LowCase = $("#analyz-low-case")[0].checked;
    var fr = AnalyzFreq(text, LowCase);
    var charsandnum = AnalyzCharsAndNum(text);

    var frsize = 0;
    for (var index in fr) {
      frsize ++;
    }
    
    $tr = $("<tr>");
    $tr.append( $("<td class='table-td-result-italic'> Znaků celkem: </td>"));
    $tr.append( $("<td class='table-td-result'>" + text.length + "</td>"));
    $table1.append($tr);
    $tr = $("<tr>");
    $tr.append( $("<td class='table-td-result-italic'> Písmen a číslic: </td>"));
    $tr.append( $("<td class='table-td-result'>" + charsandnum + "</td>"));
    $table1.append($tr);
    $tr = $("<tr>");
    $tr.append( $("<td class='table-td-result-italic'> Unikátních: </td>"));
    $tr.append( $("<td class='table-td-result'>" + frsize + "</td>"));
    $table1.append($tr);

    
    for (var index in fr)
    {
      $tr = $("<tr>");
      $tr.append( $("<td class='table-td-result-italic'>" + index + "</td>"));
      $tr.append( $("<td class='table-td-result'>" + fr[index] + "</td>"));
      $table2.append($tr);
    }
    saveString(text);
  });

  loadFromStorage();
});
