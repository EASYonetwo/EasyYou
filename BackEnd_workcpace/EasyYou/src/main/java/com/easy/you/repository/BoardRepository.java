package com.easy.you.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easy.you.model.ReplyVo;

public interface BoardRepository extends JpaRepository<ReplyVo, Long>{

}
