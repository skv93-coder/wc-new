const { exec } = require("child_process");
const { WCL } = require("../WCL");
describe("WCL", () => {
  test("wcl ./test/sample.txt cmd should not give any error", async () => {
    await new Promise((resolve, _) =>
      exec("wcl ./test/sample.txt", "", (err, _, stderr) => {
        expect(err).toBeFalsy();
        expect(stderr).toBe("");
        resolve();
      })
    );
  });
  test("wcl ./test/wrong.txt cmd should not give any error", async () => {
    await new Promise((resolve, _) =>
      exec("wcl ./test/wrong.txt", "", (err, stdout, stderr) => {
        expect(err).toBeTruthy();
        expect(stderr).toMatch("./test/wrong.txt does not exist.");
        resolve();
      })
    );
  });
  test("wcl ./test/sample.txt  ./test/sample.txt cmd should not give any error", async () => {
    await new Promise((resolve, _) =>
      exec("wcl ./test/sample.txt  ./test/sample.txt", "", (err, stdout) => {
        expect(err).toBeFalsy();
        expect(stdout).toContain(
          `│    0    │   1   │   1   │   9   │ './test/sample.txt' │`
        );
        expect(stdout).toContain(
          `│    1    │   1   │   1   │   9   │ './test/sample.txt' │`
        );
        expect(stdout).toContain(
          `│    2    │   2   │   2   │  18   │       'total'       │`
        );
        resolve();
      })
    );
  });
  test("WCL class fx getStatsOfFile should be working fine ", async () => {
    const wcl = new WCL("./test/sample.txt");
    await wcl.getStatsOfFile();
    expect(wcl.lines).toBe(1);
    expect(wcl.words).toBe(1);
    expect(wcl.char).toBe(9);
  });
});
