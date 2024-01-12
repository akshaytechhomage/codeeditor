var ceditor = CodeMirror.fromTextArea(document.getElementById("ceditor"), {
  mode: "text/x-c++src",
  theme: "dracula",
  lineNumbers: true,
  autoCloseBrackets: true,
});
var width = window.innerWidth;
var input = document.getElementById("input");
var output = document.getElementById("output");
var run = document.getElementById("run");
ceditor.setSize(0.7 * width, "500");

var option = document.getElementById("inlineFormSelectPref");

option.addEventListener("change", function () {
  if (option.value == "Java") {
    ceditor.setOption("mode", "text/x-java");
  } else if (option.value == "Python") {
    ceditor.setOption("mode", "text/x-python");
  } else {
    ceditor.setOption("mode", "text/x-c++src");
  }
});

var code;

run.addEventListener("click", async function () {
  code = {
    code: ceditor.getValue(),
    input: input.value,
    lang: option.value,
  };
  // console.log(code)
  var oData = await fetch("CODEEDITOR", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(code),
  });
  var d = await oData.json();
  output.value = d.output;
});

// document
//   .getElementById("submitTestButton")
//   .addEventListener("click", async function () {
//     var code = output.value;
//     var inp = input.value;
//     console.log(inp);
//     var lang = option.value;
//     var testType = "check";

//     try {
//       var response = await fetch("SubmitCode", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code: code,
//           inp: inp,
//           lang: lang,
//           testType: testType,
//         }),
//       });
//       if (response.ok) {
//         var result = await response.json();

//         if (result && result.status) {
//           if (result.status === "success") {
//             alert("Test passed successfully!");
//             document.getElementById("msg").innerText =
//               "Congratulations! All the test cases passed. You can move to the next problem.";
//             document.getElementById("msg").style.color = "#fff";
//             document.getElementById("status").style.color = "#12ff91";
//             document.getElementById("status").innerText = "Success";
//             document.getElementById("lang").innerText = result.lan;
//           } else {
//             alert("Test failed.");
//             document.getElementById("msg").innerText =
//               "Sorry, All the test cases failed.Please check your code and submit again.";
//             document.getElementById("msg").style.color = "rgb(250, 179, 174)";
//             document.getElementById("status").innerText = "Failed";
//             document.getElementById("status").style.color = "red";
//             document.getElementById("lang").innerText = result.lan;
//           }
//         } else {
//           console.error("Invalid response format from the server.");
//         }
//       } else {
//         console.error("Error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   });

document
  .getElementById("submitTestButton")
  .addEventListener("click", async function () {
    var code = output.value;
    var inp = input.value;
    // console.log(inp);
    var lang = option.value;
    var testType = "check";

    try {
      var response = await fetch("SubmitCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          inp: inp,
          lang: lang,
          testType: testType,
        }),
      });
      console.log(response);

      if (response.ok) {
        var results = await response.json();

        console.log(results);

        if (results && Array.isArray(results.ak)) {
          var tableBody = document.getElementById("tabb");
          tableBody.innerHTML = "";

          let checkres = results.ak;
          let allPassed = true;
          checkres.forEach((result, index) => {
            var row = tableBody.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.textContent = index + 1;
            cell2.textContent = result.status;
            cell3.textContent = result.lan;

            if (result.status.toLowerCase() !== "success") {
              allPassed = false;
              cell2.style.color = "red";
            } else {
              cell2.style.color = "#12ff91";
            }
          });
          console.log(allPassed);
          if (allPassed) {
            document.getElementById("msg").innerText =
              "Congratulations! All the test cases passed. You can move to the next problem.";
            document.getElementById("msg").style.color = "#fff";
          } else {
            document.getElementById("msg").innerText =
              "Sorry,Some test cases are failed. Please check your code and submit again.";
            document.getElementById("msg").style.color = "rgb(250, 179, 174)";
          }
        } else {
          console.error("Invalid response format from the server.");
        }
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
