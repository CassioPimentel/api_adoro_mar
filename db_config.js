var db_string = 'mongodb://localhost/Produtos'; //string de conexao para o servidor mongo db

var mongoose = require('mongoose').connect(db_string); //faz a requisição do mongoose passando a string de conexão

var db = mongoose.connection; //conecta ao banco

db.on('error', console.error.bind(console, 'Erro ao conectar no banco')); //se houver algum erro, mostra na tela

db.once('open', function(){ //no evento de abertura da conexao, cria o esquema do banco

	var tamanho = new mongoose.Schema({
	    tamanho: { type: String },
	    quantidade: { type: Number }
	});

	var produtoSchema = mongoose.Schema({

		nome: String,
		preco: Number,
		cor: String,
		descricao: String,
		tamanho: [tamanho],
		created_at: Date
	});

	exports.Produto = mongoose.model('Produto', produtoSchema);
});
