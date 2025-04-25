const fs = require("fs");
const path = require("path");

const dirWithIcons = "../templates/icons"; // Path to your icons folder

function fixIcons() {
  const files = fs.readdirSync(dirWithIcons); // Read all files in the directory

  files.forEach((file) => {
    const filePath = path.join(dirWithIcons, file); // Get the full path of each file

    // Ensure the file is an SVG
    if (path.extname(file) === ".svg") {
      const fileContent = fs.readFileSync(filePath, "utf-8"); // Read the content of the SVG file
      const newContent = fileContent.replace(
        /#(?:[0-9a-fA-F]{3}){1,2}\b|rgb(a?)\((\d{1,3}), (\d{1,3}), (\d{1,3})(, (\d(\.\d+)?))?\)/g,
        "#555"
      ); // Replace any color with #555 (gray)

      fs.writeFileSync(filePath, newContent); // Write the updated content back to the file
    }
  });

  console.log("SVG files have been updated.");
}

// Call the function to execute the changes
fixIcons();
