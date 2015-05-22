var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.query('SELECT * FROM `utilizadores`', function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        res.json(results);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var user = req.body;
    //console.log(req.body);
//    db.collection('userlist').insert(req.body, function(err, result){
//        res.send(
//            (err === null) ? { msg: '' } : { msg: err }
//        );
//    });
//    INSERT INTO `sharedpen`.`utilizadores` (`user`, `pass`, `nome`, `contacto`, `id_role`) VALUES ('teste2', 'abc', 'Badu', '987654321', '1');
//    INSERT INTO `sharedpen`.`utilizadores` (`user`, `pass`, `nome`, `contacto`, `id_role`) SET ('teste2', 'abc', 'Badu', '987654321', '1');
    var query = db.query('INSERT INTO `sharedpen`.`utilizadores` SET ?', user, function(err, result) {
        console.log("Query done!");
    res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
        console.log(res.msg);
});
console.log(query.sql);
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
    db.query('INSERT * FROM `utilizadores`', function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        res.json(results);
    });
});

module.exports = router;