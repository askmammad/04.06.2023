let input = document.getElementById("files");
let preview = document.getElementById("images_preview");
let upload = document.getElementById("upload");
var dropZone = document.getElementById("upper_container");
let imagesPreviewArray = [];
var count = 0;

dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("dragleave", handleDragLeave, false);
dropZone.addEventListener("drop", handleFileSelect, false);

function handleDragOver(event) {
  event.stopPropagation();
  event.preventDefault();
  dropZone.classList.add("highlight");
}

function handleDragLeave(event) {
  event.stopPropagation();
  event.preventDefault();
  dropZone.classList.remove("highlight");
}

function handleFileSelect(event) {
  event.stopPropagation();
  event.preventDefault();
  dropZone.classList.remove("highlight");
  var files = event.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    let img = files[i];
    let dotindex = img.name.indexOf(".") + 1;
    let ext = img.name.substring(dotindex).toLowerCase();
    if (ext === "png" || ext === "jpeg" || ext === "jpg") {
      if (files.length > 0) {
        upload.classList.remove("non-visible");
        upload.classList.add("visible");
      }
      uploadDraggedFile(files[i]);
    } else {
      alert("Wrong type of file");
    }
  }
  console.log(imagesPreviewArray);
}

function uploadDraggedFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    count++;
    let image = new Image(80, 80);
    image.src = reader.result;
    file.newId = count;
    imagesPreviewArray.push(file);
    var previewCard = document.createElement("div");
    var cardInner = `
            <div class="imageUploadBox">
                            <img class="imageUpload" src="${image.src}" alt="">
                            <div>
                                <h5>${file.name}</h5>
                                <p>${file.type}</p>
                                <p>${file.size}</p>
                            </div>
                            <button class="btn_remove" id="${count}" onclick="PreviewItemRemove(${count});">X</button>
            </div>
          `;
    previewCard.innerHTML = cardInner;
    preview.appendChild(previewCard);
  });
}

function myFunction() {
  for (let i = 0; i < input.files.length; i++) {
    let img = input.files[i];
    let dotindex = img.name.indexOf(".") + 1;
    let ext = img.name.substring(dotindex).toLowerCase();
    if (ext === "png" || ext === "jpeg" || ext === "jpg") {
      if (input.files.length > 0) {
        upload.classList.remove("non-visible");
        upload.classList.add("visible");
      }
      let reader = new FileReader();
      reader.readAsDataURL(input.files[i]);
      reader.addEventListener("load", () => {
        count++;
        let image = new Image(80, 80);
        image.src = reader.result;
        input.files[i].newId = count;
        imagesPreviewArray.push(input.files[i]);
        var previewCard = document.createElement("div");
        var cardInner = `
            <div class="imageUploadBox">
                            <img class="imageUpload" src="${image.src}" alt="">
                            <div>
                                <h5>${input.files[i].name}</h5>
                                <p>${input.files[i].type}</p>
                                <p>${input.files[i].size}</p>
                            </div>
                            <button class="btn_remove" id="${count}" onclick="PreviewItemRemove(${count});">X</button>
            </div>
          `;
        previewCard.innerHTML = cardInner;
        preview.appendChild(previewCard);
      });
      console.log(input.files);
      console.log(imagesPreviewArray);
    } else {
      alert("Wrong type of file");
    }
  }
}

function PreviewItemRemove(id) {
  var itemRemove = document.getElementById(id);
  itemRemove.parentElement.remove();
  var searchIndex = imagesPreviewArray.findIndex((image) => image.newId === id);
  imagesPreviewArray.splice(searchIndex, 1);
  if (imagesPreviewArray.length == 0) {
    upload.classList.remove("visible");
    upload.classList.add("non-visible");
  }
  console.log(input.files);
  console.log(imagesPreviewArray);
}

function Upload() {
  upload.classList.remove("visible");
  upload.classList.add("non-visible");
  for (let i = 0; i < imagesPreviewArray.length; i++) {
    preview.innerHTML = "";
    let reader = new FileReader();
    reader.readAsDataURL(imagesPreviewArray[i]);
    reader.addEventListener("load", () => {
      let image = new Image(300, 300);
      image.src = reader.result;
      let imagesBox = document.getElementById("images_box");
      imagesBox.appendChild(image);
    });
  }
  console.log(imagesPreviewArray);
  imagesPreviewArray.length = 0;
}
