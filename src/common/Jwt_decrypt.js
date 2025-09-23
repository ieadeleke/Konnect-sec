import CryptoJS from "crypto-js";
const Jwt_decrypt = ({ token }) => {
    const secretPass = "XkhZG4fW2t2W";
    const bytes = CryptoJS.AES.decrypt(token, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return (data)
}

export default Jwt_decrypt