import connection from '../mysql';

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

async function encrypt(int_message) {
  global.window = undefined;
  var message = int_message + '';
  const JSEncrypt = (await import('jsencrypt')).default;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  const encrypted_msg = encrypt.encrypt(message);
  console.log("Original Message: " + message);
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
        return encrypted_val;
      })
    }
    else if (type === "motion"){
      result["MotionValue"] = encrypt(result["MotionValue"])
      .then((encrypted_val) => {
        result["MotionValue"] = encrypted_val;
        res.status(200).json({ message: 'Item updated successfully', body: result});
        return encrypted_val;
      })
    }
    else if (type === "button"){
      encrypt(result["Count"])
      .then((encrypted_val) => {
        result["Count"] = encrypted_val;
        res.status(200).json({ message: 'Item updated successfully', body: result});
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
