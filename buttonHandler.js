



document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileContentElement = document.getElementById("fileContent");
  const exportButton = document.getElementById("exportButton");

  fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = event => {
        const content = event.target.result;
        fileContentElement.textContent = content;
      };

      reader.readAsText(file);
    }
  });

  exportButton.addEventListener("click", () => {
    const content = fileContentElement.textContent;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "exported-file.txt";
    a.click();

    URL.revokeObjectURL(url);
  });
});





