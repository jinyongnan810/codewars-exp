// https://www.codewars.com/kata/5ef9c85dc41b4e000f9a645f

function scanner(qrCode) {
  var bits = "";
  const modeBlock =
    getBit(20, 20, qrCode) +
    getBit(20, 19, qrCode) +
    getBit(19, 20, qrCode) +
    getBit(19, 19, qrCode);
  const lenBlock =
    getBit(18, 20, qrCode) +
    getBit(18, 19, qrCode) +
    getBit(17, 20, qrCode) +
    getBit(17, 19, qrCode) +
    getBit(16, 20, qrCode) +
    getBit(16, 19, qrCode) +
    getBit(15, 20, qrCode) +
    getBit(15, 19, qrCode);
  const c1Block =
    getBit(14, 20, qrCode) +
    getBit(14, 19, qrCode) +
    getBit(13, 20, qrCode) +
    getBit(13, 19, qrCode) +
    getBit(12, 20, qrCode) +
    getBit(12, 19, qrCode) +
    getBit(11, 20, qrCode) +
    getBit(11, 19, qrCode);
  const c2Block =
    getBit(10, 20, qrCode) +
    getBit(10, 19, qrCode) +
    getBit(9, 20, qrCode) +
    getBit(9, 19, qrCode) +
    getBit(9, 18, qrCode) +
    getBit(9, 17, qrCode) +
    getBit(10, 18, qrCode) +
    getBit(10, 17, qrCode);
  const c3Block =
    getBit(11, 18, qrCode) +
    getBit(11, 17, qrCode) +
    getBit(12, 18, qrCode) +
    getBit(12, 17, qrCode) +
    getBit(13, 18, qrCode) +
    getBit(13, 17, qrCode) +
    getBit(14, 18, qrCode) +
    getBit(14, 17, qrCode);
  const c4Block =
    getBit(15, 18, qrCode) +
    getBit(15, 17, qrCode) +
    getBit(16, 18, qrCode) +
    getBit(16, 17, qrCode) +
    getBit(17, 18, qrCode) +
    getBit(17, 17, qrCode) +
    getBit(18, 18, qrCode) +
    getBit(18, 17, qrCode);
  const c5Block =
    getBit(19, 18, qrCode) +
    getBit(19, 17, qrCode) +
    getBit(20, 18, qrCode) +
    getBit(20, 17, qrCode) +
    getBit(20, 16, qrCode) +
    getBit(20, 15, qrCode) +
    getBit(19, 16, qrCode) +
    getBit(19, 15, qrCode);
  const c6Block =
    getBit(18, 16, qrCode) +
    getBit(18, 15, qrCode) +
    getBit(17, 16, qrCode) +
    getBit(17, 15, qrCode) +
    getBit(16, 16, qrCode) +
    getBit(16, 15, qrCode) +
    getBit(15, 16, qrCode) +
    getBit(15, 15, qrCode);
  const c7Block =
    getBit(14, 16, qrCode) +
    getBit(14, 15, qrCode) +
    getBit(13, 16, qrCode) +
    getBit(13, 15, qrCode) +
    getBit(12, 16, qrCode) +
    getBit(12, 15, qrCode) +
    getBit(11, 16, qrCode) +
    getBit(11, 15, qrCode);
  const c8Block =
    getBit(10, 16, qrCode) +
    getBit(10, 15, qrCode) +
    getBit(9, 16, qrCode) +
    getBit(9, 15, qrCode) +
    getBit(9, 14, qrCode) +
    getBit(9, 13, qrCode) +
    getBit(10, 14, qrCode) +
    getBit(10, 13, qrCode);
  const message = [
    binaryToChar(c1Block),
    binaryToChar(c2Block),
    binaryToChar(c3Block),
    binaryToChar(c4Block),
    binaryToChar(c5Block),
    binaryToChar(c6Block),
    binaryToChar(c7Block),
    binaryToChar(c8Block),
  ];
  const msgLen = binaryToDecimal(lenBlock);
  return message.slice(0, msgLen).join("");
}

const getBit = (x, y, qrCode) => {
  const dot = qrCode[x][y];
  if ((x + y) % 2 == 0) {
    return dot == "1" ? "0" : "1";
  }
  return dot;
};
const binaryToDecimal = (binary) => {
  return parseInt(binary, 2);
};
const binaryToChar = (binary) => {
  const charCode = binaryToDecimal(binary);
  return String.fromCharCode([charCode])[0];
};

/* Hi
[ 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1 ],
[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1 ],
[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],
[ 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1 ],
[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1 ],
[ 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0 ],
[ 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0 ],
[ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1 ],
[ 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ],
[ 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1 ],
[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0 ],
[ 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1 ]
*/
// other people's
function scanner(qrcode) {
  let seq = "",
    x = qrcode.length - 1,
    y = qrcode[0].length - 1,
    dir = -1;
  while (seq.length < 76) {
    seq += (x + y) % 2 === 0 ? 1 - qrcode[x][y] : qrcode[x][y];
    seq += (x + y - 1) % 2 === 0 ? 1 - qrcode[x][y - 1] : qrcode[x][y - 1];
    x += dir;
    if (seq.length % 24 === 0) {
      x -= dir;
      dir *= -1;
      y -= 2;
    }
  }
  let num = parseInt(seq.slice(4, 12), 2);
  let result = "";
  for (let i = 0; i < num; ++i) {
    result += String.fromCharCode(
      parseInt(seq.slice(12 + i * 8, 12 + (i + 1) * 8), 2)
    );
  }
  return result;
}
