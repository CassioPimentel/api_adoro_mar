var db = require('../db_config.js');

exports.list = function(callback){

	db.Produto.find({},function(error, produtos) {

		if(error) {

			callback({error: 'Não foi possivel retornar os produtos'});
		}else {
			callback(produtos);
		}

	});
};

exports.Produto = function(nome, quantidadeProdutos, tamanho, callback){

	db.Produto.findById(nome, function(error, produto){
		if(error) {

			callback({erro: 'O produto não exite'});
		} else {

			if(produto.tamanho.find(tamanho).count() < quantidadeProdutos) {
				callback({erro: 'Não há produtos suficientes com o tamanho desejado em estoque para o seu pedido'});
			}

			if(quantidadeProdutos){
				produto.quantidadeProdutos -= quantidadeProdutos;
			}

			if(tamanho){

				if(tamanho.substring(tamanho.indexOf('=')) == 'P') {

					produto.tamanho.P -= quantidadeProdutos; 
				}else if(tamanho == 'M'){

					produto.tamanho.M -= quantidadeProdutos;
				}else {

					produto.tamanho.G -= quantidadeProdutos; 
				}
			}
			
			produto.save(function(error, produto){

			if(error) {

				callback({erro: 'Não foi possivel atualizar o produto'});
			} else {

				callback(produto); //produto é uma instancia do Model produto criado acima
			}
		});
		}
	})
};

exports.save = function(nome, preco, descricao, tamanho, callback){

	new db.Produto({
		'nome': nome,
		'preco': preco,
		'descricao': descricao,
		'tamanho': tamanho,
		'created_at': new Date()
	}).save(function(error, produto){

		if(error) {

			callback({erro: 'Não foi possivel salvar o produto'});
		} else {

			callback(produto);
		}
	});

};

exports.update = function(nome, preco, descricao, quantidadeEstoque, tamanho, callback){

	db.Produto.findById(id, function(error, produto){

		if(nome){
			Produto.nome = nome
		}

		if(preco){
			Produto.preco = preco
		}

		if(descricao){
			produto.descricao = descricao 
		}

		if(tamanho){
			produto.tamanho = tamanho 
		}

		produto.save(function(error, produto){

			if(error) {

				callback({erro: 'Não foi possivel atualizar o produto'});
			} else {

				callback(produto); //produto é uma instancia do Model produto criado acima
			}
		});

	});
};

exports.delete = function(id, callback){

	db.Produto.findById(id, function(error, produto){ //faz uma busca no banco mongo pelo id
		if(error) {

			res.json({erro: 'Não foi possivel encontrar o produto'});
		} else {

			produto.remove(function(error){

				if(!error) {

					callback({response: 'produto excluido com sucesso'});
				}
			}); //produto é uma instancia do model produto criado acima
		}
	})
};
