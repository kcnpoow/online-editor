package com.example.bdcodeeditor.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "views", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "project_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class View {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id")
    private Project project;
}
