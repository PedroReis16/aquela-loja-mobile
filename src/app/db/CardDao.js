import getDbConnection from "./Connection";

export async function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS userCard 
    (
        id text not null primary key,
        userId text not null,
        holderName text not null,
        cardNumber text not null,
        type text not null,
        expirationDate text not null,
        cvv text not null
    )`;

  var con = await getDbConnection();
  await con.execAsync(query);
  await con.closeAsync();
}

export async function findAllCards({ userId }) {
  var result = [];
  let con = await getDbConnection();
  const linhas = await con.getAllAsync("SELECT * FROM userCard ");

  for (const linha of linhas) {
    let card = {
      id: linha.id,
      userId: linha.userId,
      holderName: linha.holderName,
      cardNumber: linha.cardNumber,
      type: linha.type,
      expiryDate: linha.expiryDate,
      cvv: linha.cvv,
    };

    result.push(card);
  }

  return result;
}

export async function addCard(card) {
  try {
    let con = await getDbConnection();

    const result = await con.runAsync(
      "insert into userCard (id, userId, holderName, cardNumber, type, expirationDate, cvv) values (?,?,?,?,?,?,?)",
      [
        createUniqueId(),
        card.userId,
        card.holderName,
        card.cardNumber,
        card.type,
        card.expiryDate,
        card.cvv,
      ]
    );

    await con.closeAsync();
    return result.changes == 1;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteCard(id) {
  let con = await getDbConnection();

  const result = await con.runAsync("delete from userCard where id = ?", [id]);
  await con.closeAsync();

  return result.changes == 1;
}

function createUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
}
