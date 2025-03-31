import getDbConnection from "./Connection";

export async function createTables() {
    const queryPedido = `
      CREATE TABLE IF NOT EXISTS Pedido (
          codigo TEXT PRIMARY KEY,
          endereco TEXT NOT NULL,
          data DATETIME NOT NULL
      );`;

    const queryItemPedido = `
      CREATE TABLE IF NOT EXISTS ItemPedido (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codigoPedido TEXT NOT NULL,
          descricao TEXT NOT NULL,
          quantidade INTEGER NOT NULL,
          preco REAL NOT NULL,
          total REAL NOT NULL,
          FOREIGN KEY (codigoPedido) REFERENCES Pedido(codigo) ON DELETE CASCADE
      );`;

    try {
        const con = await getDbConnection();

        await con.execAsync("PRAGMA foreign_keys = ON;");

        await con.execAsync(queryPedido);
        await con.execAsync(queryItemPedido);

        con.closeAsync();
        console.log("Tabelas criadas com sucesso!");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
}


export async function findAllPedidos() {
    const result = [];

    try {
        const con = await getDbConnection();

        const pedidos = await con.getAllAsync("SELECT * FROM Pedido");

        for (const pedido of pedidos) {
            const itens = await con.getAllAsync(
                "SELECT descricao, quantidade, preco, total FROM ItemPedido WHERE codigoPedido = ?",
                [pedido.codigo]
            );

            result.push({
                codigo: pedido.codigo,
                endereco: pedido.endereco,
                data: pedido.data,
                itens: itens,
            });
        }

        await con.closeAsync();
        return result;
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return [];
    }
}


export async function adicionaPedido(pedido) {
    try {
        console.log("Adicionando pedido:");

        const con = await getDbConnection();
        await con.execAsync("PRAGMA foreign_keys = ON;");

        await con.execAsync("BEGIN TRANSACTION");

        await con.runAsync(
            "INSERT INTO Pedido (codigo, endereco, data) VALUES (?, ?, ?)",
            [pedido.codigo, pedido.endereco, pedido.data]
        );

        for (const item of pedido.itens) {
            await con.runAsync(
                `INSERT INTO ItemPedido (codigoPedido, descricao, quantidade, preco, total) 
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    pedido.codigo,
                    item.descricao,
                    item.quantidade,
                    item.preco,
                    item.preco * item.quantidade,
                ]
            );
        }

        await con.execAsync("COMMIT");
        await con.closeAsync();

        console.log("Pedido adicionado com sucesso!");
        return true;
    } catch (error) {
        console.error("Erro ao adicionar pedido:", error);

        try {
            await con.execAsync("ROLLBACK");
        } catch (rollbackError) {
            console.error("Erro ao fazer rollback:", rollbackError);
        }

        return false;
    }
}
