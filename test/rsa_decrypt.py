from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend
import time
from base64 import b64decode, b16decode
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5
from Crypto.PublicKey import RSA

encrypted_text = b'\x0b\x81gL\xe6?\xd9*\x8a7\\"=7#\x84\xb51\x909k\xd3_gu\xa3\x16T\xda\x9f\xda\x00)\x11/\x83T\x93$-\xf4q\x88I\x84\x99i\x17k\xd8hO\xdc\x98\xe2\x85VB6\xbe-3\xf7F\x99\xf55\x12G\x87\xab\xa3\xfet1_\xb3W\x83b\xbd\xa8\xb9z\tq\xa45\xf4\xf8v\x7fP\x87\xb0\x0e\x05O\xb4\xa5\x7f\x19\xe0Ow\x8c\xfeZ\x93\xa9\xca]\x04\xb4\xd4\x85\r\xbfE\x0f\xc2\xc8\xaa\x1e\xd3\xf6\xfe\xbb@\xbd\xd0\xd3\xcf\xea\x90\x1dT\xa3w\x18\x0e\xbb\xadY\xd4\xdc\xde\\\x9d\x03-\x1c?\x1a\x02\x03\xc7\x80\x8b\xb3\x8cueV\xd5\x8b|"\x06\x92q\xa23\xc7\x99\xfe\xb9\xdf\x850\x1d\xdc\x95_\xe9\xc8\x05\xb9\t5]5\xa8\x147\xa9\x0c\xf9\x89\x02]}\xbf[\x13=\xe2^\xc0d\xa7m\xa8&\xa5wt\x04\x8cLC\xb3\xe5\xfb\x04Y\xbe\x03w\xe2\x9d\x0c\x95\xa4\x87`$c\xf1\x10"\x94g\x80\xfa\'\x83\xfb3\x1e\xec\xf7\xf0btW'
encrypted_
# Read Public Key from File
# with open("public_key.pem", "rb") as key_file:
#     public_key = serialization.load_pem_public_key(
#         key_file.read(),
#         backend=default_backend()
#     )

# # Read Private Key from File
with open("private_key.pem", "rb") as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=None,
        backend=default_backend()
    )
# private_key = "MIICXQIBAAKBgQClFImg7N+5ziGtjrMDwN7frootgwrLUmbE9YFBtecnjchCRjAn1wqq69XiWynEv0q3/U91N5g0nJxeMuolSM8cwdQbT3KZFwQF6vreSzDNhfEYOsFVZknILLPiJpUYm5w3Gi34UeM60iHGH9EUnmQeVwKSG0WF2nK2SCU6EyfoJwIDAQABAoGAHHk2Y/N3g2zykiUS64rQ5nQMkV0Q95D2+PH/oX3mqQPjjsrcc4K77E9RTQG8aps0IBgpJGa6chixP+44RMYSMvRIK0wqgX7s6AFIkFIIM+v+bP9pd3kKaVKTcNIjfnKJZokgAnU0QVdf0zeSNElZC+2qe1FbblsSQ6sqaFmHaMECQQC4oZO+w0q2smQh7VZbM0fSIbdZEimX/4y9KN4VYzPQZkDzQcEQX1Al2YAP8eqlzB4r7QcpRJgvUQDODhzMUtP9AkEA5ORFhPVK5slpqYP7pj2F+D2xAoL9XkgBKmhVppD/Sje/vg4yEKCTQ7fRlIzSvtwAvbDJi3ytYqXQWVdaD/Eb8wJAdYC3k8ecTCu6WHFA7Wf0hIJausA5YngMLPLObFQnTLFXErm9UlsmmgATZZJz4LLIXPJMBXKXXD20Qm9u2oa4TQJBAKxBopP6KiFfSNabDkLAoFb+znzuaZGPrNjmZjcRfh6zr+hvNHxQ7CMVbnNWO7AJT8FyD2ubK71GvnLOC2hd8sMCQQCT70B5EpFqULt7RBvCa7wwJsmwaMZLhBcfNmbry/J9SZG3FVrfYf15r0SBRug7mT2gRmH+tvt/mFafjG50VCnw"

# start_time = time.time()
decrypted_text = private_key.decrypt(
    encrypted_text,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)
# print(encrypted_text)
# decode_data = b64decode(encrypted_text)
# if len(decode_data) == 127:
#     hex_fixed = '00' + decode_data.hex()
#     decode_data = b16decode(hex_fixed.upper())
# other_private_key = RSA.importKey(b64decode(private_key))
# cipher = Cipher_PKCS1_v1_5.new(other_private_key)
# decrypt_text = cipher.decrypt(decode_data, None).decode()
# print(decrypt_text)
# end_time = time.time()
# print(f"Asymmetric Decryption Time: {end_time - start_time}")
# print("")

print(f"Encrypted Text: {encrypted_text}")
print("")
print(f"Decrypted Text: {decrypted_text}")
print("")
