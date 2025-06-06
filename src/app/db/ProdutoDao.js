import getDbConnection from "./Connection";

export async function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS Produto 
    (
        codigo text not null primary key,
        descricao text not null,
        preco DECIMAL(10, 2) not null,
        categoria text not null,
        imagem TEXT not null
    )`;

  const con = await getDbConnection();
  con.execAsync(query);
  con.closeAsync();
}

export async function findAllProdutos() {
  var result = [];

  const con = await getDbConnection();
  const linhas = await con.getAllAsync(
    "SELECT p.codigo, p.descricao, p.preco,p.categoria as 'categoria', c.nome as 'categoriaNome',p.imagem FROM Produto p INNER JOIN Categoria c ON p.categoria = c.id"
  );

  for (const linha of linhas) {
    let prod = {
      codigo: linha.codigo,
      descricao: linha.descricao,
      preco: linha.preco,
      categoria: linha.categoria,
      categoriaNome: linha.categoriaNome,
      imagem: linha.imagem,
    };

    result.push(prod);
  }

  return result;
}

export async function findProductsByCategory(categoria) {
  var result = [];

  const con = await getDbConnection();
  const linhas = await con.getAllAsync(
    "SELECT p.codigo, p.descricao, p.preco,p.categoria as 'categoria', c.nome as 'categoriaNome',p.imagem FROM Produto p INNER JOIN Categoria c ON p.categoria = c.id WHERE c.id = ?",
    [categoria]
  );

  for (const linha of linhas) {
    let prod = {
      codigo: linha.codigo,
      descricao: linha.descricao,
      preco: linha.preco,
      categoria: linha.categoria,
      categoriaNome: linha.categoriaNome,
      imagem: linha.imagem,
    };

    result.push(prod);
  }

  return result;
}

export async function findProductsByName(nome) {
  var result = [];

  const con = await getDbConnection();
  const linhas = await con.getAllAsync(
    "SELECT p.codigo, p.descricao, p.preco,p.categoria as 'categoria', c.nome as 'categoriaNome',p.imagem FROM Produto p INNER JOIN Categoria c ON p.categoria = c.id WHERE p.descricao LIKE ?",
    [`%${nome}%`]
  );

  for (const linha of linhas) {
    let prod = {
      codigo: linha.codigo,
      descricao: linha.descricao,
      preco: linha.preco,
      categoria: linha.categoria,
      categoriaNome: linha.categoriaNome,
      imagem: linha.imagem,
    };

    result.push(prod);
  }

  return result;
}

export async function adicionaProduto(produto) {
  try {
    console.log("Adicionando produto:");
    let con = await getDbConnection();

    const result = await con.runAsync(
      "insert into Produto (codigo, descricao, preco, categoria, imagem) values (?,?,?,?, ?)",
      [
        produto.codigo,
        produto.descricao,
        produto.preco,
        produto.categoria,
        produto.imagem,
      ]
    );

    await con.closeAsync();
    return result.changes == 1;
  } catch (error) {
    console.log("Erro ao adicionar produto:", error);
    return false;
  }
}

export async function excluirProduto(codigo) {
  let con = await getDbConnection();

  const result = await con.runAsync("delete from Produto where codigo = ?", [
    codigo,
  ]);
  await con.closeAsync();

  return result.changes == 1;
}

export async function editarProduto(produto) {
  let con = await getDbConnection();

  const result = await con.runAsync(
    "update Produto set descricao = ?, preco = ?, categoria = ?, imagem = ? where codigo = ?",
    [
      produto.descricao,
      produto.preco,
      produto.categoria,
      produto.imagem,
      produto.codigo,
    ]
  );
  await con.closeAsync();

  return result.changes == 1;
}
