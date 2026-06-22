package com.klef.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String foundation;

    @Column(nullable = false)
    private String examtype;

    @Column(nullable = false, unique = true)
    private String certificateid;

    @Column(nullable = false)
    private String issueddate;

    @Column(nullable = false)
    private String expirydate;

    @Column(nullable = false, unique = true)
    private String certificateurl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status; // SUBMITTED, APPROVED, REJECTED

    @Column(length = 500)
    private String remarks;

    private LocalDateTime submittedat;

    private LocalDateTime reviewedat;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;
}
