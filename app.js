var db = require('./db_config.js'); 
var app = require('./app_config.js');  
var validator = require('validator');
var produtoController = require('./controllers/produtoController.js');

app.get('/', function(req, res){

	res.json('Bem vindo a API de produtos do Adoro Mar');
});

app.get('/produto', function(req, res){ 

	produtoController.list(function(resp) { 
											 
		res.json(resp);					      
	});										  
});

app.get('/estoque', function(req, res){ 

	produtoController.list(function(resp) { 
											 
		res.json(resp);					      
	});										  
});

app.get('/produto/:nome', function(req, res){ 

	var nome = validator.trim(validator.escape(req.params.nome));
	var quantidadeProdutos = validator.trim(validator.escape(req.param('quantidadeProdutos')));
	var tamanho = validator.trim(validator.escape(req.param('tamanho')));

	produtoController.user(nome, quantidadeProdutos, tamanho, function(resp){

		res.json(resp);
	});

});

app.post('/produto', function(req, res){ 

	var nome = validator.trim(validator.escape(req.body.nome));
	var preco = validator.trim(validator.escape(req.body.preco));
	var descricao = validator.trim(validator.escape(req.body.descricao));
	var tamanho = req.body.tamanho;

	produtoController.save(nome, preco, descricao, tamanho, function(resp){

		res.json(resp);
	});
});

app.put('/produto', function(req, res){ //atualiza um usuario

	var id = validator.trim(validator.escape(req.param('id')));
    var nome = validator.trim(validator.escape(req.param('nome')));
	var preco = validator.trim(validator.escape(req.param('preco')));
	var descricao = validator.trim(validator.escape(req.param('descricao')));
	var tamanho = validator.trim(validator.escape(req.param('tamanho')));

	produtoController.update(id, nome, preco, descricao, tamanho, function(resp){

		res.json(resp);
	});
});

app.delete('/produto/:id', function(req, res){ 

	var id = validator.trim(validator.escape(req.params.id));

	produtoController.delete(id, function(resp){

		res.json(resp);
	});
});