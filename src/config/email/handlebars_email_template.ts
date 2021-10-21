import handlebars from "handlebars";
import fs from "fs";

interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

class HandlebarsEmailTemplate {
  public static async parse({ file, variables }: IParseEmailTemplate) {
    const templateFile = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });
    const parseTemplate = handlebars.compile(templateFile);
    return parseTemplate(variables);
  }
}

export { HandlebarsEmailTemplate, IParseEmailTemplate, ITemplateVariable };
