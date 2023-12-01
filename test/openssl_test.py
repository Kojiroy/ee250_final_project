from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes

# Load the private key
with open('private_key.pem', 'rb') as f:
    private_key = serialization.load_pem_private_key(
        f.read(),
        password=None
    )

# Decrypt the message
encrypted_text = b'MJ4Pelw5k+M/mlHMD62Ypz3hnm38cjvS0YV+i7QHVSokv6yuSZyfFUTRV9cZ9DjZc7+kK4h/cbAhllssJqQd5SvfTLuS5IkvJ469ZGx0J2UZi69krrCN4JKPbtAAMgLXhHW2opvp7cZpiIYE8i8oOwIu9Fc64sRMfont4xoYWdNT/5YdiJHe7a104'
decrypted_text = private_key.decrypt(
    encrypted_text,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

print(decrypted_text.decode())