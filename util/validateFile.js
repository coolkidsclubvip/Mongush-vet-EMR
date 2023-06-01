module.exports = {
  validateFile(file, maxSize, fileType) {
    if (!file) {
      return { error: "No file uploaded" };
    }
    if (file.size > maxSize) {
      return { error: "The file is to large" };
    }
    const allowedTypes = ["png", "jpg", "jpeg", "svg", "bmp", "gif", "ico"];
    let ext = file.originalname;
    ext = ext.split(".").pop();
    ext = ext.toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return { error: `Please upload an image of ${allowedTypes}` };
    }
  },
};
