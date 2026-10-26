import path from "path";
import fs from "fs";

const DB_PATH = path.join(import.meta.dirname, "../data/users.json");

export function readUsers(){
    const users = fs.readFileSync(DB_PATH, "utf-8").trim();
    if(!users) return [];
    return JSON.parse(users);
}
 
export function writeUsers(users){
    const par_users = JSON.stringify(users, null, 2);
    fs.writeFileSync(DB_PATH, par_users, "utf-8");
}

export function findByEmail(email){
    return readUsers().find((u) => u.email === email) || null;
}
export function findById(id){
    return readUsers().find((u) => u.id === id) || null;
}