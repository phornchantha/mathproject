function showPage(pageId) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

function caesarEncrypt() {
  const text = document.getElementById("caesarText").value.toLowerCase();
  const key = parseInt(document.getElementById("caesarKey").value);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i);
    if (char >= 97 && char <= 122) {
      let shifted = ((char - 97 + key) % 26) + 97;
      result += String.fromCharCode(shifted);
    } else {
      result += text[i];
    }
  }

  document.getElementById("caesarResult").innerText = result;
}

let n, e, d;

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return 1;
}

function generateRSA() {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  n = p * q;
  const phi = (p - 1) * (q - 1);
  e = 3;
  while (gcd(e, phi) !== 1) e++;
  d = modInverse(e, phi);
  document.getElementById("rsaKeys").innerText = `Public Key: (${e}, ${n}) | Private Key: (${d}, ${n})`;
  document.getElementById("rsaCipher").innerText = "";
  document.getElementById("rsaPlain").innerText = "";
}

function rsaEncrypt() {
  const m = parseInt(document.getElementById("rsaMessage").value);
  if (!n || !e) {
    alert("Please generate keys first!");
    return;
  }
  const c = modPow(m, e, n);
  document.getElementById("rsaCipher").innerText = `Cipher: ${c}`;
  document.getElementById("rsaPlain").innerText = "";
}

function rsaDecrypt() {
  const cText = document.getElementById("rsaCipher").innerText;
  if (!cText) {
    alert("Please encrypt a message first!");
    return;
  }
  const c = parseInt(cText.split(": ")[1]);
  const m = modPow(c, d, n);
  document.getElementById("rsaPlain").innerText = `Plain: ${m}`;
}

// Modular exponentiation for large powers
function modPow(base, exponent, modulus) {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}
