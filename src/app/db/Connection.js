import * as SQLite from 'expo-sqlite';

export default async function getDbConnection() {
    const db = await SQLite.openDatabaseAsync('dbAquelaLoja.db');
    return db;
}