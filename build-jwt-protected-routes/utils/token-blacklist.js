

const blacklist = new Set();

export function blacklistToken(token){
    blacklist.add(token);
    return ;
}

export function isBlacklisted(token){
    if(blacklist.has(token)){
        return true;
    }
    return false;
}