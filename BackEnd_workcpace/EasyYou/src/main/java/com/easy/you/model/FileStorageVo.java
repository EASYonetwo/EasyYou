package com.easy.you.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "fileStorage")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileStorageVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long fileseq;
	
	@ManyToOne
	@JoinColumn(name = "boardseq")
	private BoardVo board;
	
	@Column(length = 100)
	private String filename;
	private int filesize;
	private Date regdate;
	@Column(length = 1)
	private String enabled;
	
	@Lob
	private String file;
}
