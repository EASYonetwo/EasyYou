package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.BoardVo;

public interface ReplyRepository extends JpaRepository<BoardVo, Long>{

}
