function setLogInWithExpiry(key, value){
    const now = new Date();
    const ttl = 1000 * 60 * 60 * 12;
    //ttl should match cookie expire age
    //cookie expire age is 1000 * 60 * 60 * 12 ms
    const login = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(login));
}

function getLogInWithExpiry(key){
    const loginStr = localStorage.getItem(key);
    if(!loginStr){
        return null;
    }
    const login = JSON.parse(loginStr);
    const now = new Date();

    if(now.getTime() > login.expiry){
        localStorage.removeItem(key);
        return null;
    }
    return login.value;
}

function setLogOut(key){
    localStorage.removeItem(key);
}

module.exports = {
    setLogInWithExpiry,
    getLogInWithExpiry,
    setLogOut
}