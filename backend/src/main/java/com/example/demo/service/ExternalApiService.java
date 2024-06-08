package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalApiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.random-word.url}")
    private String randomWordUrl;

    @Value("${api.search-word.url}")
    private String searchWordUrl;

    public ExternalApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

      public String getRandomWordAPI() {
        return restTemplate.getForObject(randomWordUrl, String.class);
    }

    public Object searchWordAPI(String word) {
        String url = searchWordUrl + word;
        return restTemplate.getForObject(url, Object.class);
    }
}
