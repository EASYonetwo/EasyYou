package com.easy.you.model;

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
@Table(name = "seeCount")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeeCountVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long seecountseq;
	
	@ManyToOne
	@JoinColumn(name = "boardseq")
	private BoardVo board;
	
	@Column(length = 100)
	private String seeip;
}
