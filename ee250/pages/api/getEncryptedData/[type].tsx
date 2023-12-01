'use client'
import connection from '../mysql';
import { NextResponse } from 'next/server';


// var publicKey = '-----BEGIN PUBLIC KEY-----';
// publicKey += 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvFi8603oQ/SVIv4ttf4';
// publicKey += '+SNADtGhMrapo7Lh83Z+3FXhiEkfnujg4e4fMSL/6cSW3jAWJNbkIawEmJJz6ln2';
// publicKey += 'gX6gLW01uREBVkW4CYStqAFhO6jc2ZKoeQw6ciI/CZ7TVGQMZZ7s9/HPYGKz9BDV';
// publicKey += 'JratIbwKnqNGyQJM8RIL/JDq25vRfC5MJq5WW4OGBi0KpNfrfSDAc4aZ7b7dwPEw';
// publicKey += 'YWqIKdZyIzUeXuXoWIvfy1+rw7cb/5HlYQl/N+PcKtHSEE06WpAYmYIZQB3RBEy+';
// publicKey += 'usUpV+L2Ej7K4l4ZmFkOhnVOo2kuIjVs450x2NyY/0gni+VOBN4jgFCDt5I//eiu';
// publicKey += '8QIDAQAB';
// publicKey += '-----END PUBLIC KEY-----';

const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnCi3UbCMCkb2yueWxR93
yh+nO8FHq72GyqoykHjzUbKtHPgLoosiUlvNi+jc65OXRAhUqbM/5Vg0rGkjsOWd
zYddGpLciVfziSCCsaWEOA5g/xGaqx05MKLIoDpEHiEypXrez8DORHp5AZ9CmVOz
orzZa/WHBz6aGs0qO8glCQnbtkhqx+fZMQbJ3DKmz719mtSPj6w8QWpNGnCJzvaD
QdJi9hWELYUZOKzJQux7MlGR8+XkV6TzHdJ7ybzCR/GOjEdXwCiCn63WBSLlh0EL
tmKnYaTPcWzWucsqDAfdV1xLkDbcPRJafVeuMlr0pq43mSLEsRSP19jgRugK1K/Q
JQIDAQAB
-----END PUBLIC KEY-----
`;

const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcKLdRsIwKRvbK
55bFH3fKH6c7wUervYbKqjKQePNRsq0c+AuiiyJSW82L6Nzrk5dECFSpsz/lWDSs
aSOw5Z3Nh10aktyJV/OJIIKxpYQ4DmD/EZqrHTkwosigOkQeITKlet7PwM5EenkB
n0KZU7OivNlr9YcHPpoazSo7yCUJCdu2SGrH59kxBsncMqbPvX2a1I+PrDxBak0a
cInO9oNB0mL2FYQthRk4rMlC7HsyUZHz5eRXpPMd0nvJvMJH8Y6MR1fAKIKfrdYF
IuWHQQu2YqdhpM9xbNa5yyoMB91XXEuQNtw9Elp9V64yWvSmrjeZIsSxFI/X2OBG
6ArUr9AlAgMBAAECggEABgSfrqXsz7HqbZQSlb2KYp9o/37fDI789ISDTFliRIIW
n9ODXJvwvQHNYG30ovOI1IC0WpHjjYAiZN6XFzMngLXjGv9mlmMYVJmMeod+xUub
O1k/VQbcSbPhos3RYDk2osqjGZiRmnFUhoElEj734PasM7fo9e4uBt2570cy/i/J
R6y9lyHT0zaDXGTx7wRV91smVKDJy9LvyPzptUBooaaPegUqnF1tLNpvvXiVCWgL
u8hj+1ukEuZFK44lJ49zwO/PBMq12FTFI89M3OzxevDjgkxmbKKJ7etMDti5kz6P
HSZNDcJjt1e/QXaymL45tloqHAWGXmi0lOMO4bo5QQKBgQDYnCFlBhaiIqiX2xoB
QR2MwNg7OMScYX++dHHDVG8GlSQrAKNy77bqAhgioLpBGdnf4iIQ51Oxs4apEMBe
m4rdEh7comBhU/WdsXtFfqosx0613o4FZdHneWwHb4qLpiX+/hEWsLatUDHFpMLI
2+1yYUmVcA32bD7Pk9q1bZPgNQKBgQC4jmjYbbbVCZqDeQp9oBlNsbNQnJgdoiXb
uRTVu8JSMu2wwQuQFunVppaeMkNFe5ayhqdM2+XfR0Iv2xQJFofOUz8n+X0gjFu7
h0UJHs6CgYE7FHs7DrehMS21Ot5g7tvZqKzDAhfAU54gpqsvzTzJwStFzfPO6TZc
wqFgIoMOMQKBgHta3sGzZ+xJpI1mXzbbqEJiCEIhoAYWmDMUCT1dtiSfhotev7ZS
wW4eZzRBKBCu8h7HnvLVahpGzKc3PPYjyj7/dMfdSNnkgHmfez4mVi9OCYsVBPgZ
9iHGSjkp0lKY+gZvFbhARqgIhW+y1qKgbGa49Li/qZPuLQ71epXbo10JAoGATZud
HT3tv2I9doHk1nUHjvNl60Uedn+kGeSXjVVaXsSJzWUwXpQ0GqLl/Xo3bbWN5l7X
ZWunG6BUhdlDcJrn2uyIx1+Trac4QACfGDm7L4gT9usi8u+6am9KwEYUE4D+NGZI
1+w+XqMLAMH1hLFymYjAkKcNmnnZYWJ7B/kbUVECgYBk2TImXY2UwRjAKE7lIrCU
knEF2RJYoRcxdispnh9Rz1/A0RFNLvDrIrBP5dKpB8QRJORzBirroco/EZtq1y9R
l/yfdjs9uyAzaZgE6/EdhcFrddwpYoUn3r9H7iXfPuCzgq3QzT9YcNvz/iL4klf3
PwOeKVYuLM1oA0Fi1Vkpgw==
-----END PRIVATE KEY-----
`;

