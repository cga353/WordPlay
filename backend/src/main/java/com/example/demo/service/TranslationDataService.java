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
    // Logger para registrar mensajes de información y advertencia.

    private static final Logger LOGGER = Logger.getLogger(TranslationDataService.class.getName());

    /**
     * Recupera datos de traducción para una palabra dada.
     * 
     * @param word La palabra para la que se desea obtener la traducción.
     * @return Una lista de objetos TranslationDTO que contienen las traducciones.
     */
    public List<TranslationDTO> retrieveTranslationData(String word) {

        List<TranslationDTO> translationData = new ArrayList<>();

        try {
            // Conecta a la página de WordReference y obtiene el documento HTML.

            Document webPage = Jsoup.connect("https://www.wordreference.com/es/translation.asp?tranword=" + word)
                    .get();
            // Obtiene el elemento tbody que contiene las traducciones.

            Element tbody = webPage.getElementById("articleWRD")
                    .getElementsByTag("tbody").first();
            // Si no se encuentra tbody o no tiene hijos, agrega un mensaje de no
            // encontrado.
            if (tbody == null || tbody.children().isEmpty()) {

                translationData.add(new TranslationDTO(word, "Palabra no encontrada en WordReference"));
                return translationData;
            }

            Elements tbodyChildren = tbody.children();
            List<Element> rows = new ArrayList<>();

            // Si tbody tiene hijos, toma todos excepto los dos primeros.
            // Si no tiene hijos, agrega un mensaje.
            if (!tbodyChildren.isEmpty()) {
                rows = tbodyChildren.subList(2, tbodyChildren.size());
            } else {
                translationData.add(new TranslationDTO(word, "No translation found for this word"));
            }
            
            // Itera sobre las filas obtenidas.
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

                    // Si el texto no existe en la lista, lo agrega.
                    // Si el texto ya existe, registra un mensaje de información.
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
