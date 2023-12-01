from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes
import base64
# Load the private key
with open('private.pem', 'rb') as f:
    private_key = serialization.load_pem_private_key(
        f.read(),
        password=None
    )

# Load the encrypted data
# with open('data.txt.enc', 'rb') as f:
#     encrypted_data = f.read()
encrypted_data = 'bcrwCYFWCmebXxIINpuwh8/DUGcflsdQSwyEwfznxHTQ7obn/pC4E9A0rcnIshwRXrglH98F09frwGc1vINjd2mT5S1D3Jlv2RIXepNtOgrEkHnxNbKy9Z23NKsoJmFl61SbyK1gMisBM285R4k8CHB386U66Y+L3vGhpuZJZIhVC0AiZUYXILu2KX9TZI4e6IOWa1pOkQNGK83V4Iy8X2GcCCBBQzAU/BOvRRmNs7vhX1GtjhRxMTB/BtrewNYOwRjj8U0VRGPAFSUPzToarmB8AZ6oLx7+vk1k6P5oqTV0ub4Nl6dym6RLgzzH4zSAn0SSxS+dayD3tpiaWrtThw=='
bin_enc_data = base64.b64decode(encrypted_data)

with open("test.bin", 'wb') as f:
    f.write(bin_enc_data)
print(bin_enc_data)
# Decrypt the data
decrypted_data = private_key.decrypt(
    bin_enc_data,
    padding.PKCS1v15(),
)

print(decrypted_data.decode())
print(decrypted_data)
