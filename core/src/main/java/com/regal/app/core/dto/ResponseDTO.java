package com.regal.app.core.dto;

import java.io.Serializable;

public class ResponseDTO implements Serializable {
    private boolean success = false;
    private Object content;

    public ResponseDTO() {
    }

    public ResponseDTO(boolean success, Object content) {
        this.success = success;
        this.content = content;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