async function decrypt(message) {
  global.window = undefined;
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privateKey);
  // encrypt.setPublicKey(publicKey);

  const decrypted_message = encrypt.decrypt(message);
  console.log("Decrypted Message " + decrypted_message);
  return decrypted_message;
}

async function encrypt(int_message) {
  global.window = undefined;
  var message = int_message + '';
  console.log(typeof(message));
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt();
  // encrypt.setPrivateKey(privateKey);
  encrypt.setPublicKey(publicKey);
  // encrypt.setPrivateKey(privateKey);
  
  const encrypted_msg = encrypt.encrypt(message);
  console.log("Original Message: " + message);
  console.log("Encrypted Message " + encrypted_msg);
  return encrypted_msg;
}

export default async function GET(req, res) {
  const { type} = req.query;
  const data_type = `${type}_data`;
  const query = `SELECT * FROM ${data_type} ORDER BY Date DESC LIMIT 1`;
  var result;
  try {
    console.log("type: "+data_type);
    await connection.promise().query(query)
    .then((_result) =>{
    result = _result[0][0];
    if (type === "light"){
      result["LightValue"] = encrypt(result["LightValue"])
      .then((encrypted_val) => {
        result["LightValue"] = encrypted_val;
        res.status(200).json({ message: 'Item updated successfully', body: result});
        decrypt(result["LightValue"])
        .then((data) => {
          console.log(data);
        })
        return encrypted_val;
      })
    }
    else if (type === "motion"){
      result["MotionValue"] = encrypt(result["MotionValue"])
      .then((encrypted_val) => {
        result["MotionValue"] = encrypted_val;
        res.status(200).json({ message: 'Item updated successfully', body: result});
        decrypt(result["MotionValue"])
        .then((data) => {
          console.log(data);
        })
        return encrypted_val;
      })
    }
    else if (type === "button"){
      encrypt(result["Count"])
      .then((encrypted_val) => {
        result["Count"] = encrypted_val;
        res.status(200).json({ message: 'Item updated successfully', body: result});
        decrypt(result["Count"])
        .then((data) => {
          console.log(data);
        })
        return encrypted_val;
      })
    }
    })
    .catch((err) => {
        console.log(err);
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
