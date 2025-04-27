package com.example.bdcodeeditor.models;

import com.example.bdcodeeditor.lib.PasswordSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;
    @Column
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonSerialize(using = PasswordSerializer.class)
    private String password;
    @Column
    private String email;
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<Project> projects = new ArrayList<>();
}
