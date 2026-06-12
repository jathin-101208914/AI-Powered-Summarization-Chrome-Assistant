package com.Summarize.assistant;

import lombok.Data;

@Data
public class SummarizeRequest {
    private  String content;
    private String operation;
}
