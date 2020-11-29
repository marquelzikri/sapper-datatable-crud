export function del(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  const { slug } = req.params;

  console.log(slug);

  // req.db.collection('balancer').deleteOne({  }, {}, (error, balancers) => {
  //   if (error) {
  //     res.statusCode = 400;
  //     res.end(JSON.stringify({ message: error }));
  //   } else {
  //     res.statusCode = 200;
  //     res.end(JSON.stringify({ message: 'Balancer deleted.' }));
  //   }
  // });
}