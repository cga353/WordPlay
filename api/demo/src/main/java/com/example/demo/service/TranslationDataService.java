package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.example.demo.dto.TranslationDTO;

@Component("translationDataService")
public class TranslationDataService {

    private static final Logger LOGGER = Logger.getLogger(TranslationDataService.class.getName());

    public List<TranslationDTO> retrieveTranslationData(String word) {

        List<TranslationDTO> translationData = new ArrayList<>();

        try {
            Document webPage = Jsoup.connect("https://www.wordreference.com/es/translation.asp?tranword=" + word)
                    .get();

            Element tbody = webPage.getElementById("articleWRD")
                    .getElementsByTag("tbody").first();

            if (tbody == null || tbody.children().isEmpty()) {
                translationData.add(new TranslationDTO(word, "Palabra no encontrada en WordReference"));
                return translationData;
            }

            Elements tbodyChildren = tbody.children();
            List<Element> rows = new ArrayList<>();

            if (!tbodyChildren.isEmpty()) {
                rows = tbodyChildren.subList(2, tbodyChildren.size());
            } else {
                // Handle the case where tbody has no children, perhaps add a message to translationData
                translationData.add(new TranslationDTO(word, "No translation found for this word"));
            }

            for (Element row : rows) {

                Elements tr = row.getElementsByTag("tr");
                if (tr.hasClass("odd"))
                    continue;

                Elements tds = row.getElementsByTag("td");
                if (tds.size() > 2) { // Verifica que hay al menos 3 elementos <td>
                    String text = tds.get(2).ownText();

                    // Verifica si el texto ya está en la lista
                    boolean alreadyExists = translationData.stream()
                            .anyMatch(data -> data.getText().equals(text));

                    if (!alreadyExists) {
                        translationData.add(new TranslationDTO(word, text));
                    } else {
                        LOGGER.info("Texto duplicado encontrado y omitido: " + text);
                    }
                } else {
                    LOGGER.warning("Fila con menos de 3 elementos <td> encontrada: " + row);
                }
            }

            return translationData;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return translationData;
    }
}
