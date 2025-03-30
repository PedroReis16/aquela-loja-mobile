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
    const linhas = await con.getAllAsync('SELECT * FROM Produto')

    for (const linha of linhas) {
        let prod = {
            codigo: linha.codigo,
            descricao: linha.descricao ,
            preco: linha.preco,
            categoria: linha.categoria,
            imagem: linha.imagem
        }

        result.push(prod);
    }

    return result;
}

export async function adicionaProduto(produto) {
    let con = await getDbConnection();

    const result = await con.runAsync
        ('insert into Produto (codigo, descricao, preco, categoria, imagem) values (?,?,?,?, ?)',
             [produto.codigo, produto.descricao, produto.preco, produto.categoria, produto.imagem]);

    await con.closeAsync();
    return result.changes == 1;
}