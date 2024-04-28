package com.easy.you.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "board")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long boardseq;
	
	@ManyToOne
	@JoinColumn(name = "id")
	private UserVo user;
	
	@Column(length = 200)
	private String title;
	@Column(length = 1000)
	private String content;
	@Column(length = 1)
	private String delflag;
	private Date regdate;
}
