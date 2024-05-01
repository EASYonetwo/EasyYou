package com.easy.you.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.easy.you.model.BoardLikesVo;
import com.easy.you.model.BoardVo;

public interface BoardLikesRepository extends JpaRepository<BoardLikesVo, Long>{
	
}
