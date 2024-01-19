const fs = require("fs");
const readline = require("readline/promises");

class WCT {
  constructor(fileName) {
    this.fileName = fileName;
    this.lines = 0;
    this.words = 0;
    this.char = 0;
  }
  static printFileStats(arr, options) {
    const table = [];
    let totalChar = 0;
    let totalWord = 0;
    let totalLines = 0;
    arr.forEach((fileObj) => {
      const fileInfo = {};
      if (options.l) {
        totalLines += fileObj.lines;
        fileInfo.lines = fileObj.lines;
      }
      if (options.w) {
        totalWord += fileObj.words;
        fileInfo.words = fileObj.words;
      }
      if (options.c) {
        totalChar += fileObj.char;
        fileInfo.chars = fileObj.char;
      }
      fileInfo.file = fileObj.fileName;
      table.push(fileInfo);
    });
    if (arr.length > 1) {
      table.push({
        file: "total",
        lines: totalLines,
        words: totalWord,
        chars: totalChar,
      });
    }
    console.table(table);
  }
  isFileExist = async () => {
    if (this.fileName === null) {
      return true;
    }
    return new Promise((resolve, reject) => {
      fs.stat(this.fileName, (err) => {
        if (err && err.code === "ENOENT") {
          reject(this.fileName + " does not exist.");
        }

        resolve();
      });
    });
  };
  getStatsOfFile = async () => {
    await this.isFileExist();
    const input =
      this.fileName != null
        ? fs.createReadStream(this.fileName)
        : process.stdin;
    const rl = readline.createInterface({
      input,
      output: process.stdout,
      terminal: false,
    });

    await new Promise((resolve, reject) => {
      rl.on("line", (line) => {
        this.lines += 1;
        this.words += line.trim().split(" ").length;
        this.char += line.length;
      });
      rl.on("close", resolve);
    });
  };
}

module.exports = { WCT };
