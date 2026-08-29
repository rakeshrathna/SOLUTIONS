package com.eduideal.portal.service;

import com.eduideal.portal.dto.AuthRequestDto;
import com.eduideal.portal.dto.AuthResponseDto;

public interface AuthService {
    AuthResponseDto login(AuthRequestDto authRequestDto);
}
