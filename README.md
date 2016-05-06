# api_adoro_mar

## API REST de produtos para o site Adoro Mar

### Objetivo
	Implementar um REST API de produtos para um ecomerce de moda praia, onde os produtos terão 
	nome, preço e descrição e tamanho, que pode ser P, M ou G.

### Tecnologias usadas

	Para este problema foi utilizado um servidor com NodeJS, e o banco de dados NOSql MongoDB.

### Pré-requisitos

- Node V0.8+
- MongoDB server

### Dependencias

- body-parser 1.15.0
- express 4.13.4
- mongoose4.4.14
- validator 5.2.0

### Configurar o App

- Apos baixar o projeto, acesse a pasta raiz e instale as dependências com _npm install_.
- E apos instalar todas as dependências, basta da um start no App com _node app.js_.

### Testando o App
	Para testar o App basta acessar o endereço http://localhost:8080 no navegador ou usando
	o PostMan.

- Buscar todos os Produtos
		Para buscar todos os produtos basta fazer uma requisição GET em: http://localhost:8080/produto.

- Cadastro de Produtos
		Para cadastrar um produto basta fazer uma requisição POST em http://localhost:8080/produto 
		enviando um JSON como o do exemplo abaixo:
		
		{
			 "nome": "biquine amarelo",
			 "preco": "124.34",
			 "cor": "amarelo",
			 "descricao": "biquine sexy amarelo",
			 "tamanho": [
			      {
			          "tamanho": "P", 
			          "quantidade": 30
			      }
			 ]
		}
	
	Os tamanhos são P, M e G.

- Atualizar informação de um Produto
		Para Alterar o estoque, basta enviar uma requisição PUT em http://localhost:8080/produto com um JSON
		contendo as novas informações do produto, por exemplo:
		
		{
			 "nome": "biquine amarelo",
			 "preco": "124.34",
			 "descricao": "biquine sexy amarelo",
			 "tamanho": [
			      {
			          "tamanho": "P", 
			          "quantidade": 50
			      },
			      {
			          "tamanho": "M", 
			          "quantidade": 70
			      },
			      {
			          "tamanho": "G", 
			          "quantidade": 10
			      }
			 ]
		}
	

- Fazer um pedido de Produto
		 No pedido de produto, e necessário enviar uma requisição POST para http://localhost:8080/produto/pedido/NomeDoProduto,
		 e enviar no body um JSON com o pedido, contendo no minimo o nome e os tamanhos daquele produto. Se houver a quantidade
		 de produtos em estoque, o mesmo é subtraído, se não sera retornado uma mensagem de erro.

- Excluir um produto
		Para Excluir basta enviar uma requisição DELETE para http://localhost:8080/produto/NomeDoProduto, onde NomeDoProduto é
		o produto que será excluído.

###Demo
	Se quiser pode usar esse link para fazer as requisições, apenas seguindo os 
	passos de como testar o APP.	
	
	https://api-adoro-mar.herokuapp.com/
