const Fastify = require("fastify");
const Cruds = require("./cruds");
const app = Fastify({
  logger: true
});
const PORT = process.env.PORT || 3000;

const storage = new Cruds("data-siswa");

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    var json = JSON.parse(body);
    done(null, json);
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  };
});

app.listen(PORT);