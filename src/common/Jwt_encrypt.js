import CryptoJS from "crypto-js";
const Jwt_encrypt = ({ token }) => {
    const secretPass = "XkhZG4fW2t2W";
    const data = CryptoJS.AES.encrypt(JSON.stringify(token), secretPass).toString();
    return (data)
}

export default Jwt_encrypt