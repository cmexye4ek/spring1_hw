package ru.gb.market.dto;

import java.util.List;

public class AuthResponse {

    private String token;

    private String role; //примитивный способ разграничить отображение кнопок редактирования юзерам с разными ролями, без дешифровки токена на фронте.

    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
