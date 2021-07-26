let b = document.getElementById("mycanavas2");
let ctxs = b.getContext("2d");

let load = (srcs, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = srcs;
};
let imagePaths = (frameNumbers, animations) => {
  return "../sai/" + animations + "" + frameNumbers + ".png";
};

let framess = {
  normal: [1, 2, 3, 4, 5, 6, 7, 8],
  beat: [1, 2, 3, 4, 5, 6, 7],
  touch: [1, 2, 3, 4, 5, 6, 7],
  stop: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  front: [1, 2, 3, 4, 5, 6],
  back: [1, 2, 3, 4, 5, 6],
};

let loadImagess = (callback) => {
  let imagess = {
    normal: [],
    beat: [],
    touch: [],
    stop: [],
    front: [],
    back: [],
  };

  let imageToLoads = 0;

  ["normal", "beat", "touch", "stop", "front", "back"].forEach((animations) => {
    let animationFramess = framess[animations];
    imageToLoads = imageToLoads + animationFramess.length;

    animationFramess.forEach((frameNumbers) => {
      let paths = imagePaths(frameNumbers, animations);

      load(paths, (imag) => {
        imagess[animations][frameNumbers - 1] = imag;
        imageToLoads = imageToLoads - 1;

        if (imageToLoads === 0) {
          callback(imagess);
        }
      });
    });
  });
};

let animates = (ctxs, imagess, animations, callback) => {
  imagess[animations].forEach((imag, indexs) => {
    setTimeout(() => {
      ctxs.clearRect(0, 0, 500, 500);
      ctxs.drawImage(imag, 0, 0, 500, 500);
    }, indexs * 100);
  });
  setTimeout(callback, imagess[animations].length * 100);
};
loadImagess((imagess) => {
  let queuedAnimationss = [];
  let auxs = () => {
    let selectedAnimations;
    if (queuedAnimationss.length === 0) {
      selectedAnimations = "normal";
    } else {
      selectedAnimations = queuedAnimationss.shift();
    }
    animates(ctxs, imagess, selectedAnimations, auxs);
  };
  auxs();
  document.getElementById("kick2").onclick = () => {
    queuedAnimationss.push("beat");
  };
  document.getElementById("punch2").onclick = () => {
    queuedAnimationss.push("touch");
  };
  document.getElementById("block2").onclick = () => {
    queuedAnimationss.push("stop");
  };
  document.getElementById("forword2").onclick = () => {
    queuedAnimationss.push("front");
  };
  document.getElementById("backword2").onclick = () => {
    queuedAnimationss.push("back");
  };
});
