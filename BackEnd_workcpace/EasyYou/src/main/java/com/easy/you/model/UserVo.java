package com.easy.you.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserVo {
	@Id
	@Column(length = 100)
	private String id;
	
	@Column(length = 200)
	private String password;
	private Date joindate;
	@Column(length = 1)
	private String auth;
}
