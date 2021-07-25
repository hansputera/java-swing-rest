const path = require("path");
const fs = require("fs");

class Cruds {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.path = path.resolve(__dirname, "data", this.serviceName + ".json");
    
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, "{}");
  }
  
  all() {
    const contents = fs.readFileSync(this.path, "utf8");
    return JSON.parse(contents);
  }
  
  get(key) {
    const json = this.all();
    return json[key];
  }
  
  set(key, val) {
    const json = this.all();
    json[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(json, 0, 2)); // space 2
  }
  
  delete(key) {
    const json = this.all();
    delete json[key];
    fs.writeFileSync(this.path, JSON.stringify(json, 0, 2));
  }
}

module.exports = Cruds;