//ตัวจัดการเกี่ยวกับ Token
const getLocalRefreshToken = (): string | undefined => { //กำหนด type เป็น String หรือ ประเภทไม่รู้จักใช้ในกรณีอาจจะเป็นประเภทที่ซับซ้อนกว่าปกติ
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    return user?.refreshToken;
}

const getLocalAccessToken = (): string | undefined => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    return user?.accessToken;
}

const setLocalAccessToken = (token: string): void => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    if (user) {
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        user.accessToken = null;
        localStorage.setItem("user", JSON.stringify(user));
    }
}

const getUser = (): string | undefined => {
    const user = JSON.parse(localStorage.getItem("user") || 'null');
    return user
};

const setUser = (user: string | undefined): void => {
    localStorage.setItem("user", JSON.stringify(user))
}

const removeUser = () => {
    const user = localStorage.removeItem("user");
    return user
}

const authToken = {
    getLocalRefreshToken,
    getLocalAccessToken,
    setLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default authToken;
  