import fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider {
  static readDataFromJson(jsonFilePath: string) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    return data;
  }

  static readDataFromCSV(filePath: string) {
    let data = parse(fs.readFileSync(filePath), {
      columns: true,
      skip_empty_lines: true,
    });
    return data;
  }
}
