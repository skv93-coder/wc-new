const { WCT } = require("./WCT");

const handleAction = async (arr, option) => {
  const options = Object.keys(option).length == 0 ? { l: 1, w: 1, c: 1 } : {};
  options.l = option.lines || options.l;
  options.w = option.words || options.w;
  options.c = option.chars || options.c;
  const arrOfObj = arr.map((file) => new WCT(file));
  try {
    await Promise.all(arrOfObj.map((fileObj) => fileObj.getStatsOfFile()));
    WCT.printFileStats(arrOfObj, options);
  } catch (error) {
    throw error.message || error;
  }
};
module.exports = handleAction;
