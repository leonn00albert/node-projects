key = "-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAuNCDBqIIYctprA0ScVM1Ccm7EGEd0uRnwV6Qb4tn5+n/TWoELKw+4aSi89fPUFeunQJo1OxcMhzmmzU/GgyWLVoQL3GUNtJ4TRntmQ9jis9O97dg3LHYvmhUUR4ZuXlHITPukDl0XBsaL6j2/+NTLDYQxAKVewlYRcs/04jrAg8aQ3d6ZHQh4M3Bt4gN7dVxVAzyMycxmco5beBVxb2yEV0MMq3iTxZ0jJclXFGvO1nZ9cIYH+1hjC7sZi/suwmVBseZ6EaZQNRJVDzNJ0coD7WGCXCIoD1EBLSQwXxT05I1MCkjVS2Y2eVJulAt8ckZ1Ab7miHtnkIz975O701l8QIDAQABAoIBAGyrNg/FYJZYK9ddjFWULmCF/HdCE244nQVnXBgqaTtFLLfROYkm8oZs7t/gKmc8V1C85PUl0YQp2DK02Viww/EAvvmWmCawFMqJD1rrYIVzJiSj79F0xVQYNlPIFiontHpCdejZz6CE0x3pBOsrOHGLjMokFs7UjNHlE6+HF2AKjhPCoVXR+tm+EYHPLLpvxQ7X7o1dwMQMadwkkzllTRIdzMWSZ6VHg8x6ebm+BjDqp+XMhZxYaveHwT1BKpdMg5Zv7YO43+P3KPpet0rUhNKZY8gkKTLlErjniBOjYTmAinhLtE2Rlj4N4uoxp9Q8x+fihNfF8TeKr7wEn0is3MECgYEA8ddHqIEktqeimlxiyJiDpPvoHMeAJEyS5ppPpnqj8rJjBhr0Fz0RWeDemd+YDWf7nyVSJY5MOqYSC2ydnuzNMPBVN4GDqdj0XQWUEiUmu+4XHaDiOO8+WfYH1h31Kw9ijrrPjpp7+nLihssriyoApMaFlz58uvwgAF5mPryPEMkCgYEAw6KEiph273k7Bd/jQK9/yV0xX6VatMYwipR9nbIHTytaMyN06EUUURzeMO/7SdXcP3mL8JHyvINjbquF72NFcJ4G18BN175MFUyzjE1dCBh2f7rEazbZm6V/AonIN9WL8ij2xxVxMye4F0HV03u02GEON/+oJA4AboiloOoEp+kCgYEAxOysr/xA3e7Qy+rQkVEHWS+6iLy2jlhAAkDC/Oe+WmCBm7YU7ltOpqYh/KACG2CBlsx4AJbHYbZa2SyfiIqAZwo8Cc+PW52LFbf2I3RW/w5Xiku4Ce5eEjjxlpucSGzlrx1U52TJ8VzdMi98DHyuO35fx5EdVdD5afN0RD+cK2kCgYAeXtZwpaahGpLdIJqo6hXObtdBX+wq8DGM8exmVMLpuXMxSSnW/RJgXTjpI/hAyCB/AiGFYULrnQIMpjgOp7yZ9Q5e5A2xlms9S0D8YO42WYXb4mSnuEYj8Zc8D6Ozd0VYfJ+C3INMS7g6dA/72tKCXN7WNqwlnL7YagI8btf2MQKBgQDMe4S82qcQdy7jXg+L4YZVFJI2b4hZHtMD6xhqcwx1adB0MmoF2KScpzp5vJuZzsVdrAZ8jtNE6xFcBWsnjfKmY8iOm62JgOiY1MgCjIhhR1jbF7SHz8jdeAXuQ9JEVn3GfmIV/VVanYj0JEbwGxKSP2pJ/XCHC7SbxE5spOOQAw==-----END RSA PRIVATE KEY-----";
keyBegin = "-----BEGIN RSA PRIVATE KEY-----"
keyBeginLength = keyBegin.length;
console.log(keyBeginLength)
keyStart =  key.slice(0, keyBeginLength);
console.log(keyStart)

keyEnd = "-----END RSA PRIVATE KEY-----"
keyEndIndex = key.search(keyEnd);

console.log(keyEndIndex)
keyFin =  key.slice(keyEndIndex, keyEndIndex+keyEnd.length);
console.log(keyFin)

keyMid = key.slice(keyBeginLength,keyEndIndex)
console.log(keyMid)

const keyNew = '-----BEGIN RSA PRIVATE KEY-----\n'+ keyMid+'\n'+ '-----END RSA PRIVATE KEY-----';
console.log(keyNew)