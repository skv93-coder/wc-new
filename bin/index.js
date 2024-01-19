#!/usr/bin/env node

const { program } = require("commander");
const handleAction = require("../action");

program
  .argument("<input-file...>")
  .option("-l,--lines")
  .option("-c,--chars")
  .option("-w,--words")
  .action((arr) => {
    try {
      handleAction(arr, program.opts());
    } catch (error) {
      program.error(error);
    }
  })
  .showHelpAfterError();

if (process.stdin.isTTY) {
  program.parse();
} else {
  handleAction([null], {});
}
