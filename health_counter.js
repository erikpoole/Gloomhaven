let bearDefaultValue = [0];
let tyrantDefaultValue = [0];
let expDefaultValue = [0];

function sendUpdate(counterString, count) {
  let newValue = counterString + "=" + count;
  let request = "http://" + location.host + "/update/" + newValue;
  console.log("Sending Request: " + request);
  let xml = new XMLHttpRequest();
  xml.open("GET", request);
  xml.send();
}

const updateCounter = function(requestString, counterString, commandString) {
  let countObj = document.getElementById(counterString);
  let count = parseInt(countObj.innerText);
  if (commandString === "up") {
    count++;
  } else if (commandString === "down") {
    count--;
  } else if (commandString === "reset") {
    if (counterString === "bearCounter") {
      count = bearDefaultValue[0];
    } else if (counterString === "tyrantCounter") {
      count = tyrantDefaultValue[0];
    } else if (counterString === "expCounter") {
      count = expDefaultValue[0];
    }
  } else {
    throw "improper commandString";
  }

  countObj.innerText = count.toString();
  sendUpdate(requestString, count);
};

const requestServerValue = function(
  requestString,
  returnLocation,
  handlerFunction
) {
  let request = "http://" + location.host + "/request/" + requestString;
  console.log(request);
  let xml = new XMLHttpRequest();
  xml.open("GET", request);
  xml.responseType = "text";
  xml.onload = function() {
    handlerFunction(returnLocation, xml);
  };
  xml.send();
};

const initialValueHandler = function(counterString, xmlObj) {
  console.log("Received Initial Value for: " + counterString);
  document.getElementById(counterString).innerText = xmlObj.response;
};

const defaultValueHandler = function(intBuffer, xmlObj) {
  console.log("Recieved Default Value for: " + intBuffer);
  intBuffer[0] = xmlObj.response;
};

window.onload = function() {
  document.getElementById("bearUp").onclick = function() {
    updateCounter("bearCurrent", "bearCounter", "up");
  };
  document.getElementById("bearDown").onclick = function() {
    updateCounter("bearCurrent", "bearCounter", "down");
  };
  document.getElementById("bearReset").onclick = function() {
    updateCounter("bearCurrent", "bearCounter", "reset");
  };

  document.getElementById("tyrantUp").onclick = function() {
    updateCounter("tyrantCurrent", "tyrantCounter", "up");
  };
  document.getElementById("tyrantDown").onclick = function() {
    updateCounter("tyrantCurrent", "tyrantCounter", "down");
  };
  document.getElementById("tyrantReset").onclick = function() {
    updateCounter("tyrantCurrent", "tyrantCounter", "reset");
  };

  document.getElementById("expUp").onclick = function() {
    updateCounter("expCurrent", "expCounter", "up");
  };
  document.getElementById("expDown").onclick = function() {
    updateCounter("expCurrent", "expCounter", "down");
  };
  document.getElementById("expReset").onclick = function() {
    updateCounter("expCurrent", "expCounter", "reset");
  };

  requestServerValue("bearDefault", bearDefaultValue, defaultValueHandler);
  requestServerValue("tyrantDefault", tyrantDefaultValue, defaultValueHandler);
  requestServerValue("expDefault", expDefaultValue, defaultValueHandler);

  requestServerValue("bearCurrent", "bearCounter", initialValueHandler);
  requestServerValue("tyrantCurrent", "tyrantCounter", initialValueHandler);
  requestServerValue("expCurrent", "expCounter", initialValueHandler);
};
