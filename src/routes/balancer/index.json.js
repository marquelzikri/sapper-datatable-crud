import { ObjectId } from "mongodb";

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  req.db.collection('balancer').find().toArray((error, balancers) => {
    if (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: error }));
    }
    if (balancers) {
      balancers = balancers.map(balancer => {
        balancer["id"] = balancer._id
        return balancer
      });

      res.statusCode = 200;
      res.end(JSON.stringify(balancers));
    }
  });
}

export function post(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  let { name, port, rule } = req.body;

  req.db.collection('balancer').insertOne({ name, port, rule }, {}, (error, _result) => {
    if (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: error }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "New balancer saved." }));
    }
  });
}

export function put(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  let { id, name, port, rule } = req.body;

  req.db.collection('balancer').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { name, port, rule } },
    {},
    (error, _result) => {
      if (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: error }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Balancer data updated." }));
      }
  });
}

export function del(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const { id } = req.body;

  req.db.collection('balancer').deleteOne({ _id: new ObjectId(id) }, {}, (error, _result) => {
    if (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: error }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Balancer deleted.' }));
    }
  });
}