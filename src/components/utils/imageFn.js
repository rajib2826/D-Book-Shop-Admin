// convert a base64 image file to image dom element
function _createImg(photo) {
  const img = new Image();
  img.src = photo;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
}

function _resizer(img, size) {
  let x = 0,
    y = 0,
    w = img.naturalWidth,
    h = img.naturalHeight;

  if (img.naturalWidth > img.naturalHeight) {
    if (img.naturalWidth > size) {
      w = size;
      h = (size * img.naturalHeight) / img.naturalWidth;
    }
  } else {
    if (img.naturalHeight > size) {
      h = size;
      w = (size * img.naturalWidth) / img.naturalHeight;
    }
  }

  return [x, y, w, h];
}

function _cropper(img, size) {
  let x = 0,
    y = 0,
    w = size,
    h = size;

  if (img.naturalWidth > img.naturalHeight) {
    w = (size * img.naturalWidth) / img.naturalHeight;
    x = -Math.abs(w - size) / 2;
  } else {
    h = (size * img.naturalHeight) / img.naturalWidth;
    y = -Math.abs(h - size) / 2;
  }
  return [x, y, w, h];
}

async function getBase64URL(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Only images are accepted (jpg, jpeg, gif, png)');
  }

  if (file.size < 1000) {
    throw new Error(
      'Please upload a high resolution image. Picture size minimum 10KB required!'
    );
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

async function resizeImg(photo, size, crop = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = await _createImg(photo);

  const [x, y, w, h] = crop ? _cropper(img, size) : _resizer(img, size);
  canvas.width = crop ? size : w;
  canvas.height = crop ? size : h;

  ctx.drawImage(img, x, y, w, h);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}

export { resizeImg, getBase64URL };
