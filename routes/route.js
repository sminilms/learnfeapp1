const fs = require("fs");
const path = require("path");

const defaultLang = "en";
const apis = {
  apiList: {
    userapiurl: process.env.USER_MS_URL,
    userapiversion: process.env.USER_MS_VERSION,
    lang: defaultLang
  }
};

exports.index = async function (req, res) {
  res.render("index", apis);
};

exports.browsedir = async function (req, res) {
  const parentdir = path.dirname(path.basename(__dirname));
  const dir = path.join(parentdir + "/public/assets/js");
  const subDirs = fs.readdirSync(dir, { withFileTypes: true });
  const data = {};
  data.path = req.path;
  data.directory = subDirs;
  res.render("browsedir", data);
};

exports.browsesubdir = async function (req, res, next) {
  const parentdir = path.dirname(path.basename(__dirname));
  const subdirPath = req.path.split("/testapp").join("");
  const dir = path.join(parentdir + "/public/assets/js" + "/" + subdirPath);
  const subDirs = fs.readdirSync(dir, { withFileTypes: true });
  let indexPath = path.join(dir, "index.ejs");
  let isIndexPath = false;

  if (fs.existsSync(indexPath)) {
    isIndexPath = true;
  }

  const data = {};
  data.path = req.path;
  data.directory = subDirs;
  data.apiList = apis.apiList;

  console.log("indexPath", indexPath);

  console.log(data);
  console.log("isIndexPath", isIndexPath);
  if (isIndexPath) {
    //indexPath = indexPath.split(".html").join("");
    //res.render("index", apis);
    req.testViewdir = dir;
    next();
  } else {
    res.render("browsedir", data);
  }
};

// const findIndexFile = (dir) => {
//   // Check if index.html exists in the current directory
//   const indexPath = path.join(dir, 'index.html');
//   if (fs.existsSync(indexPath)) {
//     return indexPath;
//   }

//   let subDir = {};
//   // Recursively check subdirectories
//   const subDirs = fs.readdirSync(dir, { withFileTypes: true });
//   for (const subDir of subDirs) {
//     if (subDir.isDirectory()) {
//       const subDirPath = path.join(dir, subDir.name);
//       const indexFile = findIndexFile(subDirPath);
//       if (indexFile) {
//         return indexFile;
//       }
//     }
//   }

//   return null;
// };
