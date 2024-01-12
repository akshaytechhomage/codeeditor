const router = require("express").Router();
const bodyP = require("body-parser");
const compiler = require("compilex");
const path = require("path");
const options = { stats: true };
compiler.init(options);
router.use(bodyP.json());

router.get("/", function (req, res) {
  compiler.flush(function () {
    console.log("deleted");
  });
  res.render("index");
});

router.post("/CodeEditor", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "Cpp") {
      if (!input) {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      } else {
        var envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      }
    } else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      }
    } else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            console.error("Compilation Error:", data.error);
            const dirPath = path.join(__dirname, "/temp");
            var hiddenError = data.error
              ? data.error.replace(dirPath, "...")
              : " ";
            res.send({ output: hiddenError });
          }
        });
      }
    } else {
      res.send({ output: "Please Select any of Languages !!" });
    }
  } catch (e) {
    console.log("error");
  }
});

router.post("/SubmitCode", function (req, res) {
  var code = req.body.code;

  var inp = req.body.inp;
  console.log("Input Value", inp);

  let aa = inp.split(/\n|\s+/);
  console.log("String :", aa);

  let inputvalue = aa.map((aa) => parseInt(aa)).filter((aa) => !isNaN(aa));
  console.log("Int :", inputvalue);

  console.log("Check Output:", code);

  var lang = req.body.lang;
  var testType = req.body.testType;

  try {
    switch (testType) {
      case "check":
        runTest(code, lang, res, inputvalue);
        break;
      default:
        res.send({ status: "failed", message: "Invalid test type" });
    }
  } catch (e) {
    console.error("Error:", e);
    res
      .status(500)
      .send({ status: "failed", message: "Internal Server Error" });
  }
});

// function runTest(code, lang, res, arr) {
//   var expectedOutput = "900";

//   // for (let i = 0; i < arr.length; i++) {
//   //   // console.log(arr[i]);
//   //   if (typeof arr[i] === "number" && Number.isInteger(arr[i])) {
//   //     console.log(true);
//   //   } else {
//   //     console.log(false);
//   //   }
//   // }

//   let testResults = [];
//   for (let i = 0; i < arr.length; i++) {
//     // console.log(arr[i]);
//     if (typeof arr[i] === "number" && Number.isInteger(arr[i])) {
//       // console.log(true);
//       testResults.push({ testCase: i + 1, status: "Success", lan: lang });
//     } else {
//       console.log(false);
//       testResults.push({ testCase: i + 1, status: "Failed", lan: lang });
//     }
//   }
//   // res.send({ testResults });

// console.log(testResults);

//   if (code && code.trim() === expectedOutput) {
//     res.send({
//       status: "success",
//       message: "Test passed successfully",
//       lan: lang,
//       ak:testResults
//     });

   
//   } else {
//     res.send({ status: "failed", message: "Test failed", lan: lang });
//   }
// }

function runTest(code, lang, res, arr) {
  var expectedOutput = "900";

  let ctn=0;
  let testResults = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number" && Number.isInteger(arr[i])) {
      //testResults.push({ testCase: i + 1, status: "Success", lan: lang });
      ctn+=1;
    }else{
      ctn=ctn;
    }
  }

  if (ctn==arr.length) {
    testResults.push({ testCase: 1, status: "Success", lan: lang });
  }else {
    testResults.push({ testCase: 1, status: "Failed", lan: lang });
  }


  if (code && code.trim() === expectedOutput) {
    testResults.push({ testCase: 2, status: "Success", lan: lang });

  } else {
    testResults.push({ testCase: 2, status: "Failed", lan: lang });
  }
 
  res.send({
    status: "success",
    message: "Test passed successfully",
    lan: lang,
    ak: testResults,
  });
}

module.exports = router;
