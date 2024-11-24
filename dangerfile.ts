import { danger, fail } from "danger";
import fs from "fs";

const FILE_SIZE_THRESHOLD = 400 * 1024; // 400 KB

const filesChanged = danger.git.modified_files.concat(danger.git.created_files);

filesChanged.forEach((file) => {
  if (file === "pnpm-lock.yaml") {
    return;
  }

  if (!fs.existsSync(file)) {
    return;
  }

  const fileSize = fs.statSync(file).size;

  if (fileSize > FILE_SIZE_THRESHOLD) {
    fail(
      `File ${file} (${fileSize}B) exceeds large file size threshold of ${FILE_SIZE_THRESHOLD}B.\n
      Reduce the file size or add it to .gitignore.`,
    );
  }
});
