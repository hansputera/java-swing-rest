const Fastify = require("fastify");
const Cruds = require("./cruds");
const app = Fastify({
  logger: true
});
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require("uuid");

const storage = new Cruds("data-siswa");

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  console.log(req.body);
  try {
    const json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  };
});

app.get("/", (req, reply) => {
  reply.send("Hello world");
});

app.post("/siswa", {
  preHandler: (req, reply, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.full_name;
    
    if (!username || !password || !fullName) {
      return reply.send("Missing parameters");
    } else {
      next();
    }
  }
}, (req, reply) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const fullName = req.body.full_name;
  
  const alls = Object.values(storage.all());
  if (alls.find(u => u.username == username)) return reply.send("Username is already exists!");
  const id = uuidv4().split("-")[0];
  storage.set(id, {
    username, password, fullName, date: Date.now()
  });
  reply.send(storage.get(id));
});

app.listen(PORT);