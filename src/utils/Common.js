import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";

export const GetHash = (content) => {
  const hashedContent = SHA256(content).toString(CryptoJS.enc.Hex);
  return hashedContent;
  //user = user.replace(/[^a-zA-Z0-9]/g, '');
};
