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
@Table(name = "reply")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long replyseq;
	
	@ManyToOne
	@JoinColumn(name = "boardseq")
	private BoardVo board;
	
	private int groupnum;
	private int depthnum;
	@Column(length = 500)
	private String content;
	private Date regdate;
	@Column(length = 1)
	private String delflag;
}
