import { readdir, rename } from "fs/promises"
import * as path from "path"

async function run() {
  const componentsPath = path.join("./components", "ui")
  const files = (await readdir(componentsPath)).filter((file) =>
    file.endsWith(".tsx")
  )

  const newFiles = await Promise.all(
    files.map(async (file) => {
      const titleCased = file
        .toLowerCase()
        .replace(/\b\w/g, (s) => s.toUpperCase())
        .replace(/-/g, "")
        .replace(/\.Tsx/g, ".tsx")

      await rename(
        path.join(componentsPath, file),
        path.join(componentsPath, titleCased)
      )
      return titleCased
    })
  )

  console.log("Renamed files: ", newFiles)
}

run()
