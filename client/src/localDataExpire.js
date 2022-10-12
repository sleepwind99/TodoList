export const localDataRead = k => {
  if(localStorage.getItem(k) == null) return null;
  const data = JSON.parse(localStorage.getItem(k));
  if(data.expire < Date.now()){
    localStorage.removeItem(k);
    return null;
  }
  return JSON.parse(localStorage.getItem(k)).value;
}
/** localDataWrite(key, value) store value in localStorage using key */
export const localDataWrite = (k, v) =>{
  const data = {
    value : v,
    expire : Date.now() + (1000*60*60)
  }
  localStorage.setItem(k, JSON.stringify(data));
}