package com.easy.you.model;

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
@Table(name = "boardLikes")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardLikesVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long boardlikeseq;
	
	@ManyToOne
	@JoinColumn(name = "boardseq")
	private BoardVo board;
	
	@ManyToOne
	@JoinColumn(name = "id")
	private UserVo user;
}
