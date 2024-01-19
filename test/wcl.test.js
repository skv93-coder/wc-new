const { exec } = require("child_process");
const {  WCT } = require("../WCT");
const { describe, test, expect } = require("@jest/globals");
const handleAction = require("../action");

const spiedLog = jest.spyOn(console, "table");

describe("word-count-table", () => {
  test("word-count-table ./test/sample.txt cmd should not give any error", async () => {
    await handleAction(["test/sample.txt"], {});
    expect(spiedLog).toHaveBeenCalled();
    expect(spiedLog).toHaveBeenCalledWith([
      { lines: 1, words: 1, chars: 9, file: "test/sample.txt" },
    ]);
  });
  test("word-count-table ./test/wrong.txt cmd should not give any error", async () => {
    try {
      await handleAction(["./test/wrong.txt"], {});
    } catch (error) {
      expect(error).toBe("./test/wrong.txt does not exist.");
    }
  });
  test("word-count-table ./test/sample.txt  ./test/sample.txt cmd should not give any error", async () => {
    await handleAction(["./test/sample.txt", "./test/sample.txt"], {});
    expect(spiedLog).toHaveBeenCalled();
    expect(spiedLog).toHaveBeenCalledWith([
      { lines: 1, words: 1, chars: 9, file: "./test/sample.txt" },
      { lines: 1, words: 1, chars: 9, file: "./test/sample.txt" },
      { file: "total", lines: 2, words: 2, chars: 18 },
    ]);
  });
  test("cat test/sample.txt | node bin/index.js cmd should give response like node ./bin/index.js ./test/sample.txt ", async () => {
    new Promise((resolve, _) => {
      exec("cat test/sample.txt | node bin/index.js", "", (err, stdout) => {
        expect(stdout).toMatch('│    0    │   1   │   1   │   9   │ null │')
      });
      
    });
  });
  test("word-count-table class fx getStatsOfFile should be working fine ", async () => {
    const wcl = new WCT("./test/sample.txt");
    await wcl.getStatsOfFile();
    expect(wcl.lines).toBe(1);
    expect(wcl.words).toBe(1);
    expect(wcl.char).toBe(9);
  });
});
