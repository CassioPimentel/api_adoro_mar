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

exports.Produto = function(nome, callback){

	db.Produto.findOne({nome: nome},function(error, produto) {

		if(error) {

			callback({error: 'Não foi possivel retornar o produto'});
		}else {
			callback(produto);
		}

	});
}

exports.Pedido = function(nome, tamanho, callback){
 
	//console.log('nome: ' + nome)
	console.log('tamanho: ' + tamanho);

	db.Produto.findOne({nome:nome}, function(error, produto){
		if(error) {

			callback({error: 'O produto não exite'});
		} else {

			//console.log("produto tamanhooo= " + produto.tamanho);

			for (var i in tamanho) {

				if(tamanho[i].tamanho == 'P') {

					if(!produto.tamanho[i].tamanho) {

						callback({error: 'Não exite tamanho P para este produto'});
						return;
					}else {

						if(produto.tamanho[i].quantidade < tamanho[i].quantidade) {

							callback({error: 'Descupe, mas só tenho ' + produto.tamanho[i].quantidade + ' do ' + nome + ' do tamanho P em estoque'});
							return;
						} else {

							produto.tamanho[i].quantidade = produto.tamanho[i].quantidade - tamanho[i].quantidade;
						}
					}
				}else if(tamanho[i].tamanho == 'M') {

					if(!produto.tamanho[i].tamanho) {

						callback({error: 'Não exite tamanho M para este produto'});
						return;
					}else {

						if(produto.tamanho[i].quantidade < tamanho[i].quantidade) {

							callback({error: 'Descupe, mas só tenho ' + produto.tamanho[i].quantidade + ' do ' + nome + ' do tamanho M em estoque'});
							return;
						} else {

							produto.tamanho[i].quantidade = produto.tamanho[i].quantidade - tamanho[i].quantidade;
						}
					}
				}else {

					if(!produto.tamanho[i].tamanho) {

						callback({error: 'Não exite tamanho G para este produto'});
						return;
					}else {

						if(produto.tamanho[i].quantidade < tamanho[i].quantidade) {

							callback({error: 'Descupe, mas só tenho ' + produto.tamanho[i].quantidade + ' do ' + nome + ' do tamanho G em estoque'});
							return;
						} else {

							produto.tamanho[i].quantidade = produto.tamanho[i].quantidade - tamanho[i].quantidade;
						}
					}
				}																																																																											 
			}
			
			produto.save(function(error, produto){

			if(error) {

				callback({erro: 'Não foi possivel atualizar o produto'});
			} else {

				callback(produto);
			}
		});
		}
	})
};

exports.save = function(nome, preco, descricao, cor, tamanho, callback){

	new db.Produto({
		'nome': nome,
		'preco': preco,
		'cor': cor,
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

exports.update = function(nome, preco, descricao, cor, tamanho, callback){

	db.Produto.findOne(nome, function(error, produto){

		if(nome){
			produto.nome = nome;
		}

		if(preco){
			produto.preco = preco;
		}

		if(descricao){
			produto.descricao = descricao;
		}

		if(cor){
			produto.cor = cor; 
		}

		if(tamanho){
			produto.tamanho = tamanho;
		}

		produto.save(function(error, produto){

			if(error) {

				callback({erro: 'Não foi possivel atualizar o produto'});
			} else {

				callback(produto);
			}
		});

	});
};

exports.delete = function(id, callback){

	db.Produto.findById(id, function(error, produto){
		if(error) {

			res.json({erro: 'Não foi possivel encontrar o produto'});
		} else {

			produto.remove(function(error){

				if(!error) {

					callback({response: 'produto excluido com sucesso'});
				}
			});
		}
	})
};
