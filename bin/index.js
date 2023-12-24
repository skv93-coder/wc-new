#!/usr/bin/env node

const { program } = require("commander");
const { WCL } = require("../WCL");

program
  .argument("<input-file...>")
  .option("-l,--lines")
  .option("-c,--chars")
  .option("-w,--words")
  .action(async (arr) => {
    const options =
      Object.keys(program.opts()).length == 0 ? { l: 1, w: 1, c: 1 } : {};
    options.l = program.opts().lines || options.l;
    options.w = program.opts().words || options.w;
    options.c = program.opts().chars || options.c;
    const arrOfObj = arr.map((file) => new WCL(file));
    try {
      await Promise.all(arrOfObj.map((fileObj) => fileObj.getStatsOfFile()));
      WCL.printFileStats(arrOfObj, options);
    } catch (error) {
      program.error(error.message || error);
    }
  })
  .showHelpAfterError();
program.parse();
