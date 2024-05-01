package com.easy.you.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.BoardVo;

public interface BoardRepository extends JpaRepository<BoardVo, Long>{
	// 최신 순서대로 최대 5개의 글을 가져옴
	List<BoardVo> findTop5ByBtypeOrderByRegdateDesc(String btype);

}
