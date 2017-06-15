'use strict';

const markdownService = require("../../src/service/markdown-service");

describe("Markdown Services tests", function() {
    it("should return a valid markdown array", function() {
        //Given
        const dataLast = require("./data/sampleLast");

        //When
        const result = markdownService.formatDataAsArray(dataLast);
       
        //Then
        expect(result).toEqual(
              "| Nom | Taille (m) | Poids (kg) | Chaussure |\n"
            + "|---|---:|---:|---:|\n"
            + "| antoine | 1.76 | 72.20 | 42 |\n"
            + "| camille |  | 73 | 37 |\n"
            + "| kyllian |  |  | 10 |\n");
    });

    it("should return a valid markdown list", function() {
        //Given
        const dataLast = require("./data/sampleLast");

        //When
        const result = markdownService.formatDataAsList(dataLast);

        //Then
        expect(result).toEqual(
             "*antoine* :\n"
           + "- mesure 1.76 m\n"
           + "- pèse 72.20 kg\n"
           + "- fait du 42\n\n"
           + "*camille* :\n"
           + "- pèse 73 kg\n"
           + "- fait du 37\n\n"
           + "*kyllian* :\n"
           + "- fait du 10\n\n");
    });
});