package com.example.bdcodeeditor.lib;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(TokenFilter.class);

    private final JwtCore jwtCore;
    private final UserDetailsService userDetailsService;

    @Autowired
    public TokenFilter(JwtCore jwtCore, UserDetailsService userDetailsService) {
        this.jwtCore = jwtCore;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String headerAuth = request.getHeader("Authorization");

            if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            String jwt = headerAuth.substring(7);
            String username = jwtCore.getNameFromJwt(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (ExpiredJwtException e) {
            logger.error("Ошибка: токен истёк", e);
            sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, "JWT Token expired");
            return;
        } catch (Exception e) {
            logger.error("Ошибка при обработке токена", e);
            sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void sendJsonError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String jsonResponse = String.format("{\"error\": \"%s\", \"status\": %d}", message, status);
        response.getWriter().write(jsonResponse);
    }
}
