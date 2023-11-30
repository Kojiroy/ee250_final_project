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

const publicKey = `-----BEGIN PUBLIC KEY-----;
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvFi8603oQ/SVIv4ttf4
+SNADtGhMrapo7Lh83Z+3FXhiEkfnujg4e4fMSL/6cSW3jAWJNbkIawEmJJz6ln2
gX6gLW01uREBVkW4CYStqAFhO6jc2ZKoeQw6ciI/CZ7TVGQMZZ7s9/HPYGKz9BDV
JratIbwKnqNGyQJM8RIL/JDq25vRfC5MJq5WW4OGBi0KpNfrfSDAc4aZ7b7dwPEw
YWqIKdZyIzUeXuXoWIvfy1+rw7cb/5HlYQl/N+PcKtHSEE06WpAYmYIZQB3RBEy+
usUpV+L2Ej7K4l4ZmFkOhnVOo2kuIjVs450x2NyY/0gni+VOBN4jgFCDt5I//eiu
8QIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC68WLzrTehD9JU
i/i21/j5I0AO0aEytqmjsuHzdn7cVeGISR+e6ODh7h8xIv/pxJbeMBYk1uQhrASY
knPqWfaBfqAtbTW5EQFWRbgJhK2oAWE7qNzZkqh5DDpyIj8JntNUZAxlnuz38c9g
YrP0ENUmtq0hvAqeo0bJAkzxEgv8kOrbm9F8LkwmrlZbg4YGLQqk1+t9IMBzhpnt
vt3A8TBhaogp1nIjNR5e5ehYi9/LX6vDtxv/keVhCX8349wq0dIQTTpakBiZghlA
HdEETL66xSlX4vYSPsriXhmYWQ6GdU6jaS4iNWzjnTHY3Jj/SCeL5U4E3iOAUIO3
kj/96K7xAgMBAAECggEAIiUXTAc6Jyym3+LuA2WIt+aom1xOK19iNkBk1U1yJ+f2
yOgEQsfp1VJjN5wbLpVF8iDJ1qI6am0LLNvpGKekZuwcMRfmrV4OBrY2wmRNvKc9
3YH/Dq1jILLrVO/s4CK2mk4o1oHT6gisdkAo+r39VLQehNAeB3IuqmXFbG29qzxz
zsbeBcAgpKThkdXtI/E4s0AORNPuNgFzjsK3mcKxp30noJfVLa9dUdu8j140/W7C
je9s4LJLkYlUUYK2GLFIaSm3MzHVHkzawHBxE9qs1pWDMnKE9ct4K9jMy8q3DfQq
BaaVekwW0WHCkvtOEnKDSJ7MbO3MscRJZwqQ1OqpvQKBgQDq9oCMFq9hpFaA5eNZ
s6wF9T9WJpsYC0mE/AtIxtl8DFUEsPF/lX2NLx0s195jm9HWKA2mnxSWTGRXpTqk
8UP2egfdxmZizL/nkoffDWZAoMV00l18pt/XQyHDcxfrtdmCRHbqvQX1mXgAmFz/
qZmsAWE7/v5j+rei4eTIog9mNQKBgQDLrjxwtOfKqhbQksqZTJwRqaaG32KZdEJ1
iVMqHtgWUhrPPn/vFVD6CKlzh60OGLVECaRGvGud4dwt7vQDH9bxg7cwJokpVNiK
q80ZqBNXS7sMiFm25gHR9V6uEBentMDnd0w7n7UugzJykOiKaC8uQ5S5Wwj2XENb
ICKG9IVNTQKBgDehp6wDjwDiZSzdwWeyt88tUxK1z1DxEzYuawmPM11AmjyjHHrl
zTVJa3H7pocVFKjNEPZbggdYDQYHdAwrp7jLCePDnuhTrDhLJGp2hLhWmInhaQsj
g6o3Fd5t+MLxao+CYFmR6cBN1vDlIlfSMzVbmkcXR+oqKaKiM4YhgN3lAoGATLla
fR44PkhqBbF17d9E3wZn+2BEdQetTTcog7JQtb/B55Vkfbwq37TJmAJgtvGpvnJf
VmH9q+B7nzXm5xJkVl/GbrXlbxNN6pai0OpWNskJMcRe/x2PS/bA7pKTRpI5JDf1
GHSlvFqhczSQ1CpAs42zhUr8ikjg+n+VYf7UA/UCgYA+AgUH+te0/gX6MY6JT+P5
1X24o+aRy0sIyawVl0Og2svrFcNPCRQzvdj4JJ6meNi4HzMDKP21sJ613stUD5w3
3UB81C/04X+V5v9O0ZyrVf4saOZQ7Wn+VYKul8Y+ddLw53hU9WzqtPab7Ozz/ZFZ
BerTOt1WvqRl1VwvZ7h/kw==
-----END PRIVATE KEY-----`;

async function decrypt() {
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  encrypt.setPrivateKey(privateKey);
  
  var encrypted_msg = encrypt.encrypt("light value");
  console.log("Encrypted Message " + encrypt.encrypt("Hello--------------------"));
  console.log("Decrypted Message " + encrypt.decrypt(encrypted_msg));
  global.window = temp_window;
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
    console.log(_result[0][0]["LightValue"]);
    })
    .catch((err) => {
        console.log(err);
    });
    decrypt();
    res.status(200).json({ message: 'Item updated successfully', body: result});
      // return NextResponse.json({message: "Item updated successfully"});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
    // return NextResponse.json({message: "An error occurred"});
  }
};
