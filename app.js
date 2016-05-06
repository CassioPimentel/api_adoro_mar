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

app.get('/produto/:nome', function(req, res){ 

	var nome = req.params.nome;

	produtoController.Produto(nome, function(resp) { 
											 
		res.json(resp);					      
	});										  
});

app.post('/produto/pedido/:nome', function(req, res){ 

	var nome = validator.trim(validator.escape(req.body.nome));
	var tamanho = req.body.tamanho;

	produtoController.Pedido(nome, tamanho,function(resp){

		res.json(resp);
	});

});

app.post('/produto', function(req, res){ 

	var nome = validator.trim(validator.escape(req.body.nome));
	var preco = validator.trim(validator.escape(req.body.preco));
	var descricao = validator.trim(validator.escape(req.body.descricao));
	var cor = req.body.cor;
	var tamanho = req.body.tamanho;

	produtoController.save(nome, preco, descricao, cor,tamanho, function(resp){

		res.json(resp);
	});
});

app.put('/produto/:nome', function(req, res){

    var nome = validator.trim(validator.escape(req.params.nome));
	var preco = validator.trim(validator.escape(req.body.preco));
	var descricao = validator.trim(validator.escape(req.body.descricao));
	var cor = req.body.cor;
	var tamanho = req.body.tamanho;

	produtoController.update(nome, preco, descricao, cor, tamanho, function(resp){

		res.json(resp);
	});
});

app.delete('/produto/:id', function(req, res){ 

	var id = validator.trim(validator.escape(req.params.id));

	produtoController.delete(id, function(resp){

		res.json(resp);
	});
});
