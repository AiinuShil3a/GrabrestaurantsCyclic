//ส่วนนี้ได้ย้ายไปใช้ในตัว token.service.ts แล้ว
interface User {
    accessToken?: string;
    [key: string]: any; // ใช้สำหรับ properties อื่นๆของ user object หากมี
}

export default function authHeader(): Record<string, string> {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user);

    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}
