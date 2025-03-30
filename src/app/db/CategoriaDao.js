import getDbConnection from "./Connection";

export async function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS Categoria 
    (
        id text not null primary key,
        nome text not null
    )`;

  var con = await getDbConnection();
  await con.execAsync(query);
  await con.closeAsync();
}

export async function findAllCategorias() {
  try {
    var result = [];
    let con = await getDbConnection();
    const linhas = await con.getAllAsync("SELECT * FROM Categoria");

    for (const linha of linhas) {
      let cat = {
        id: linha.id,
        nome: linha.nome,
      };

      result.push(cat);
    }

    await con.closeAsync();
    return result;
  } catch (error) {
    console.error("Error in findAllCategorias:", error);
    throw error;
  }
}

export async function adicionaCategoria(categoria) {
  let con = await getDbConnection();

  const result = await con.runAsync(
    "insert into Categoria (id, nome) values (?,?)",
    [categoria.id, categoria.nome]
  );

  await con.closeAsync();
  return result.changes == 1;
}

export async function excluirCategoria(id) {
  let con = await getDbConnection();

  const result = await con.runAsync("delete from Categoria where id = ?", [id]);
  await con.closeAsync();

  return result.changes == 1;
}

export async function editaCategoria(categoria) {
  let con = await getDbConnection();

  const result = await con.runAsync(
    "update Categoria set nome = ? where id = ?",
    [categoria.nome, categoria.id]
  );
  await con.closeAsync();

  return result.changes == 1;
}
