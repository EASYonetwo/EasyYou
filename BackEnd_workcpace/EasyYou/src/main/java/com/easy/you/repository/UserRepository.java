package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.UserVo;

public interface UserRepository extends JpaRepository<UserVo, String>{

	//로그인
	UserVo findByIdAndPassword(String id, String password);

}
