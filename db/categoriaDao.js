import getDbConnection from "./connection";

export async function createTable() {
    const query = `CREATE TABLE IF NOT EXISTS Categoria 
    (
        id text not null primary key,
        nome text not null
    )`;

    var con = await getDbConnection();
    await con.execAsync(query)
    await con.closeAsync();
}

export async function findAllCategorias() {

    var result = [];
    let con = await getDbConnection();
    const linhas = await con.getAllAsync('SELECT * FROM Categoria');

    for (const linha of linhas) {
        let cat = {
            id: linha.id,
            nome: linha.nome 
        }

        result.push(cat);
    }

    return result;
}

export async function adicionaCategoria(categoria) {
    let con = await getDbConnection();

    const result = await con.runAsync
        ('insert into Categoria (id, nome) values (?,?)', [categoria.id, categoria.nome]);

    await con.closeAsync();
    return result.changes == 1;
}